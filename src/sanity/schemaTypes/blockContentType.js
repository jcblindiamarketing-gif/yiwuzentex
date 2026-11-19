import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, CodeIcon} from '@sanity/icons'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
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
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [{title: 'URL', name: 'href', type: 'url'}],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alternative Text'}],
    }),
    defineArrayMember({
      name: 'htmlBlock',
      title: 'HTML Block',
      type: 'object',
      icon: CodeIcon,
      fields: [{name: 'html', title: 'HTML', type: 'text', rows: 12}],
      preview: {
        select: {html: 'html'},
        prepare({html}) {
          return {title: 'HTML Block', subtitle: html ? html.slice(0, 80) : 'Empty'}
        },
      },
    }),
  ],
})