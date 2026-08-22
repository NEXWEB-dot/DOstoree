/**
 * DO STORE — Dynamic Product Detail Page (PDP) Integration with Sanity CMS
 * Fetches product payload by slug via GROQ, renders Portable Text description,
 * interactive image gallery, team name, and interactive 4-for-4200 bundle pricing.
 */

import { sanityClient, GROQ_QUERIES, urlFor, renderPortableText } from './sanity-client.js';

let currentProduct = null;
let currentMode = 'single'; // 'single' | 'bundle'
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Extract slug from URL query params or path (/products/:slug)
  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('slug');

  if (!slug) {
    const pathMatch = window.location.pathname.match(/\/products\/([^/?#]+)/);
    if (pathMatch && pathMatch[1]) {
      slug = decodeURIComponent(pathMatch[1]);
    }
  }

  // Fallback slug
  if (!slug) {
    slug = 'barcelona-away-25-26-kobe-edition';
  }

  // Show skeleton overlay while fetching
  const overlay = document.getElementById('pdpLoadingOverlay');
  const container = document.getElementById('productDetailContainer');

  try {
    // 2. Fetch full product payload from Sanity CMS via GROQ
    currentProduct = await sanityClient.fetch(GROQ_QUERIES.FETCH_PRODUCT_BY_SLUG, { slug });

    if (!currentProduct) {
      // Product not found — show error state
      if (overlay) overlay.style.display = 'none';
      if (container) {
        container.style.opacity = '1';
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
            <h2 style="font-size: 24px; font-weight: 500; margin-bottom: 12px;">Product not found</h2>
            <p style="color: var(--clr-dark-gray); margin-bottom: 28px;">We couldn't find a product matching "<strong>${escapeHtml(slug)}</strong>".</p>
            <a href="shop.html" class="btn-primary" style="display: inline-block;">← Back to Shop</a>
          </div>
        `;
      }
      return;
    }

    // 3. Hydrate PDP with dynamic Sanity data
    hydrateProductDetail(currentProduct);

    // 4. Setup Bundle Pricing Interactions
    setupBundlePricingInteractions(currentProduct);

    // 5. Reveal content — hide skeleton, fade in container
    if (overlay) overlay.style.display = 'none';
    if (container) container.style.opacity = '1';

  } catch (err) {
    console.error('Failed to load product detail from Sanity:', err);
    // On error, still try to show whatever was hydrated (fallback data may have been set)
    if (overlay) overlay.style.display = 'none';
    if (container) container.style.opacity = '1';
  }
});


/**
 * Hydrate the Product Detail Page DOM elements
 */
export function hydrateProductDetail(product) {
  // Document title and meta
  document.title = `${product.title} | DO Store — Premium Football Jerseys Pakistan`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${product.title} — Premium A+ quality football jersey. Team: ${product.teamName || 'Official'}. Shop at DO Store Pakistan. Nationwide COD available.`;
  }

  // Breadcrumbs
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = product.title;
  }

  // Brand & Team Name
  const brandEl = document.getElementById('productBrand');
  if (brandEl) {
    brandEl.textContent = product.teamName || 'DO Store Official';
  }

  const teamPill = document.getElementById('productTeamPill');
  if (teamPill) {
    if (product.teamName) {
      teamPill.textContent = `${product.teamName} Match Kit`;
      teamPill.style.display = 'inline-block';
    } else {
      teamPill.style.display = 'none';
    }
  }

  // Product Title
  const titleEl = document.getElementById('productTitle');
  if (titleEl) {
    titleEl.textContent = product.title;
  }

  // Rating and Reviews
  const reviewsEl = document.getElementById('productReviewsText');
  if (reviewsEl) {
    reviewsEl.textContent = `${product.reviewsCount || 12} Reviews`;
  }

  // Pricing (Default Single: Rs. 2,350)
  const singlePrice = Number(product.price || 2350);
  const priceEl = document.getElementById('productPriceLarge');
  if (priceEl) {
    priceEl.textContent = `Rs.${singlePrice.toLocaleString()}.00`;
  }

  const oldPriceEl = document.getElementById('productPriceOldLarge');
  if (oldPriceEl) {
    if (product.oldPrice && product.oldPrice > singlePrice) {
      oldPriceEl.textContent = `Rs.${Number(product.oldPrice).toLocaleString()}.00`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  // Badge
  const badgeEl = document.getElementById('productBadgeLarge');
  if (badgeEl) {
    if (product.badge === 'sale') {
      badgeEl.className = 'product-badge large sale';
      badgeEl.textContent = 'Sale';
      badgeEl.style.display = 'inline-block';
    } else if (product.badge === 'new') {
      badgeEl.className = 'product-badge large new';
      badgeEl.textContent = 'New Arrival';
      badgeEl.style.display = 'inline-block';
    } else if (product.badge === 'sold-out') {
      badgeEl.className = 'product-badge large sold-out';
      badgeEl.textContent = 'Sold Out';
      badgeEl.style.display = 'inline-block';
    } else if (product.badge === 'bundle' || product.hasBundleOffer) {
      badgeEl.className = 'product-badge large bundle';
      badgeEl.textContent = '⚡ 4 for Rs. 4,200 Deal';
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // 4. Render Portable Text Rich Description
  const descContainer = document.getElementById('productDescription');
  if (descContainer) {
    if (product.description) {
      descContainer.innerHTML = renderPortableText(product.description);
    } else {
      descContainer.innerHTML = '<p class="portable-p">Authentic match-day jersey engineered with lightweight breathable fabric for superior comfort and performance.</p>';
    }
  }

  // 5. Render Responsive Gallery with @sanity/image-url
  renderGallery(product);

  // 6. Render Available Sizes
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL', 'XXL'];
  const sizeSelector = document.getElementById('sizeSelector');
  if (sizeSelector) {
    sizeSelector.innerHTML = sizes.map((s, idx) => `
      <button type="button" class="size-btn ${idx === 1 ? 'active' : ''}">${escapeHtml(s)}</button>
    `).join('');

    sizeSelector.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sizeSelector.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // 7. Render Features list in Accordion
  if (product.details && Array.isArray(product.details) && product.details.length > 0) {
    const detailsList = document.getElementById('productDetailsList');
    if (detailsList) {
      detailsList.innerHTML = product.details.map(d => `<li>${escapeHtml(d)}</li>`).join('');
    }
  }
}

/**
 * Setup Bundle Tier Option Switching (Single Rs. 2,350 vs Bundle 4 for Rs. 4,200)
 */
function setupBundlePricingInteractions(product) {
  const bundleSelectorWrap = document.getElementById('bundleSelectorWrap');
  const singleCard = document.getElementById('singleTierCard');
  const bundleCard = document.getElementById('bundleTierCard');
  const singleTierPrice = document.getElementById('singleTierPrice');
  const bundleTierPrice = document.getElementById('bundleTierPrice');
  const bundleTierOldPrice = document.getElementById('bundleTierOldPrice');
  const bundleTierSub = document.getElementById('bundleTierSub');
  const priceLarge = document.getElementById('productPriceLarge');
  const oldPriceLarge = document.getElementById('productPriceOldLarge');
  const bundleSavings = document.getElementById('productBundleSavings');
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const waBuyBtn = document.querySelector('.wa-buy-btn');

  if (!bundleSelectorWrap) return;

  const singlePrice = Number(product.price || 2350);
  const bundleQty = Number(product.bundleQuantity || 4);
  const bundlePrice = Number(product.bundlePrice || 4200);
  const bundleFullPrice = singlePrice * bundleQty; // e.g. 2350 * 4 = 9400
  const bundleSavingsAmount = bundleFullPrice - bundlePrice; // e.g. 9400 - 4200 = 5200

  // Set prices on cards
  if (singleTierPrice) singleTierPrice.textContent = `Rs. ${singlePrice.toLocaleString()}`;
  if (bundleTierPrice) bundleTierPrice.textContent = `Rs. ${bundlePrice.toLocaleString()}`;
  if (bundleTierOldPrice) bundleTierOldPrice.textContent = `Rs. ${bundleFullPrice.toLocaleString()}`;
  if (bundleTierSub) {
    bundleTierSub.textContent = `Only Rs. ${(bundlePrice / bundleQty).toFixed(0)} per kit — Save Rs. ${bundleSavingsAmount.toLocaleString()}`;
  }

  function selectSingle() {
    currentMode = 'single';
    currentQuantity = 1;
    singleCard?.classList.add('active');
    bundleCard?.classList.remove('active');

    if (priceLarge) priceLarge.textContent = `Rs.${singlePrice.toLocaleString()}.00`;
    if (oldPriceLarge) {
      if (product.oldPrice && product.oldPrice > singlePrice) {
        oldPriceLarge.textContent = `Rs.${Number(product.oldPrice).toLocaleString()}.00`;
        oldPriceLarge.style.display = 'inline';
      } else {
        oldPriceLarge.style.display = 'none';
      }
    }
    if (bundleSavings) bundleSavings.style.display = 'none';
    if (qtyInput) qtyInput.value = '1';
    updateCheckoutUrls(product, singlePrice, 1, 'Single');
  }

  function selectBundle() {
    currentMode = 'bundle';
    currentQuantity = bundleQty;
    bundleCard?.classList.add('active');
    singleCard?.classList.remove('active');

    if (priceLarge) priceLarge.textContent = `Rs.${bundlePrice.toLocaleString()}.00 (Bundle of ${bundleQty})`;
    if (oldPriceLarge) {
      oldPriceLarge.textContent = `Rs.${bundleFullPrice.toLocaleString()}.00`;
      oldPriceLarge.style.display = 'inline';
    }
    if (bundleSavings) {
      bundleSavings.textContent = `⚡ Save Rs. ${bundleSavingsAmount.toLocaleString()}`;
      bundleSavings.style.display = 'inline-block';
    }
    if (qtyInput) qtyInput.value = String(bundleQty);
    updateCheckoutUrls(product, bundlePrice, bundleQty, '4-Jersey Bundle');
  }

  singleCard?.addEventListener('click', selectSingle);
  singleCard?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') selectSingle(); });

  bundleCard?.addEventListener('click', selectBundle);
  bundleCard?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') selectBundle(); });

  // Initial State
  selectSingle();

  // Quantity stepper updates
  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        val -= 1;
        qtyInput.value = val;
        currentQuantity = val;
        updateDynamicTotal(product, val);
      }
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      val += 1;
      qtyInput.value = val;
      currentQuantity = val;
      updateDynamicTotal(product, val);
    });
  }
}

function updateDynamicTotal(product, qty) {
  const priceLarge = document.getElementById('productPriceLarge');
  const singlePrice = Number(product.price || 2350);
  const bundlePrice = Number(product.bundlePrice || 4200);

  if (currentMode === 'bundle' && qty === 4) {
    if (priceLarge) priceLarge.textContent = `Rs.${bundlePrice.toLocaleString()}.00 (Bundle Deal)`;
  } else {
    const total = singlePrice * qty;
    if (priceLarge) priceLarge.textContent = `Rs.${total.toLocaleString()}.00 (${qty} ${qty === 1 ? 'item' : 'items'})`;
  }
}

function updateCheckoutUrls(product, price, qty, modeLabel) {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const waBuyBtn = document.querySelector('.wa-buy-btn');
  const selectedSize = document.querySelector('.size-btn.active')?.textContent || 'M';

  if (checkoutBtn) {
    checkoutBtn.href = `checkout.html?product=${encodeURIComponent(product.title)}&price=${price}&qty=${qty}&size=${selectedSize}&mode=${modeLabel}`;
  }

  if (waBuyBtn) {
    waBuyBtn.onclick = () => {
      const text = `Hi DO Store! I want to order the *${product.title}* (${product.teamName || 'Club Jersey'}).\n• Option: ${modeLabel}\n• Size: ${selectedSize}\n• Quantity: ${qty}\n• Price: Rs. ${price.toLocaleString()}\nPlease confirm delivery across Pakistan.`;
      const url = `https://wa.me/923001234567?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    };
  }
}

/**
 * Render Image Gallery (Main Image + Optimized Thumbnails)
 */
function renderGallery(product) {
  const mainImg = document.getElementById('mainProductImg');
  const thumbsContainer = document.getElementById('productThumbnails');
  if (!mainImg || !thumbsContainer) return;

  const images = [];
  if (product.mainImage) images.push(product.mainImage);
  if (product.gallery && Array.isArray(product.gallery)) {
    product.gallery.forEach((g) => {
      const gRef = g.asset?._ref || g.url;
      const mRef = product.mainImage?.asset?._ref || product.mainImage?.url;
      if (!gRef || gRef !== mRef) images.push(g);
    });
  }

  if (images.length === 0) return;

  // Main Image (800px wide, quality 80 — good balance for PDP hero image)
  const mainUrl = urlFor(images[0]).width(800).quality(80).auto('format').url();
  mainImg.src = mainUrl;
  mainImg.alt = images[0]?.alt || product.title;

  // Render Thumbnails (200×200, quality 65 — small thumbnails don't need high quality)
  thumbsContainer.innerHTML = images.map((img, idx) => {
    const thumbUrl = urlFor(img).width(200).height(200).quality(65).auto('format').url();
    const fullUrl = urlFor(img).width(800).quality(80).auto('format').url();
    const alt = img.alt || `Thumbnail ${idx + 1}`;
    const activeClass = idx === 0 ? 'active' : '';

    return `
      <img src="${escapeHtml(thumbUrl)}" 
           data-full="${escapeHtml(fullUrl)}" 
           class="${activeClass}" 
           alt="${escapeHtml(alt)}" 
           tabindex="0"
           role="button"
           aria-label="View ${escapeHtml(alt)}" />
    `;
  }).join('');

  // Thumbnail click switching
  const thumbImgs = thumbsContainer.querySelectorAll('img');
  thumbImgs.forEach((thumb) => {
    const switchImage = () => {
      const fullUrl = thumb.getAttribute('data-full');
      if (fullUrl) {
        mainImg.style.opacity = '0.7';
        mainImg.src = fullUrl;
        setTimeout(() => { mainImg.style.opacity = '1'; }, 150);
      }
      thumbImgs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    };

    thumb.addEventListener('click', switchImage);
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchImage();
      }
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
