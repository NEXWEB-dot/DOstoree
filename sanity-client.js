/**
 * DO STORE — Sanity CMS Client & Portable Text Renderer (High Performance CDN Edition)
 * 
 * Performance & CDN Optimizations:
 * 1. Sanity Edge API CDN (apicdn.sanity.io) for global sub-50ms cached responses
 * 2. Two-tier caching (In-Memory + SessionStorage) with Stale-While-Revalidate (SWR)
 * 3. Request deduplication & AbortController network timeout protection
 * 4. Image CDN builder with auto=format (WebP/AVIF), quality optimization, and responsive srcset generation
 * 5. Optimized projection GROQ queries
 */

// ── Sanity Configuration ──
export const SANITY_CONFIG = {
  projectId: 'q4054qmy', // Live DO Store Sanity Project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Uses global Edge CDN (apicdn.sanity.io)
  cacheTtlMs: 10 * 60 * 1000, // 10 minutes client cache TTL
};

// ── GROQ Queries ──
export const GROQ_QUERIES = {
  // Query 1: Fetch all products for Shop Page with team & bundle data (optimized projection)
  FETCH_ALL_PRODUCTS: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    teamName,
    price,
    oldPrice,
    hasBundleOffer,
    bundleQuantity,
    bundlePrice,
    bundleDiscountNote,
    sizes,
    mainImage,
    badge,
    rating,
    reviewsCount
  }`,

  // Query 2: Fetch single product with full payload (description, gallery, bundle options) by Slug
  FETCH_PRODUCT_BY_SLUG: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    teamName,
    price,
    oldPrice,
    hasBundleOffer,
    bundleQuantity,
    bundlePrice,
    bundleDiscountNote,
    sizes,
    mainImage,
    gallery,
    description,
    badge,
    rating,
    reviewsCount,
    details
  }`,
};

