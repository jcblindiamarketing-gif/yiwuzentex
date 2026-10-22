import { defineType, defineField, defineArrayMember } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // SEO fields
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      description: 'Custom SEO title for search engines. Recommended: 50–60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning(
          'Consider keeping the SEO title within 60 characters.'
        ),
    }),

    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description for search engine results. Recommended: 150–160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Consider keeping the SEO description within 160 characters.'
        ),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'createdAt',
      media: 'mainImage',
    },
    prepare({ title, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString()
        : 'No date'

      return {
        title,
        subtitle: `Created on ${formattedDate}`,
        media,
      }
    },
  },
})