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
  // Query 1: Fetch all products for Shop Page with team data (optimized projection)
  FETCH_ALL_PRODUCTS: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    teamName,
    price,
    oldPrice,
    sizes,
    mainImage,
    badge,
    rating,
    reviewsCount
  }`,

  // Query 2: Fetch single product with full payload by Slug
  FETCH_PRODUCT_BY_SLUG: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    teamName,
    price,
    oldPrice,
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

// ── Fallback Demo Products (Live Sanity Dataset: 16 Products @ Rs. 1,400) ──
export const FALLBACK_PRODUCTS = [
  {
    "_id": "76885fbc-73a2-4f54-bdbf-377f92ffd636",
    "title": "MESSI BARCELONA",
    "slug": {
      "current": "messi-barcelona"
    },
    "teamName": "FC Barcelona",
    "price": 1400,
    "oldPrice": 1600,
    "badge": "new",
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-000fc2a8563006aaed2bb6f885d8246cfb861a5d-1600x1506-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "99d126f010db",
        "_type": "image",
        "asset": {
          "_ref": "image-cbb369d8c0c567a838c1462529394042b9a2a65c-1600x1418-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH MESSI JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "f19b76ff-14cb-4648-b2da-2ff0858647dd",
    "title": "PEDRI SPAIN JERSEY",
    "slug": {
      "current": "pedri-spain-jersey"
    },
    "teamName": "Other",
    "price": 1400,
    "badge": "sale",
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-f6494877db32c769cefd75c5dc3b8165b1e6ce33-1326x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "fa7e5ca9a76e",
        "_type": "image",
        "asset": {
          "_ref": "image-b15d2034a9a840ab6e33f30acd711c3827b4d8fd-1282x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH PEDRI JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "09304761-ed2c-4280-ab61-47fd9ac79b72",
    "title": "MESSI INTERMIAMI JERSEY",
    "slug": {
      "current": "messi-intermiami-jersey"
    },
    "teamName": "Other",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-97467fa7f1b213ed52eddb18b8704de32981e3a6-1212x1280-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "8f0a8af21c74",
        "_type": "image",
        "asset": {
          "_ref": "image-af69ea9c2d286c950d60b7190e87affda247402a-1484x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH MESSI JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "426f9a52-9698-4fd4-96ed-d9bf33a4333c",
    "title": "CRISTIANO RONLADO JERSEY",
    "slug": {
      "current": "cristiano-ronlado-jersey"
    },
    "teamName": "Real Madrid",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-493894be372133892366146b4358770073727d4e-1462x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "bc560bb0e11d",
        "_type": "image",
        "asset": {
          "_ref": "image-05a0758a4476a0e5dcb382f52be91dddc253aab6-1444x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONALDO JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "28610302-7360-47d8-b5ee-31eafb2a1acf",
    "title": "CRISTIANO RONALDO JERSEY",
    "slug": {
      "current": "cristiano-ronaldo-jersey"
    },
    "teamName": "Real Madrid",
    "price": 1400,
    "oldPrice": 1600,
    "badge": "sold-out",
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-3cf3df02cd796991c8094f6acab795f5a9ad39a0-1470x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "2202b6d5bc02",
        "_type": "image",
        "asset": {
          "_ref": "image-bb43f3aff56a6b7f5ff483492b3f40f03458ff94-1380x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONALDOJERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "76ef7f45-906d-410f-9942-4fb585194830",
    "title": "BELLINGHAM JERSEY",
    "slug": {
      "current": "bellingham-jersey"
    },
    "teamName": "England",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-e6b9ce4c03eb911debb279fa3a312465655e37d6-1044x1280-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "3806926e8a25",
        "_type": "image",
        "asset": {
          "_ref": "image-de37a325d8535fa73f178a0b5782fb401d119e46-1110x1280-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH BELLINGHAM JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "76c2d1a1-878f-417e-9972-a0cbbefebc55",
    "title": "CUSTOM BARCA JERSEY",
    "slug": {
      "current": "custom-barca-jersey"
    },
    "teamName": "FC Barcelona",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-7b72515ffe1f4b6313c3dfab8af90f8d641ba67b-1280x1064-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "5841bf645c9e",
        "_type": "image",
        "asset": {
          "_ref": "image-898220dd4388e73a4bcfcd638d5e26005246f1bc-1280x1102-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH CUSTOM BARCA JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "7dbed6b5-dd21-459f-b3ab-626a198cc03f",
    "title": "MESSI JERSEY",
    "slug": {
      "current": "messi-jersey"
    },
    "teamName": "Argentina",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-8740f6f3d5443c7927ecb87d8199cc3ebb6e065d-1280x1240-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "3f788a523efc",
        "_type": "image",
        "asset": {
          "_ref": "image-57a7c33ad38f51a5d47892a25a3e4d5e204f4112-1190x1280-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH MESSI JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "930ea7e4-43d5-469c-a84c-2bc88aa1e4c9",
    "title": "MANCHESTER CITY JERSEY",
    "slug": {
      "current": "manchester-city-jersey"
    },
    "teamName": "Manchester City",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-48dde90723b511c3b00e1a075c3ead9ef2b87c4a-1258x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "348b79728db3",
        "_type": "image",
        "asset": {
          "_ref": "image-8d8a3fcdb3f6dfe192a94f36a647c3466ea64acf-1200x1600-jpg",
          "_type": "reference"
        }
      },
      {
        "_key": "0f3363b5a212",
        "_type": "image",
        "asset": {
          "_ref": "image-f4b630318db7e346050f189d717c8e508b6d0ed8-1232x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH MANCHESTERJERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "a365e721-321a-4ac0-9bb7-02fb4d8c97d9",
    "title": "LAMINE YAMAL JERSEY",
    "slug": {
      "current": "lamine-yamal-jersey"
    },
    "teamName": "FC Barcelona",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-87c46c11701eab4b715890088589126734f0dad6-1125x1270-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "997d15f19ca6",
        "_type": "image",
        "asset": {
          "_ref": "image-ef7bca6971884f79aa5d549e860958abaa1e2849-1434x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH LAMINE YAMAL JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "df5fb94e-1288-4b86-8efb-a301017ee340",
    "title": "CRISTIANO RONALDO JERSEY",
    "slug": {
      "current": "cristiano-ronaldoo-jersey"
    },
    "teamName": "Real Madrid",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-93ad45455010a36b4007bc07fc9a16212a7821ae-1464x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "4dac2336341e",
        "_type": "image",
        "asset": {
          "_ref": "image-a1c9a29e03331782b720d2d9279bfe4945587703-1448x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONALDO JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "087448e7-3b6d-420d-8778-c0df28adade4",
    "title": "BELLINGHAM JERSEY",
    "slug": {
      "current": "bellinghamm-jersey"
    },
    "teamName": "Real Madrid",
    "price": 1400,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-f17f5745b0eb2e45c46856b5b80330d8d478fe98-1390x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "d2f2dadadb5a",
        "_type": "image",
        "asset": {
          "_ref": "image-da2c2c6a9f755245f356f8bf81a6587745f8d006-1294x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH BELLINGHAM JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "dd334e22-26b4-4382-a224-cc8a7e8c0825",
    "title": "CRISTIANO RONALDO JERSEY",
    "slug": {
      "current": "cristiano-ronaldooo-jersey"
    },
    "teamName": "Portugal",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-a56863cc5b1b834faa5155e6ed050f0ae97561e7-1280x1266-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "6b421e012750",
        "_type": "image",
        "asset": {
          "_ref": "image-ab8c7ffdc244678d565255829ba846d58f03c8a1-1280x1212-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONALDO JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "31b7030d-e4d4-4635-a8cc-bb9a6d04aa4d",
    "title": "CRISTIANO RONALDO INT",
    "slug": {
      "current": "cristiano-ronaldo-int"
    },
    "teamName": "Portugal",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-b91ab38078a4b5e77afa8b9f761274e5144aad7b-1280x1204-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "c25110b22519",
        "_type": "image",
        "asset": {
          "_ref": "image-4221af25b7d6e5b947e0103a83de131e8fa90024-1234x1280-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONADLO JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "b7afe3a6-b1f6-4334-b002-15bda04c0f77",
    "title": "CRISTIANO RONALDO CUSTOM JERSEY",
    "slug": {
      "current": "cristiano-ronaldo-custom-jersey"
    },
    "teamName": "Real Madrid",
    "price": 1400,
    "oldPrice": 1600,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-1f6b7cb7e88f594ae52e9589e8e69c176890b2bf-1390x1600-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "0dbf057699fe",
        "_type": "image",
        "asset": {
          "_ref": "image-3d37c8952eba32204858bfc568e261051a76a06a-1424x1600-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONALDO JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  },
  {
    "_id": "51c0283d-b8db-44f6-8764-d2357cd3bacb",
    "title": "CRISTIANO RONALDO JERSEY",
    "slug": {
      "current": "cristiano-ronaldo-jerseyy"
    },
    "teamName": "Real Madrid",
    "price": 1400,
    "rating": 5,
    "reviewsCount": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "mainImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-c2652d0ec58a2ad7b78877c3c94ac16ca8498634-1254x1280-jpg",
        "_type": "reference"
      }
    },
    "gallery": [
      {
        "_key": "1908109bb933",
        "_type": "image",
        "asset": {
          "_ref": "image-5605171923ba5899588ff7bc8ce187f213369481-1130x1280-jpg",
          "_type": "reference"
        }
      }
    ],
    "description": [
      {
        "_key": "3ecdf29cb9ed",
        "_type": "block",
        "children": [
          {
            "_key": "8a37cc56d5ef",
            "_type": "span",
            "marks": [],
            "text": "ELEVATE YOUR MATCHES WITH RONALDO JERSEY."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da076734994e",
        "_type": "block",
        "children": [
          {
            "_key": "49dc527cf8c5",
            "_type": "span",
            "marks": [],
            "text": "Design for ultimate comfort and iconic flair."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "details": [
      "100% Recycled Polyester match-grade fabric",
      "Dri-FIT moisture-wicking technology",
      "Embroidered crest and authentic detailing",
      "Standard athletic fit",
      "Machine washable"
    ]
  }
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