// ── Fallback Demo Products (with Rs. 2,350 & 4 for Rs. 4,200 bundle pricing) ──
export const FALLBACK_PRODUCTS = [
  {
    _id: 'prod-1',
    title: 'Barcelona away shirt 25/26 (Kobe Edition)',
    slug: { current: 'barcelona-away-25-26-kobe-edition' },
    teamName: 'FC Barcelona',
    price: 2350,
    oldPrice: 3000,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Special Bundle: 4 Jerseys for Rs. 4,200 (Only Rs. 1,050 each)',
    badge: 'sold-out',
    rating: 5,
    reviewsCount: 12,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    mainImage: {
      asset: { _ref: 'image-barcelona-away-jpg' },
      alt: 'Barcelona Away Shirt 25/26 (Kobe Edition)',
      url: 'images/754070242_18095889170095746_1850153576216694919_n.jpg',
    },
    gallery: [
      { asset: { _ref: 'g-1' }, url: 'images/754070242_18095889170095746_1850153576216694919_n.jpg', alt: 'Front View' },
      { asset: { _ref: 'g-2' }, url: 'images/image (34).jpg', alt: 'Close-up Detail' },
      { asset: { _ref: 'g-3' }, url: 'images/image (35).jpg', alt: 'Fabric Texture' },
      { asset: { _ref: 'g-4' }, url: 'images/image (36).jpg', alt: 'Back View' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The exclusive Kobe Bryant tribute edition for the 25/26 season. Crafted with premium, breathable Dri-FIT technology that wicks sweat away from the skin for quicker evaporation, helping you stay dry and comfortable on and off the pitch.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Product Features & Material',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: '100% Recycled Polyester moisture-wicking fabric' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Embroidered silicone Kobe crest & signature detailing' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Standard fit for a relaxed, match-day feel' }],
      },
    ],
    details: [
      '100% Recycled Polyester fabric',
      'Dri-FIT technology for moisture wicking',
      'Embroidered club crest and swoosh',
      'Standard fit for a relaxed, easy feel',
      'Machine washable',
    ],
  },
  {
    _id: 'prod-2',
    title: 'Real Madrid away shirt 24/25 (blue)',
    slug: { current: 'real-madrid-away-24-25-blue' },
    teamName: 'Real Madrid',
    price: 2350,
    oldPrice: 2800,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Special Bundle: 4 Jerseys for Rs. 4,200',
    badge: 'sale',
    rating: 5,
    reviewsCount: 8,
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: {
      asset: { _ref: 'image-rm-away-jpg' },
      alt: 'Real Madrid away shirt 24/25 (blue)',
      url: 'images/image (35).jpg',
    },
    gallery: [
      { asset: { _ref: 'g-21' }, url: 'images/image (35).jpg', alt: 'Front' },
      { asset: { _ref: 'g-22' }, url: 'images/image (34).jpg', alt: 'Angle' },
      { asset: { _ref: 'g-23' }, url: 'images/image (37).jpg', alt: 'Crest' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The vibrant electric blue away jersey worn by Los Blancos during their dominant 24/25 campaign. Features authentic heat-applied crests and metallic accents.',
          },
        ],
      },
    ],
  },
  {
    _id: 'prod-3',
    title: 'Portugal away shirt 25/26 (long sleeve)',
    slug: { current: 'portugal-away-25-26-long-sleeve' },
    teamName: 'Portugal',
    price: 2350,
    oldPrice: 2600,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Bundle Deal: 4 for Rs. 4,200',
    badge: 'bundle',
    rating: 5,
    reviewsCount: 15,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    mainImage: {
      asset: { _ref: 'image-portugal-jpg' },
      alt: 'Portugal away shirt 25/26 (long sleeve)',
      url: 'images/746927377_18094702874095746_8217654202578146858_n.jpg',
    },
    gallery: [
      { asset: { _ref: 'g-31' }, url: 'images/746927377_18094702874095746_8217654202578146858_n.jpg', alt: 'Full Jersey' },
      { asset: { _ref: 'g-32' }, url: 'images/image (38).jpg', alt: 'Details' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Inspired by traditional Portuguese Azulejo tile art. Long sleeve edition tailored for optimum performance, comfort, and heritage elegance.',
          },
        ],
      },
    ],
  },
  {
    _id: 'prod-4',
    title: 'Real Madrid dragon edition (pink)',
    slug: { current: 'real-madrid-dragon-edition-pink' },
    teamName: 'Real Madrid',
    price: 2350,
    oldPrice: 2700,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Bundle Deal: 4 for Rs. 4,200',
    badge: 'sale',
    rating: 5,
    reviewsCount: 5,
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: {
      asset: { _ref: 'image-dragon-jpg' },
      alt: 'Real Madrid dragon edition (pink)',
      url: 'images/image (36).jpg',
    },
    gallery: [
      { asset: { _ref: 'g-41' }, url: 'images/image (36).jpg', alt: 'Front View' },
      { asset: { _ref: 'g-42' }, url: 'images/image (34).jpg', alt: 'Detail' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Iconic dragon motif reimagined in a striking pink colorway. Designed by Yohji Yamamoto celebrating the greatness and mythical spirit of the club.',
          },
        ],
      },
    ],
  },
  {
    _id: 'prod-5',
    title: 'Real Madrid UCL away shirt 24/25',
    slug: { current: 'real-madrid-ucl-away-24-25' },
    teamName: 'Real Madrid',
    price: 2350,
    oldPrice: 2800,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Bundle Deal: 4 for Rs. 4,200',
    badge: 'sold-out',
    rating: 5,
    reviewsCount: 18,
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: {
      asset: { _ref: 'image-ucl-jpg' },
      alt: 'Real Madrid UCL away shirt 24/25',
      url: 'images/image (34).jpg',
    },
    gallery: [
      { asset: { _ref: 'g-51' }, url: 'images/image (34).jpg', alt: 'Front' },
      { asset: { _ref: 'g-52' }, url: 'images/image (35).jpg', alt: 'Back' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Special Champions League badge edition with 15-time winner UCL sleeve patch. Premium woven fabric with precision temperature control.',
          },
        ],
      },
    ],
  },
  {
    _id: 'prod-6',
    title: 'Real Madrid home shirt 24/25',
    slug: { current: 'real-madrid-home-24-25' },
    teamName: 'Real Madrid',
    price: 2350,
    oldPrice: 2900,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Bundle Deal: 4 for Rs. 4,200',
    badge: 'sale',
    rating: 5,
    reviewsCount: 22,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    mainImage: {
      asset: { _ref: 'image-home-jpg' },
      alt: 'Real Madrid home shirt 24/25',
      url: 'images/image (37).jpg',
    },
    gallery: [
      { asset: { _ref: 'g-61' }, url: 'images/image (37).jpg', alt: 'Front' },
      { asset: { _ref: 'g-62' }, url: 'images/image (34).jpg', alt: 'Side' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The iconic pristine all-white home kit with houndstooth micro-texture and classic black 3-stripes. The timeless look of European football royalty.',
          },
        ],
      },
    ],
  },
  {
    _id: 'prod-7',
    title: 'Real Madrid away shirt 24/25 (half sleeve)',
    slug: { current: 'real-madrid-away-24-25-half-sleeve' },
    teamName: 'Real Madrid',
    price: 2350,
    oldPrice: 2700,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Bundle Deal: 4 for Rs. 4,200',
    badge: 'sold-out',
    rating: 5,
    reviewsCount: 31,
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: {
      asset: { _ref: 'image-rm-half-jpg' },
      alt: 'Real Madrid away shirt 24/25 (half sleeve)',
      url: 'images/image (35).jpg',
    },
    gallery: [
      { asset: { _ref: 'g-71' }, url: 'images/image (35).jpg', alt: 'Front' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Half-sleeve precision cut away jersey featuring lightweight ergonomic cuffs and athletic fit collar.',
          },
        ],
      },
    ],
  },
  {
    _id: 'prod-8',
    title: 'Barcelona third kit 25/26 (gold edition)',
    slug: { current: 'barcelona-third-kit-25-26-gold-edition' },
    teamName: 'FC Barcelona',
    price: 2350,
    oldPrice: 3200,
    hasBundleOffer: true,
    bundleQuantity: 4,
    bundlePrice: 4200,
    bundleDiscountNote: 'Bundle Deal: 4 for Rs. 4,200',
    badge: 'new',
    rating: 5,
    reviewsCount: 9,
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: {
      asset: { _ref: 'image-barca-gold-jpg' },
      alt: 'Barcelona third kit 25/26 (gold edition)',
      url: 'images/754070242_18095889170095746_1850153576216694919_n.jpg',
    },
    gallery: [
      { asset: { _ref: 'g-81' }, url: 'images/754070242_18095889170095746_1850153576216694919_n.jpg', alt: 'Front' },
      { asset: { _ref: 'g-82' }, url: 'images/image (36).jpg', alt: 'Crest Detail' },
    ],
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Luminous gold third kit commemorating Barcelona heritage. Includes iridescent club badge and custom collar ribbon.',
          },
        ],
      },
    ],
  },
];

