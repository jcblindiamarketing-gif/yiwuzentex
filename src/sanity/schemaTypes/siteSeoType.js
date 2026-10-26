
import { defineType, defineField } from 'sanity'

export const siteSeoType = defineType({
  name: 'siteSeo',
  title: 'Site Page SEO',
  type: 'document',

  fields: [
    defineField({
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'pageKey',
      title: 'Page Key',
      type: 'string',
      description:
        'Unique key such as home, about-us, or contact-us.',
      validation: (Rule) =>
        Rule.required().regex(/^[a-z0-9-]+$/).error(
          'Use lowercase letters, numbers, and hyphens only.'
        ),
    }),

    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(60).warning('Aim for 50–60 characters.'),
    }),

    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning('Aim for 150–160 characters.'),
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional. Leave blank to use the default page URL.',
    }),

    defineField({
      name: 'socialImage',
      title: 'Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: 'pageName',
      subtitle: 'pageKey',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled page',
        subtitle: subtitle || 'No page key',
      }
    },
  },
})
