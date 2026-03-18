import { defineType, defineField, defineArrayMember } from 'sanity'
import { FiFolder } from 'react-icons/fi';


export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'productCategory' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),

        defineField({
            name: 'otherImages',
            title: 'Other Images',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string',
                        }),
                    ],
                }),
            ],
        }),


        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                }),
            ],
        }),

        defineField({
            name: 'mainParent',
            title: 'Main Parent Category',
            type: 'reference',
            to: [{ type: 'productCategory' }],
            icon: FiFolder,
            description: 'Choose a parent category for this product.',
            validation: (Rule) => Rule.required(),
        }),



        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),

        })


    ],
})
