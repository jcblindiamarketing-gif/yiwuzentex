import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons' // you can change icon if you prefer

export const exhibitionType = defineType({
    name: 'exhibition',
    title: 'Exhibition',
    type: 'document',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'headerImage',
            title: 'Header Image',
            type: 'image',
            validation: Rule => Rule.required(),
            description: "Upload a header image for this exhibition (Dimensions: 1920x800px)",
        }),

        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date of Exhibition',
            type: 'datetime',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
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
            name: 'description',
            title: 'Description',
            type: 'text', // assuming this is already defined in your schema
        }),

        defineField({
            name: "youtubeVideo",
            title: "Youtube Video Embed Link",
            type: "string",
            description: "Paste the embed link(iframe src) of the youtube video here"
        }),
    ],
    orderings: [
        {
            title: 'Newest to Oldest',
            name: 'newestToOldest',
            by: [{ field: 'date', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            date: 'date',
        },
        prepare({ title, media, date }) {
            return {
                title,
                media,
                subtitle: date ? `Exhibition on ${new Date(date).toLocaleDateString()}` : 'No date',
            }
        },
    },
})
