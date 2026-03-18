import { defineType, defineField, defineArrayMember } from 'sanity'

export const productCategory = defineType({
    name: 'productCategory',
    title: 'Product Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'image',
            title: 'Category Image',
            type: 'image',
            options: { hotspot: true },
            description: "Upload an image for this category",
        }),
        defineField({
            name: 'parent',
            title: 'Parent Category',
            type: 'reference',
            to: [{ type: 'productCategory' }],
            description: 'Select a parent category if this is a subcategory',
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                }),
            ],
        }),

        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),

        defineField({
            name: 'catalogue',
            title: 'Category Catalogue (PDF)',
            type: 'file',
            options: {
                accept: 'application/pdf',
            },
        }),

        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
            description: 'Is this category active?',
        })

    ],
    preview: {
        select: {
            title: 'title',
            parent: 'parent.title',
            image: 'image',
        },
        prepare(selection) {
            const { title, parent, image } = selection
            return {
                title: parent ? `${parent} → ${title}` : title,
                media: image,
            }
        },
    }

})
