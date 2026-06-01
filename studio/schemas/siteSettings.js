export default {
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre du site', type: 'string' },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    { name: 'heroImage', title: 'Image hero', type: 'image', options: { hotspot: true } },
    {
      name: 'heroCtaLabel',
      title: 'Bouton CTA (hero)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
