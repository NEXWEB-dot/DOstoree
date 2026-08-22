/**
 * DO STORE — Dynamic Home Page Products from Sanity CMS
 * Hydrates Featured New Arrivals and Best Sellers directly from Sanity dataset
 */

import { sanityClient, GROQ_QUERIES, urlFor } from './sanity-client.js';

document.addEventListener('DOMContentLoaded', async () => {
  const featuredGrid = document.getElementById('featuredGrid');
  const bestsellersTrack = document.getElementById('bestsellersTrack');

  try {
    const allProducts = await sanityClient.fetch(GROQ_QUERIES.FETCH_ALL_PRODUCTS);
    if (!allProducts || allProducts.length === 0) return;

    // 1. Hydrate Featured New Arrivals (First 8 products)
    if (featuredGrid) {
      const featuredProducts = allProducts.slice(0, 8);
      featuredGrid.innerHTML = featuredProducts.map((p, idx) => createHomeCardHtml(p, idx)).join('');
    }

    // 2. Hydrate Best Sellers Carousel (Next 8 products or all)
    if (bestsellersTrack) {
      const bestSellers = allProducts.slice(0, 8);
      bestsellersTrack.innerHTML = bestSellers.map((p, idx) => createHomeCardHtml(p, idx)).join('');
    }

  } catch (err) {
    console.info('Home dynamic product load fallback active:', err.message);
  }
});

function createHomeCardHtml(product, index) {
  const slug = product.slug?.current || product.slug || '';
  const detailUrl = 'product.html?slug=' + encodeURIComponent(slug);
  
  const imgBuilder = urlFor(product.mainImage);
  const imgUrl = imgBuilder.width(400).quality(70).auto('format').url();
  const srcsetStr = imgBuilder.srcset([240, 360, 480]);
  const altText = product.mainImage?.alt || product.title || 'Product Image';
  
  const isAboveFold = index < 4;
  const loadingAttr = isAboveFold ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';

  let badgeHtml = '';
  if (product.badge === 'sale') {
    badgeHtml = '<span class="product-badge sale">Sale</span>';
  } else if (product.badge === 'new') {
    badgeHtml = '<span class="product-badge new">New</span>';
  } else if (product.badge === 'sold-out') {
    badgeHtml = '<span class="product-badge sold-out">Sold out</span>';
  }

  const priceFormatted = 'Rs.' + Number(product.price || 1400).toLocaleString() + '.00 PKR';
  let priceHtml = '<span class="product-price">' + priceFormatted + '</span>';
  if (product.oldPrice && product.oldPrice > product.price) {
    const oldPriceFormatted = 'Rs.' + Number(product.oldPrice).toLocaleString() + '.00 PKR';
    priceHtml = '<span class="product-price-old">' + oldPriceFormatted + '</span><span class="product-price sale-price">' + priceFormatted + '</span>';
  }

  const rating = product.rating || 5;
  const reviews = product.reviewsCount || 12;
  const starsHtml = Array.from({ length: 5 }, (_, i) => 
    '<svg viewBox="0 0 20 20" style="' + (i < rating ? 'fill: var(--clr-star);' : 'fill: var(--clr-gray);') + '"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z"/></svg>'
  ).join('');

  return '<div class="product-card fade-in visible" id="home-prod-' + (product._id || index) + '">' +
    '<a href="' + detailUrl + '" class="product-card-link" aria-label="' + escapeHtml(product.title) + '">' +
      '<div class="product-card-img">' +
        badgeHtml +
        '<button class="product-wish" aria-label="Add to wishlist" onclick="event.preventDefault(); event.stopPropagation(); toggleWishlist(this);">' +
          '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' +
        '</button>' +
        '<div class="product-quick-shop">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Quick View' +
        '</div>' +
        '<img src="' + escapeHtml(imgUrl) + '" ' +
             (srcsetStr ? 'srcset="' + escapeHtml(srcsetStr) + '" ' : '') +
             'sizes="(max-width: 380px) calc(100vw - 32px), (max-width: 480px) calc(50vw - 21px), (max-width: 768px) calc(50vw - 27px), (max-width: 1200px) calc(33vw - 27px), 280px" ' +
             'alt="' + escapeHtml(altText) + '" ' +
             loadingAttr + '>' +
      '</div>' +
      '<div class="product-card-body">' +
        '<div class="product-rating">' +
          '<div class="product-stars">' +
            starsHtml +
          '</div>' +
          '<span class="product-reviews">(' + reviews + ')</span>' +
        '</div>' +
        '<h3 class="product-name">' + escapeHtml(product.title) + '</h3>' +
        '<div class="product-pricing">' +
          priceHtml +
        '</div>' +
        '<span class="product-choose-btn">Choose options</span>' +
      '</div>' +
    '</a>' +
  '</div>';
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
