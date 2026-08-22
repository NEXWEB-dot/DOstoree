/**
 * DO STORE — Dynamic Shop Page Integration with Sanity CMS
 * Fetches product catalog via GROQ and provides live Price, Team, Search, and Sort filtering
 */

import { sanityClient, GROQ_QUERIES, urlFor } from './sanity-client.js';

let allProducts = [];
let currentFilters = {
  search: '',
  priceRange: 'all',
  team: 'all',
  sortBy: 'featured',
};

document.addEventListener('DOMContentLoaded', async () => {
  const productsGrid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const priceFilter = document.getElementById('priceFilter');
  const teamFilter = document.getElementById('teamFilter');
  const sortSelect = document.getElementById('sortSelect');
  const resetFiltersBtn = document.getElementById('resetFilters');
  const filterCount = document.querySelector('.filter-count');
  const activePillsContainer = document.getElementById('activeFilterPills');

  if (!productsGrid) return;

  // 1. Render Skeleton Loading State
  renderSkeletons(productsGrid, 8);

  try {
    // 2. Fetch products from Sanity CMS via GROQ query
    allProducts = await sanityClient.fetch(GROQ_QUERIES.FETCH_ALL_PRODUCTS);
    
    // 3. Populate unique teams in team filter
    populateTeamFilter(allProducts, teamFilter);

    // 4. Initial Render
    applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);

    // 5. Setup Live Filter Event Listeners
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = currentFilters.search ? 'block' : 'none';
        }
        applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentFilters.search = '';
        clearSearchBtn.style.display = 'none';
        applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);
      });
    }

    if (priceFilter) {
      priceFilter.addEventListener('change', (e) => {
        currentFilters.priceRange = e.target.value;
        applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);
      });
    }

    if (teamFilter) {
      teamFilter.addEventListener('change', (e) => {
        currentFilters.team = e.target.value;
        applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        currentFilters = { search: '', priceRange: 'all', team: 'all', sortBy: 'featured' };
        if (searchInput) { searchInput.value = ''; clearSearchBtn.style.display = 'none'; }
        if (priceFilter) priceFilter.value = 'all';
        if (teamFilter) teamFilter.value = 'all';
        if (sortSelect) sortSelect.value = 'featured';
        applyFiltersAndRender(productsGrid, filterCount, activePillsContainer, resetFiltersBtn);
      });
    }
  } catch (error) {
    console.error('Failed to load products from Sanity:', error);
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 18px; color: var(--clr-dark-gray); margin-bottom: 16px;">Unable to load products from Sanity.</p>
        <button class="btn-primary" onclick="window.location.reload()" style="display: inline-block;">Try Again</button>
      </div>
    `;
  }
});

/**
 * Dynamically extract unique team names and populate dropdown
 */
function populateTeamFilter(products, selectEl) {
  if (!selectEl || !products) return;
  const teams = new Set();
  products.forEach((p) => {
    if (p.teamName) teams.add(p.teamName.trim());
  });

  if (teams.size === 0) return;

  let options = '<option value="all">All Teams</option>';
  Array.from(teams).sort().forEach((team) => {
    options += `<option value="${escapeHtml(team)}">${escapeHtml(team)}</option>`;
  });
  selectEl.innerHTML = options;
}

/**
 * Filter & Sort products based on current active state
 */
function applyFiltersAndRender(container, countEl, pillsEl, resetBtn) {
  let filtered = [...allProducts];

  // 1. Search Query Filter
  if (currentFilters.search) {
    filtered = filtered.filter((p) => {
      const titleMatch = (p.title || '').toLowerCase().includes(currentFilters.search);
      const teamMatch = (p.teamName || '').toLowerCase().includes(currentFilters.search);
      return titleMatch || teamMatch;
    });
  }

  // 2. Price Range Filter
  if (currentFilters.priceRange !== 'all') {
    switch (currentFilters.priceRange) {
      case 'under2000':
        filtered = filtered.filter((p) => (p.price || 0) < 2000);
        break;
      case '2000-2400':
        filtered = filtered.filter((p) => (p.price || 0) >= 2000 && (p.price || 0) <= 2400);
        break;
      case 'above2400':
        filtered = filtered.filter((p) => (p.price || 0) > 2400);
        break;
      case 'bundle':
        filtered = filtered.filter((p) => p.hasBundleOffer || p.badge === 'bundle' || p.bundlePrice);
        break;
    }
  }

  // 3. Team Filter
  if (currentFilters.team !== 'all') {
    filtered = filtered.filter((p) => p.teamName === currentFilters.team);
  }

  // 4. Sort
  filtered = sortProducts(filtered, currentFilters.sortBy);

  // 5. Update Active Filter Pills & Reset Button
  updateActivePills(pillsEl, resetBtn);

  // 6. Render
  renderProducts(filtered, container, countEl);
}

/**
 * Update UI Filter Pills
 */
function updateActivePills(pillsEl, resetBtn) {
  const pills = [];
  if (currentFilters.search) {
    pills.push({ label: `"${currentFilters.search}"`, key: 'search' });
  }
  if (currentFilters.priceRange !== 'all') {
    const priceLabels = {
      under2000: 'Under Rs. 2,000',
      '2000-2400': 'Rs. 2,000 – Rs. 2,400',
      above2400: 'Above Rs. 2,400',
      bundle: '⚡ 4 for Rs. 4,200',
    };
    pills.push({ label: priceLabels[currentFilters.priceRange] || currentFilters.priceRange, key: 'priceRange' });
  }
  if (currentFilters.team !== 'all') {
    pills.push({ label: currentFilters.team, key: 'team' });
  }

  if (resetBtn) {
    resetBtn.style.display = pills.length > 0 ? 'inline-flex' : 'none';
  }

  if (pillsEl) {
    pillsEl.innerHTML = pills.map((p) => `
      <span class="filter-pill">
        ${escapeHtml(p.label)}
        <button class="pill-remove-btn" data-key="${p.key}" aria-label="Remove filter">&times;</button>
      </span>
    `).join('');

    pillsEl.querySelectorAll('.pill-remove-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key === 'search') {
          currentFilters.search = '';
          const searchInput = document.getElementById('searchInput');
          if (searchInput) searchInput.value = '';
          const clearBtn = document.getElementById('clearSearchBtn');
          if (clearBtn) clearBtn.style.display = 'none';
        } else if (key === 'priceRange') {
          currentFilters.priceRange = 'all';
          const priceFilter = document.getElementById('priceFilter');
          if (priceFilter) priceFilter.value = 'all';
        } else if (key === 'team') {
          currentFilters.team = 'all';
          const teamFilter = document.getElementById('teamFilter');
          if (teamFilter) teamFilter.value = 'all';
        }
        applyFiltersAndRender(
          document.getElementById('productsGrid'),
          document.querySelector('.filter-count'),
          pillsEl,
          resetBtn
        );
      });
    });
  }
}

/**
 * Render list of product cards
 */
function renderProducts(products, container, countEl) {
  if (!products || products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 20px; font-weight: 500; margin-bottom: 8px;">No jerseys match your filters</h3>
        <p style="font-size: 15px; color: var(--clr-dark-gray); margin-bottom: 20px;">Try adjusting your price range, team selection, or search keywords.</p>
        <button class="btn-secondary" onclick="document.getElementById('resetFilters').click();" style="display: inline-block;">Clear All Filters</button>
      </div>
    `;
    if (countEl) countEl.textContent = '0 Products found';
    return;
  }

  if (countEl) {
    countEl.textContent = `${products.length} Product${products.length === 1 ? '' : 's'} found`;
  }

  const html = products.map((product, idx) => createProductCardHtml(product, idx)).join('');
  container.innerHTML = html;

  // Re-attach card interactions (3D hover, wishlist)
  attachProductCardEvents(container);
}

