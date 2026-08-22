import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (rule) => rule.required().error('Product title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required for product routing'),
    }),
    defineField({
      name: 'teamName',
      title: 'Team / Club Name',
      type: 'string',
      description: 'e.g. Real Madrid, FC Barcelona, Portugal, Manchester City, Arsenal',
      options: {
        list: [
          {title: 'Real Madrid', value: 'Real Madrid'},
          {title: 'FC Barcelona', value: 'FC Barcelona'},
          {title: 'Portugal', value: 'Portugal'},
          {title: 'Manchester City', value: 'Manchester City'},
          {title: 'Arsenal', value: 'Arsenal'},
          {title: 'Liverpool', value: 'Liverpool'},
          {title: 'Manchester United', value: 'Manchester United'},
          {title: 'Bayern Munich', value: 'Bayern Munich'},
          {title: 'Paris Saint-Germain', value: 'Paris Saint-Germain'},
          {title: 'Argentina', value: 'Argentina'},
          {title: 'Brazil', value: 'Brazil'},
          {title: 'England', value: 'England'},
          {title: 'Other', value: 'Other'},
        ],
      },
      validation: (rule) => rule.required().error('Team Name is required'),
    }),
    defineField({
      name: 'price',
      title: 'Individual Price (PKR)',
      type: 'number',
      description: 'Standard price for 1 jersey (e.g. 2350)',
      initialValue: 2350,
      validation: (rule) => rule.required().min(0).error('Price must be greater than or equal to 0'),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Original / Old Price (PKR)',
      type: 'number',
      description: 'Optional previous price for sale items (e.g. 3000)',
    }),
    defineField({
      name: 'hasBundleOffer',
      title: 'Enable Bundle Offer (e.g. 4 for 4200)',
      type: 'boolean',
      description: 'Toggle on to offer bundle deal pricing on this jersey',
      initialValue: true,
    }),
    defineField({
      name: 'bundleQuantity',
      title: 'Bundle Quantity',
      type: 'number',
      description: 'Number of jerseys in the bundle (e.g. 4)',
      initialValue: 4,
      hidden: ({document}) => !document?.hasBundleOffer,
    }),
    defineField({
      name: 'bundlePrice',
      title: 'Bundle Price (PKR)',
      type: 'number',
      description: 'Total price for the bundle (e.g. 4200 for 4 jerseys)',
      initialValue: 4200,
      hidden: ({document}) => !document?.hasBundleOffer,
    }),
    defineField({
      name: 'bundleDiscountNote',
      title: 'Bundle Discount Note',
      type: 'string',
      description: 'Callout text displayed for the bundle deal',
      initialValue: 'Special Deal: 4 Jerseys for Rs. 4,200 (Only Rs. 1,050 each)',
      hidden: ({document}) => !document?.hasBundleOffer,
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['S', 'M', 'L', 'XL', 'XXL'],
      options: {
        list: [
          {title: 'S - Small', value: 'S'},
          {title: 'M - Medium', value: 'M'},
          {title: 'L - Large', value: 'L'},
          {title: 'XL - Extra Large', value: 'XL'},
          {title: 'XXL - Double Extra Large', value: 'XXL'},
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        }),
      ],
      validation: (rule) => rule.required().error('Main product image is required'),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      description: 'High-resolution showcase images of the jersey',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description (Rich Text)',
      type: 'array',
      description: 'Detailed rich text description formatted via Portable Text',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Product Badge',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: ''},
          {title: 'Sale', value: 'sale'},
          {title: 'New Arrival', value: 'new'},
          {title: 'Sold Out', value: 'sold-out'},
          {title: 'Bundle Deal', value: 'bundle'},
        ],
      },
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'reviewsCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 12,
    }),
    defineField({
      name: 'details',
      title: 'Key Specifications / Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points shown under product specifications accordion',
      initialValue: [
        '100% Recycled Polyester match-grade fabric',
        'Dri-FIT moisture-wicking technology',
        'Embroidered crest and authentic detailing',
        'Standard athletic fit',
        'Machine washable',
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      teamName: 'teamName',
      price: 'price',
      bundlePrice: 'bundlePrice',
      media: 'mainImage',
    },
    prepare({title, teamName, price, bundlePrice, media}) {
      const priceText = price ? `Rs. ${price}` : 'Price not set';
      const bundleText = bundlePrice ? ` | 4 for Rs. ${bundlePrice}` : '';
      return {
        title: title || 'Untitled Product',
        subtitle: `${teamName || 'No team'} — ${priceText}${bundleText}`,
        media,
      }
    },
  },
})

export default productType
