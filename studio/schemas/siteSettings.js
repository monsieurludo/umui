export default {
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre du site', type: 'string' },
    {
      name: 'supertitle',
      title: 'Texte au-dessus du titre (ex: DANSE TRADITIONNELLE JAPONAISE...)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    {
      name: 'tagline',
      title: 'Sous-titre (ex: Tournée Suisse · Septembre 2026)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    {
      name: 'heroCtaLabel',
      title: 'Bouton CTA (hero)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
    {
      name: 'heroImage',
      title: 'Image de fond (hero)',
      description: 'Image affichée en arrière-plan dans la section héro',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'videoUrl',
      title: 'URL vidéo Vimeo (optionnel — section vidéo entre hero et concept)',
      description: 'Ex: https://vimeo.com/811180335 — laisser vide pour masquer la section',
      type: 'url',
    },
    {
      name: 'conceptTeaserText',
      title: 'Texte teaser "À propos" (homepage)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    },
    {
      name: 'footerTextSwiss',
      title: 'Footer — Contact Suisse',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label (ex: SUISSE)', type: 'string' },
        { name: 'name', title: 'Nom', type: 'string' },
        { name: 'contactPerson', title: 'Personne de contact', type: 'string' },
        { name: 'phone', title: 'Téléphone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
      ],
    },
    {
      name: 'footerTextJapan',
      title: 'Footer — Contact Japon',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label (ex: JAPON)', type: 'string' },
        { name: 'name', title: 'Nom', type: 'string' },
        { name: 'address', title: 'Adresse', type: 'text', rows: 2 },
        { name: 'contactPerson', title: 'Personne de contact', type: 'string' },
        { name: 'phone', title: 'Téléphone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
      ],
    },
    {
      name: 'instagramUrl',
      title: 'Lien Instagram',
      type: 'url',
    },
    {
      name: 'copyright',
      title: 'Texte copyright (footer)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
