// Reusable localized string field helper
export const localizedString = (name, title) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'fr', title: 'Français', type: 'string' },
    { name: 'en', title: 'English', type: 'string' },
  ],
})

export const localizedText = (name, title) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
    { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
  ],
})
