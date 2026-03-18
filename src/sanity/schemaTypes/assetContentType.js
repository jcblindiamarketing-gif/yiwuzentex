import { defineType, defineField } from 'sanity'

export const siteBanner = defineType({
    name: 'siteBanner',
    title: 'Site Banners',
    type: 'document',
    fields: [
        defineField({
            name: 'page',
            title: 'Page',
            type: 'string',
            description: 'Select which page this banner is for',
            options: {
                list: [
                    { title: 'Home Page', value: 'home' },
                    { title: 'About Page', value: 'about' },
                    { title: 'Contact Page', value: 'contact' },
                    // Add more pages here as needed
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'banners',
            title: 'Banners',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'ctaUrl',
                            title: 'CTA URL',
                            type: 'string',
                        }),
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Important for accessibility and SEO',
                        }),
                    ],
                }),
            ],
        }),
    ],

    preview: {
        select: {
            title: 'page',
            media: 'banners.0.image',
        },
        prepare({ title, media }) {
            const pageLabel =
                title === 'home'
                    ? 'Home Page'
                    : title === 'about'
                        ? 'About Page'
                        : title === 'contact'
                            ? 'Contact Page'
                            : 'Site Page'

            return {
                title: `${pageLabel} Banners`,
                subtitle: 'Click to manage banners',
                media,
            }
        },
    },
})
