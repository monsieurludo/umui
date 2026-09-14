export default {
  name: 'spectaclePage',
  title: 'Page Spectacle',
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
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    {
      name: 'body',
      title: 'Texte',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    {
      name: 'images',
      title: 'Images (affichées en dessous du texte)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
