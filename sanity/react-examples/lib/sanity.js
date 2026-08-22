import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export const GROQ_QUERIES = {
  ALL_PRODUCTS: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    oldPrice,
    mainImage,
    badge,
    rating,
    reviewsCount
  }`,

  PRODUCT_BY_SLUG: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    oldPrice,
    mainImage,
    gallery,
    description,
    badge,
    brand,
    rating,
    reviewsCount,
    sizes,
    details
  }`,
};
