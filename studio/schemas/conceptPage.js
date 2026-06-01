export default {
  name: 'conceptPage',
  title: 'Page Concept',
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
      name: 'filmDescription',
      title: 'Description du film',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    {
      name: 'showDescription',
      title: 'Description du spectacle',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    {
      name: 'directorNote',
      title: "Note d'intention (Daniel López)",
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'stats',
      title: 'Statistiques (ex: 7 Villes, 13 Artistes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Valeur', type: 'string' },
          {
            name: 'label', title: 'Label', type: 'object',
            fields: [
              { name: 'fr', title: 'Français', type: 'string' },
              { name: 'en', title: 'English', type: 'string' },
            ],
          },
        ],
      }],
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