// ── Sanity Image URL Builder (@sanity/image-url with CDN Optimizations) ──
export class ImageUrlBuilder {
  constructor(config = SANITY_CONFIG) {
    this.config = config;
    this.options = {
      auto: 'format', // Always default to modern WebP / AVIF
      q: 85,          // Optimal compression ratio
    };
    this.source = null;
  }

  image(source) {
    this.source = source;
    return this;
  }

  width(w) {
    this.options.w = w;
    return this;
  }

  height(h) {
    this.options.h = h;
    return this;
  }

  quality(q) {
    this.options.q = q;
    return this;
  }

  auto(mode = 'format') {
    this.options.auto = mode;
    return this;
  }

  fit(mode = 'max') {
    this.options.fit = mode;
    return this;
  }

  dpr(dpr = 2) {
    this.options.dpr = dpr;
    return this;
  }

  format(fmt) {
    this.options.fm = fmt;
    return this;
  }

  /**
   * Generates a responsive srcset string across given widths
   * @param {Array<number>} widths - Array of widths e.g. [300, 600, 900, 1200]
   * @returns {string}
   */
  srcset(widths = [320, 640, 960, 1200]) {
    if (!this.source) return '';
    return widths
      .map((w) => {
        const url = new ImageUrlBuilder(this.config)
          .image(this.source)
          .width(w)
          .quality(this.options.q || 85)
          .auto(this.options.auto || 'format')
          .url();
        return `${url} ${w}w`;
      })
      .join(', ');
  }

