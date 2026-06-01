export default {
  name: 'showDate',
  title: 'Date de représentation',
  type: 'document',
  fields: [
    { name: 'date', title: 'Date et heure', type: 'datetime', options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' } },
    { name: 'city', title: 'Ville', type: 'string' },
    { name: 'venue', title: 'Lieu', type: 'string' },
    { name: 'address', title: 'Adresse', type: 'string' },
    { name: 'ticketUrl', title: 'Lien billets (laisser vide si pas encore disponible)', type: 'url' },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Confirmé', value: 'confirmed' },
          { title: 'À confirmer', value: 'pending' },
          { title: 'Complet', value: 'sold-out' },
        ],
        layout: 'radio',
      },
      initialValue: 'confirmed',
    },
    { name: 'eventLabel', title: 'Nom de l\'événement (optionnel, ex: Mo Ashibi — Journée Okinawa)', type: 'string' },
    {
      name: 'notes',
      title: 'Notes (optionnel, ex: Dans le cadre de la saison EVIDANSE)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    },
  ],
  orderings: [{ title: 'Date', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { title: 'city', subtitle: 'date', venue: 'venue' },
    prepare({ title, subtitle, venue }) {
      const d = subtitle ? new Date(subtitle).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
      return { title: `${title} — ${venue}`, subtitle: d }
    },
  },
}
