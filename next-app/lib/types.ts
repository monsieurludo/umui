/* eslint-disable @typescript-eslint/no-explicit-any */
export type Locale = 'fr' | 'en'

export type LocalizedString = {
  fr: string
  en: string
  [key: string]: string
}

export type LocalizedText = {
  fr: any[]
  en: any[]
  [key: string]: any[]
}

export type ShowDate = {
  _id: string
  date: string
  city: string
  venue: string
  address: string
  ticketUrl?: string
  status: 'confirmed' | 'pending' | 'sold-out'
  eventLabel?: string
  notes?: LocalizedString
}

export type Artist = {
  _id: string
  name: string
  slug: { current: string }
  role: LocalizedString
  roleTag: string
  group: 'okinawa-artists' | 'swiss-musicians' | 'film-crew'
  photo?: any
  bio: LocalizedText
  order: number
}

export type Partner = {
  _id: string
  name: string
  logo?: any
  url?: string
  role: LocalizedString
}

export type ContactInfo = {
  swissContact: {
    name: string
    address: string
    email: string
    phone: string
    website?: string
    contactPerson?: string
  }
  japanContact: {
    name: string
    address: string
    email: string
    phone: string
    website?: string
    contactPerson?: string
  }
}

export type SiteSettings = {
  title?: string
  tagline?: LocalizedString
  heroImage?: any
  heroCtaLabel?: LocalizedString
}

export type ConceptPage = {
  title: LocalizedString
  filmDescription: LocalizedText
  showDescription: LocalizedText
  directorNote: LocalizedText
  images?: any[]
  stats?: { label: LocalizedString; value: string }[]
}