  url() {
    if (!this.source) return '';

    // If source is a string URL or local path
    if (typeof this.source === 'string') {
      return this.source;
    }

    // Direct URL in source (e.g. from fallback or custom payload)
    if (this.source.url) {
      return this.source.url;
    }

    // Parse Sanity asset reference: "image-tb4eb642c668356f5ec213402d9fcc0f0920029f-560x560-png"
    const ref = this.source.asset?._ref || this.source._ref || (typeof this.source === 'object' && this.source.asset);
    if (typeof ref === 'string' && ref.startsWith('image-')) {
      const parts = ref.split('-');
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts[3];

      if (id && dimensions && format) {
        let baseUrl = `https://cdn.sanity.io/images/${this.config.projectId}/${this.config.dataset}/${id}-${dimensions}.${format}`;
        const queryParams = new URLSearchParams();
        if (this.options.w) queryParams.set('w', this.options.w);
        if (this.options.h) queryParams.set('h', this.options.h);
        if (this.options.q) queryParams.set('q', this.options.q);
        if (this.options.auto) queryParams.set('auto', this.options.auto);
        if (this.options.fit) queryParams.set('fit', this.options.fit);
        if (this.options.fm) queryParams.set('fm', this.options.fm);
        if (this.options.dpr) queryParams.set('dpr', this.options.dpr);

        const qs = queryParams.toString();
        return qs ? `${baseUrl}?${qs}` : baseUrl;
      }
    }

    // Fallback if image asset has url property directly
    if (this.source.asset?.url) {
      return this.source.asset.url;
    }

    return 'images/754070242_18095889170095746_1850153576216694919_n.jpg';
  }
}

/**
 * Creates an image URL builder instance for any Sanity image source
 * @param {Object|string} source - Sanity image object or asset reference
 * @returns {ImageUrlBuilder}
 */
export function urlFor(source) {
  const builder = new ImageUrlBuilder(SANITY_CONFIG);
  return builder.image(source);
}

// ── Portable Text Renderer (Rich Text to HTML) ──
/**
 * Converts Sanity block / Portable Text rich text array to semantic HTML
 * @param {Array} blocks - Portable Text array
 * @returns {string} HTML string
 */
export function renderPortableText(blocks) {
  if (!blocks) return '';
  if (typeof blocks === 'string') return `<p class="portable-p">${escapeHtml(blocks)}</p>`;
  if (!Array.isArray(blocks)) return '';

  let html = '';
  let inBulletList = false;
  let inNumberList = false;

  blocks.forEach((block) => {
    // Close lists if switching block types
    if (block.listItem !== 'bullet' && inBulletList) {
      html += '</ul>\n';
      inBulletList = false;
    }
    if (block.listItem !== 'number' && inNumberList) {
      html += '</ol>\n';
      inNumberList = false;
    }

    // Handle embedded images in rich text
    if (block._type === 'image') {
      const imgUrl = urlFor(block).width(800).auto('format').quality(85).url();
      const alt = block.alt || '';
      html += `<figure class="portable-img"><img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ''}</figure>\n`;
      return;
    }

    // Handle Block text
    if (block._type === 'block' || !block._type) {
      const childrenHtml = renderSpans(block.children || [], block.markDefs || []);

      if (block.listItem === 'bullet') {
        if (!inBulletList) {
          html += '<ul class="product-feature-list">\n';
          inBulletList = true;
        }
        html += `  <li>${childrenHtml}</li>\n`;
        return;
      }

      if (block.listItem === 'number') {
        if (!inNumberList) {
          html += '<ol class="product-number-list">\n';
          inNumberList = true;
        }
        html += `  <li>${childrenHtml}</li>\n`;
        return;
      }

      switch (block.style) {
        case 'h1':
          html += `<h1 class="portable-h1">${childrenHtml}</h1>\n`;
          break;
        case 'h2':
          html += `<h2 class="portable-h2">${childrenHtml}</h2>\n`;
          break;
        case 'h3':
          html += `<h3 class="portable-h3">${childrenHtml}</h3>\n`;
          break;
        case 'h4':
          html += `<h4 class="portable-h4">${childrenHtml}</h4>\n`;
          break;
        case 'blockquote':
          html += `<blockquote class="portable-quote">${childrenHtml}</blockquote>\n`;
          break;
        default:
          if (childrenHtml.trim()) {
            html += `<p class="portable-p">${childrenHtml}</p>\n`;
          }
          break;
      }
    }
  });

  if (inBulletList) html += '</ul>\n';
  if (inNumberList) html += '</ol>\n';

  return html;
}

