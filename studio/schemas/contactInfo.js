const contactFields = [
  { name: 'name', title: 'Nom / Organisation', type: 'string' },
  { name: 'address', title: 'Adresse', type: 'text', rows: 3 },
  { name: 'email', title: 'Email', type: 'string' },
  { name: 'phone', title: 'Téléphone', type: 'string' },
  { name: 'website', title: 'Site web', type: 'url' },
]

export default {
  name: 'contactInfo',
  title: 'Informations de contact',
  type: 'document',
  fields: [
    {
      name: 'swissContact',
      title: 'Contact Suisse (ADIGARA)',
      type: 'object',
      fields: contactFields,
    },
    {
      name: 'japanContact',
      title: 'Contact Japon (Garaman Hall)',
      type: 'object',
      fields: contactFields,
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
