
import { defineType, defineField } from 'sanity'

export const blogCategoryType = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      description:
        'Leave empty for a main category. Select a parent category to create a subcategory.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      parent: 'parent.title',
    },
    prepare({ title, parent }) {
      return {
        title,
        subtitle: parent ? `Subcategory of ${parent}` : 'Main category',
      }
    },
  },
})
