import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Category name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'image',
        type: 'image',
        title: 'Image of Category',
      }),
  ],
})