/**
 * Generate Product Card HTML with team, bundle badge and pricing
 */
function createProductCardHtml(product, index) {
  const slug = product.slug?.current || product.slug || '';
  const detailUrl = `product.html?slug=${encodeURIComponent(slug)}`;
  
  // Use @sanity/image-url builder with CDN optimizations
  // Shop cards display max ~300px — 400px src is sufficient for 2x DPR
  const imgBuilder = urlFor(product.mainImage);
  const imgUrl = imgBuilder.width(400).quality(70).auto('format').url();
  const srcsetStr = imgBuilder.srcset([240, 360, 480]);
  const altText = product.mainImage?.alt || product.title || 'Product Image';
  
  // CDN Performance: high priority for first 4 above-fold cards, lazy loading for remainder
  const isAboveFold = index < 4;
  const loadingAttr = isAboveFold ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';

  // Badge mapping
  let badgeHtml = '';
  if (product.badge === 'sale') {
    badgeHtml = '<span class="product-badge sale">Sale</span>';
  } else if (product.badge === 'new') {
    badgeHtml = '<span class="product-badge new">New</span>';
  } else if (product.badge === 'sold-out') {
    badgeHtml = '<span class="product-badge sold-out">Sold out</span>';
  } else if (product.badge === 'bundle' || product.hasBundleOffer) {
    badgeHtml = '<span class="product-badge bundle">⚡ 4 for Rs. 4,200</span>';
  }

  // Team subtitle
  const teamHtml = product.teamName ? `<div class="product-team-tag">${escapeHtml(product.teamName)}</div>` : '';

  // Bundle callout tag on card
  let bundleCallout = '';
  if (product.hasBundleOffer || product.bundlePrice) {
    bundleCallout = `
      <div class="product-bundle-tag">
        <span>Bundle Offer:</span> 4 for Rs. ${Number(product.bundlePrice || 4200).toLocaleString()}
      </div>
    `;
  }

  // Price formatting (Single jersey price: Rs. 2,350)
  const priceFormatted = `Rs.${Number(product.price || 2350).toLocaleString()}.00 PKR`;
  let priceHtml = `<span class="product-price">${priceFormatted}</span>`;
  if (product.oldPrice && product.oldPrice > product.price) {
    const oldPriceFormatted = `Rs.${Number(product.oldPrice).toLocaleString()}.00 PKR`;
    priceHtml = `
      <span class="product-price-old">${oldPriceFormatted}</span>
      <span class="product-price sale-price">${priceFormatted}</span>
    `;
  }

  // Rating stars
  const rating = product.rating || 5;
  const reviews = product.reviewsCount || 0;
  const starsHtml = Array.from({ length: 5 }, (_, i) => `
    <svg viewBox="0 0 20 20" style="${i < rating ? 'fill: var(--clr-star);' : 'fill: var(--clr-gray);'}">
      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z"/>
    </svg>
  `).join('');

  return `
    <div class="product-card fade-in visible" id="product-${product._id || index}">
      <a href="${detailUrl}" class="product-card-link" aria-label="${escapeHtml(product.title)}">
        <div class="product-card-img">
          ${badgeHtml}
          <button class="product-wish" aria-label="Add to wishlist" onclick="event.preventDefault(); event.stopPropagation(); toggleWishlist(this);">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <div class="product-quick-shop">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Quick View
          </div>
          <img src="${escapeHtml(imgUrl)}" 
               ${srcsetStr ? `srcset="${escapeHtml(srcsetStr)}"` : ''}
               sizes="(max-width: 380px) calc(100vw - 32px), (max-width: 480px) calc(50vw - 21px), (max-width: 768px) calc(50vw - 27px), (max-width: 1200px) calc(33vw - 27px), 280px"
               alt="${escapeHtml(altText)}" 
               ${loadingAttr}>
        </div>
        <div class="product-card-body">
          ${teamHtml}
          <div class="product-rating">
            <div class="product-stars">
              ${starsHtml}
            </div>
            <span class="product-reviews">(${reviews})</span>
          </div>
          <h3 class="product-name">${escapeHtml(product.title)}</h3>
          <div class="product-pricing">
            ${priceHtml}
          </div>
          ${bundleCallout}
          <span class="product-choose-btn">Choose options</span>
        </div>
      </a>
    </div>
  `;
}

/**
 * Skeletons for initial loading state
 */
function renderSkeletons(container, count = 8) {
  let skeletons = '';
  for (let i = 0; i < count; i++) {
    skeletons += `
      <div class="product-card-skeleton">
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line full"></div>
          <div class="skeleton-line mid"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = skeletons;
}

/**
 * Sort product items
 */
function sortProducts(products, criteria) {
  switch (criteria) {
    case 'low':
      return products.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'high':
      return products.sort((a, b) => (b.price || 0) - (a.price || 0));
    case 'new':
      return products.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    case 'featured':
    default:
      return products;
  }
}

/**
 * Card events (3D tilt, wishlist)
 */
function attachProductCardEvents(container) {
  container.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
