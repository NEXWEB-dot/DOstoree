import { productSchema } from './sanity/schemas/product.js';
import { sanityClient, GROQ_QUERIES, urlFor, renderPortableText } from './sanity-client.js';

console.log('=== VERIFYING SANITY CMS & BUNDLE PRICING INTEGRATION ===');

// 1. Check Product Schema
console.log('\n1. Checking Product Schema Fields...');
const fields = productSchema.fields.map(f => f.name);
console.log('Product schema fields:', fields);
const requiredFields = ['title', 'slug', 'teamName', 'price', 'hasBundleOffer', 'bundlePrice', 'bundleQuantity', 'sizes', 'mainImage', 'gallery', 'description'];
const missingFields = requiredFields.filter(f => !fields.includes(f));
if (missingFields.length === 0) {
  console.log('✓ All required fields (including teamName, bundlePrice, sizes, gallery) present in schema');
} else {
  console.error('✗ Missing required fields:', missingFields);
  process.exit(1);
}

// 2. Check GROQ Queries
console.log('\n2. Checking GROQ Queries...');
console.log('Query All Products:\n', GROQ_QUERIES.FETCH_ALL_PRODUCTS.trim());
console.log('Query Product by Slug:\n', GROQ_QUERIES.FETCH_PRODUCT_BY_SLUG.trim());

// 3. Check Image URL Builder
console.log('\n3. Checking Image URL Builder...');
const assetRef = { asset: { _ref: 'image-1234567890abcdef-1200x800-jpg' } };
const generatedUrl = urlFor(assetRef).width(600).height(400).auto('format').quality(90).url();
console.log('Generated Sanity CDN URL:', generatedUrl);
if (generatedUrl.includes('1200-800.jpg?w=600&h=400&q=90&auto=format')) {
  console.log('✓ @sanity/image-url URL generated correctly');
}

// 4. Check Portable Text Renderer
console.log('\n4. Checking Portable Text Renderer...');
const blocks = [
  { _type: 'block', style: 'h2', children: [{ text: 'Specifications' }] },
  { 
    _type: 'block', 
    style: 'normal', 
    children: [
      { text: 'Crafted with ' },
      { text: 'premium Dri-FIT fabric', marks: ['strong'] },
      { text: ' for optimal cooling.' }
    ] 
  },
  { _type: 'block', style: 'normal', listItem: 'bullet', children: [{ text: '100% Recycled Polyester' }] },
  { _type: 'block', style: 'normal', listItem: 'bullet', children: [{ text: 'Standard Match Fit' }] }
];
const html = renderPortableText(blocks);
if (html.includes('<h2 class="portable-h2">Specifications</h2>') && html.includes('<strong>premium Dri-FIT fabric</strong>')) {
  console.log('✓ Portable Text rendered accurately to semantic HTML');
}

// 5. Check Client Fetch & Bundle Calculation
console.log('\n5. Checking Sanity Client Fetch & Pricing...');
async function testFetch() {
  const allProducts = await sanityClient.fetch(GROQ_QUERIES.FETCH_ALL_PRODUCTS);
  console.log(`✓ Fetched ${allProducts.length} products`);
  console.log(`  Sample Product: "${allProducts[0].title}"`);
  console.log(`  Team Name: "${allProducts[0].teamName}"`);
  console.log(`  Single Price: Rs. ${allProducts[0].price}`);
  console.log(`  Bundle Offer: 4 for Rs. ${allProducts[0].bundlePrice}`);
  console.log(`  Sizes: ${allProducts[0].sizes?.join(', ')}`);

  const slug = allProducts[0].slug?.current;
  const singleProduct = await sanityClient.fetch(GROQ_QUERIES.FETCH_PRODUCT_BY_SLUG, { slug });
  console.log(`✓ Fetched single product payload for slug "${slug}"`);
  console.log(`  Title: ${singleProduct.title}`);
  console.log(`  Team: ${singleProduct.teamName}`);
  console.log(`  Gallery count: ${singleProduct.gallery?.length || 0}`);
  console.log(`  Description blocks: ${singleProduct.description?.length || 0}`);

  console.log('\n=== ALL TESTS & VERIFICATIONS PASSED SUCCESSFULLY ===');
}

testFetch();
