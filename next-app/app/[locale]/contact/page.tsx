export const revalidate = 0

import { useTranslations } from 'next-intl'
import { Locale, ContactInfo, Partner } from '@/lib/types'
import { sanityClient } from '@/lib/sanity'
import { contactInfoQuery, partnersQuery } from '@/lib/queries'

const FALLBACK_SWISS_CONTACT = {
  name: 'ADIGARA Switzerland',
  address: '',
  email: 'info@adigara.ch',
  phone: '+41 78 215 91 71',
  website: 'https://www.adigara.ch',
  contactPerson: 'Ayako Yonaha',
}

const FALLBACK_JAPAN_CONTACT = {
  name: 'Garaman Hall',
  address: '314-1 Ginoza, 904-1302 Ginoza village\nOkinawa, Japan',
  email: 'otoyaogoshi@gmail.com',
  phone: '+81 98 983 26 13',
  website: 'https://www.garaman.jp',
  contactPerson: 'Tomoya Ogoshi',
}

const FALLBACK_PARTNERS: Partner[] = [
  { _id: '1', name: 'Centre culturel Garaman Hall', url: 'https://www.garaman.jp', role: { fr: '', en: '' } },
  { _id: '2', name: 'ADIGARA', url: 'https://www.adigara.ch', role: { fr: '', en: '' } },
  { _id: '3', name: 'Japan Information and Cultural Center, Berne', url: 'https://www.ch.emb-japan.go.jp/itpr_de/kultur.html', role: { fr: '', en: '' } },
  { _id: '4', name: 'Centre culturel du district de Porrentruy', url: 'https://cultureporrentruy.ch/', role: { fr: '', en: '' } },
  { _id: '5', name: 'Melinda Dance Company', url: 'https://melindadancecompany.com', role: { fr: '', en: '' } },
  { _id: '6', name: 'Association Jura-Okinawa', url: undefined, role: { fr: '', en: '' } },
]

async function getData(): Promise<{ contactInfo: ContactInfo | null; partners: Partner[] }> {
  try {
    const [contactInfo, partners] = await Promise.all([
      sanityClient.fetch(contactInfoQuery),
      sanityClient.fetch(partnersQuery),
    ])
    return { contactInfo: contactInfo || null, partners: partners?.length ? partners : [] }
  } catch {
    return { contactInfo: null, partners: [] }
  }
}

export default async function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  const { contactInfo, partners } = await getData()

  const swissContact = contactInfo?.swissContact
    ? {
        name: contactInfo.swissContact.name,
        address: contactInfo.swissContact.address || '',
        email: contactInfo.swissContact.email,
        phone: contactInfo.swissContact.phone,
        website: contactInfo.swissContact.website || FALLBACK_SWISS_CONTACT.website,
        contactPerson: contactInfo.swissContact.contactPerson || '',
      }
    : FALLBACK_SWISS_CONTACT

  const japanContact = contactInfo?.japanContact
    ? {
        name: contactInfo.japanContact.name,
        address: contactInfo.japanContact.address || '',
        email: contactInfo.japanContact.email,
        phone: contactInfo.japanContact.phone,
        website: contactInfo.japanContact.website || FALLBACK_JAPAN_CONTACT.website,
        contactPerson: contactInfo.japanContact.contactPerson || '',
      }
    : FALLBACK_JAPAN_CONTACT

  const displayPartners: Partner[] = partners.length ? partners : FALLBACK_PARTNERS

  return (
    <ContactPage_Inner
      locale={locale}
      swissContact={swissContact}
      japanContact={japanContact}
      partners={displayPartners}
    />
  )
}

type ContactBlock = {
  name: string
  address: string
  email: string
  phone: string
  website: string
  contactPerson: string
}

function ContactCard({ contact }: { contact: ContactBlock }) {
  return (
    <div className="text-sm text-[#6B6B6B] space-y-2">
      {contact.contactPerson && <p>{contact.contactPerson}</p>}
      {contact.address && contact.address.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      {contact.phone && <p>Tél {contact.phone}</p>}
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="block hover:text-[#C8702A] transition-colors">
          {contact.email}
        </a>
      )}
      {contact.website && (
        <a
          href={contact.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[#C8702A] transition-colors"
        >
          {contact.website.replace(/^https?:\/\//, '')}
        </a>
      )}
    </div>
  )
}

function ContactPage_Inner({
  locale,
  swissContact,
  japanContact,
  partners,
}: {
  locale: Locale
  swissContact: ContactBlock
  japanContact: ContactBlock
  partners: Partner[]
}) {
  const t = useTranslations('contact')

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-16">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div>
          <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('suisse')}</p>
          <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4">{swissContact.name}</h2>
          <ContactCard contact={swissContact} />
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('japon')}</p>
          <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4">{japanContact.name}</h2>
          <ContactCard contact={japanContact} />
        </div>
      </div>

      <div className="border-t border-[#E8E4DE] pt-16">
        <h2 className="font-serif text-2xl text-[#1A1A1A] mb-8">{t('partenaires')}</h2>
        <ul className="space-y-3">
          {partners.map(p => (
            <li key={p._id} className="text-sm text-[#6B6B6B]">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8702A] transition-colors"
                >
                  {p.name} ↗
                </a>
              ) : (
                p.name
              )}
              {p.role?.[locale] && (
                <span className="ml-2 text-xs text-[#9B9B9B]">{p.role[locale]}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
