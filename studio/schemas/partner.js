export default {
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'url', title: 'Site web', type: 'url' },
    {
      name: 'role',
      title: 'Rôle / Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'url', media: 'logo' },
  },
}