function renderSpans(children, markDefs = []) {
  return children
    .map((span) => {
      let text = escapeHtml(span.text || '');
      if (!span.marks || span.marks.length === 0) return text;

      span.marks.forEach((mark) => {
        if (mark === 'strong') text = `<strong>${text}</strong>`;
        else if (mark === 'em') text = `<em>${text}</em>`;
        else if (mark === 'code') text = `<code>${text}</code>`;
        else if (mark === 'underline') text = `<u>${text}</u>`;
        else {
          const def = markDefs.find((d) => d._key === mark);
          if (def && def._type === 'link' && def.href) {
            text = `<a href="${escapeHtml(def.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
          }
        }
      });
      return text;
    })
    .join('');
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

// ── In-Memory Cache & Active Request Deduplication Map ──
const memoryCache = new Map();
const inFlightRequests = new Map();

// ── High Performance Sanity Client with Global Edge CDN ──
export class SanityClient {
  constructor(config = SANITY_CONFIG) {
    this.config = config;
  }

  /**
   * Builds the Sanity API / Edge CDN endpoint URL
   * When useCdn is true, routes to apicdn.sanity.io for global edge caching
   */
  getUrl(query, params = {}) {
    const host = this.config.useCdn !== false ? 'apicdn' : 'api';
    const url = new URL(
      `https://${this.config.projectId}.${host}.sanity.io/v${this.config.apiVersion}/data/query/${this.config.dataset}`
    );
    url.searchParams.set('query', query);
    if (params && Object.keys(params).length > 0) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(`$${key}`, JSON.stringify(value));
      }
    }
    return url.toString();
  }

  /**
   * Generates a stable cache key for queries
   */
  getCacheKey(query, params = {}) {
    return `sanity_cdn_${this.config.projectId}_${query.replace(/\s+/g, ' ').trim()}_${JSON.stringify(params)}`;
  }

  /**
   * Reads from In-Memory or SessionStorage Cache (SWR pattern)
   */
  readCache(cacheKey) {
    const now = Date.now();

    // 1. Check memory cache first
    if (memoryCache.has(cacheKey)) {
      const entry = memoryCache.get(cacheKey);
      if (now - entry.timestamp < (this.config.cacheTtlMs || 300000)) {
        return entry.data;
      }
    }

    // 2. Check browser sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const raw = sessionStorage.getItem(cacheKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (now - parsed.timestamp < (this.config.cacheTtlMs || 300000)) {
            memoryCache.set(cacheKey, parsed);
            return parsed.data;
          }
        }
      } catch {
        // Ignore storage errors
      }
    }

    return null;
  }

  /**
   * Writes to In-Memory and SessionStorage Cache
   */
  writeCache(cacheKey, data) {
    const entry = { data, timestamp: Date.now() };
    memoryCache.set(cacheKey, entry);

    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch {
        // Ignore storage quotas
      }
    }
  }

  /**
   * Fetches data via Sanity Edge CDN (apicdn.sanity.io) with multi-tier caching and fallback
   * @param {string} query - GROQ query string
   * @param {Object} params - Query parameters
   * @param {Object} options - { skipCache: boolean, timeoutMs: number }
   * @returns {Promise<any>}
   */
  async fetch(query, params = {}, options = {}) {
    const cacheKey = this.getCacheKey(query, params);

    // 1. Return from Cache immediately if available (0ms instant render)
    if (!options.skipCache) {
      const cached = this.readCache(cacheKey);
      if (cached !== null) {
        // Revalidate in background asynchronously (Stale While Revalidate)
        this._fetchFromCdn(query, params, cacheKey, options).catch(() => {});
        return cached;
      }
    }

    // 2. Request deduplication: reuse active in-flight request
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey);
    }

    const promise = this._fetchFromCdn(query, params, cacheKey, options).finally(() => {
      inFlightRequests.delete(cacheKey);
    });

    inFlightRequests.set(cacheKey, promise);
    return promise;
  }

  async _fetchFromCdn(query, params, cacheKey, options = {}) {
    const timeoutMs = options.timeoutMs || 4000;
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

    try {
      const requestUrl = this.getUrl(query, params);

      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'public, max-age=600',
        },
        signal: controller ? controller.signal : undefined,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Sanity CDN query HTTP error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result && (Array.isArray(json.result) ? json.result.length > 0 : json.result !== null)) {
        this.writeCache(cacheKey, json.result);
        return json.result;
      }

      return this._handleFallback(query, params);
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      console.info(`[Sanity Edge CDN] (${this.config.projectId}.apicdn.sanity.io) fallback active:`, err.message);
      return this._handleFallback(query, params);
    }
  }

  _handleFallback(query, params) {
    if (query.includes('$slug')) {
      const slug = params?.slug;
      if (!slug) return FALLBACK_PRODUCTS[0];
      const match = FALLBACK_PRODUCTS.find((p) => p.slug.current === slug);
      return match || FALLBACK_PRODUCTS[0];
    }
    return FALLBACK_PRODUCTS;
  }
}

export const sanityClient = new SanityClient(SANITY_CONFIG);
