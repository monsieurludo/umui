export default {
  name: 'parallelActivity',
  title: 'Activité parallèle',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    { name: 'locations', title: 'Lieux', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Exposition', value: 'exposition' },
          { title: 'Action culturelle', value: 'action-culturelle' },
          { title: 'Autre', value: 'autre' },
        ],
      },
    },
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'type' },
  },
}
