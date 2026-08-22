/**
 * Sanity Product Schema Definition
 * Compatible with Sanity Studio v3 and v2
 */

export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Product title is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for product routing'),
    },
    {
      name: 'teamName',
      title: 'Team / Club Name',
      type: 'string',
      description: 'e.g. FC Barcelona, Real Madrid, Portugal, Manchester City, Arsenal',
      options: {
        list: [
          { title: 'Real Madrid', value: 'Real Madrid' },
          { title: 'FC Barcelona', value: 'FC Barcelona' },
          { title: 'Portugal', value: 'Portugal' },
          { title: 'Manchester City', value: 'Manchester City' },
          { title: 'Arsenal', value: 'Arsenal' },
          { title: 'Liverpool', value: 'Liverpool' },
          { title: 'Manchester United', value: 'Manchester United' },
          { title: 'Bayern Munich', value: 'Bayern Munich' },
          { title: 'Paris Saint-Germain', value: 'Paris Saint-Germain' },
          { title: 'Argentina', value: 'Argentina' },
          { title: 'Brazil', value: 'Brazil' },
          { title: 'England', value: 'England' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required().error('Team Name is required'),
    },
    {
      name: 'price',
      title: 'Individual Price (PKR)',
      type: 'number',
      description: 'Standard price for 1 jersey (e.g. 2350)',
      initialValue: 2350,
      validation: (Rule) => Rule.required().min(0).error('Price must be greater than or equal to 0'),
    },
    {
      name: 'oldPrice',
      title: 'Original / Old Price (PKR)',
      type: 'number',
      description: 'Optional previous price for sale items (e.g. 3000)',
    },
    {
      name: 'hasBundleOffer',
      title: 'Enable Bundle Offer (e.g. 4 for 4200)',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle on to offer bundle deal pricing on this jersey',
    },
    {
      name: 'bundleQuantity',
      title: 'Bundle Quantity',
      type: 'number',
      initialValue: 4,
      description: 'Number of jerseys in the bundle (e.g. 4)',
    },
    {
      name: 'bundlePrice',
      title: 'Bundle Price (PKR)',
      type: 'number',
      initialValue: 4200,
      description: 'Total price for the bundle (e.g. 4200 for 4 jerseys)',
    },
    {
      name: 'bundleDiscountNote',
      title: 'Bundle Discount Note',
      type: 'string',
      initialValue: 'Special Deal: 4 Jerseys for Rs. 4,200 (Only Rs. 1,050 each)',
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['S', 'M', 'L', 'XL', 'XXL'],
      options: {
        list: [
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required().error('Main product image is required'),
    },
    {
      name: 'gallery',
      title: 'Product Image Gallery',
      type: 'array',
      description: 'Array of high-resolution product showcase images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Product Description (Rich Text)',
      type: 'array',
      description: 'Detailed description rendered using Portable Text',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'badge',
      title: 'Product Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Sale', value: 'sale' },
          { title: 'New Arrival', value: 'new' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Bundle Deal', value: 'bundle' },
        ],
      },
    },
    {
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'reviewsCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 12,
    },
    {
      name: 'details',
      title: 'Key Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown under product specifications',
      initialValue: [
        '100% Recycled Polyester match-grade fabric',
        'Dri-FIT moisture-wicking technology',
        'Embroidered crest and authentic detailing',
        'Standard athletic fit',
        'Machine washable',
      ],
    },
  ],
};

export default productSchema;
