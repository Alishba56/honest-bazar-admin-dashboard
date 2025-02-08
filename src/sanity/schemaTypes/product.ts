import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name:"description",
            type:"text",
            validation: (rule) => rule.required(),
            title:"Description",
        },
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image"
        },
        {
            name: "price",
            type: "number",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }]
        },
        {
            name:"dicountPercentage",
            type:"number",
            title:"Discount Percentage",
        },
        {
            name:"isNew",
            type:"boolean",
            title:"New Badge",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
              source: "title",
              maxLength: 96,
            },
          },
          {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
          },
          {
            name: 'stock',
            title: 'Stock quantity',
            type: 'string',
            validation: (Rule) => Rule.required().min(0),
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'Clothing', value: 'clothing' },
                { title: 'Accessories', value: 'accessories' },
                { title: 'Footwear', value: 'footwear' },
              ],
            },
          },
          {
            name: 'sku',
            title: 'SKU',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'thumbnails',
            title: 'Thumbnails',
            type: 'array',
            of: [{ type: 'image' }],
          },
          {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(5),
          },
          {
            name: 'reviews',
            title: 'Reviews',
            type: 'number',
            validation: (Rule) => Rule.min(0),
          },
          {
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
              list: [
                { title: 'Small', value: 'S' },
                { title: 'Medium', value: 'M' },
                { title: 'Large', value: 'L' },
              ],
            },
          },
    ]
})