
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
      description:
        'Custom SEO title for search engines. Recommended: 50–60 characters.',
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
      description:
        'Short description for search engine results. Recommended: 150–160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Consider keeping the SEO description within 160 characters.'
        ),
    }),

    // Blog category
    defineField({
      name: 'blogCategory',
      title: 'Blog Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      description: 'Select the main category for this blog post.',
    }),

    // Blog subcategory
    defineField({
      name: 'blogSubcategory',
      title: 'Blog Subcategory',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      options: {
        filter: ({ document }) => {
          const categoryId = document?.blogCategory?._ref

          if (!categoryId) {
            return {
              filter: '_id == $id',
              params: { id: '__no_category_selected__' },
            }
          }

          return {
            filter: 'parent._ref == $categoryId',
            params: { categoryId },
          }
        },
      },
      description:
        'Select a subcategory belonging to the chosen blog category.',
      validation: (Rule) =>
        Rule.custom((subcategory, context) => {
          if (!subcategory) return true

          const categoryId = context.document?.blogCategory?._ref

          if (!categoryId) {
            return 'Select a Blog Category first.'
          }

          return true
        }),
    }),

    // URL slug
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

    // Featured image
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Blog content
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

    // Creation date
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
