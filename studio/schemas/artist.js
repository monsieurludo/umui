export default {
  name: 'artist',
  title: 'Artiste',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'name', maxLength: 96 } },
    {
      name: 'role',
      title: 'Rôle',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    { name: 'roleTag', title: 'Tag rôle (MAJUSCULES · ex: DANSEUSE · KUMI ODORI)', type: 'string' },
    {
      name: 'group',
      title: 'Groupe',
      type: 'string',
      options: {
        list: [
          { title: "Artistes d'Okinawa", value: 'okinawa-artists' },
          { title: 'Musiciennes suisses', value: 'swiss-musicians' },
          { title: 'Équipe du film', value: 'film-crew' },
        ],
        layout: 'radio',
      },
    },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    {
      name: 'bio',
      title: 'Biographie',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    { name: 'order', title: 'Ordre d\'affichage', type: 'number' },
  ],
  orderings: [{ title: 'Ordre', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'roleTag', media: 'photo' },
  },
}
