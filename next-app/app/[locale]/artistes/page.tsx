export const revalidate = 0

import { Locale, Artist } from '@/lib/types'
import { sanityClient } from '@/lib/sanity'
import { artistsQuery } from '@/lib/queries'
import ArtistCard from '@/components/ArtistCard'
import { useTranslations } from 'next-intl'

const PLACEHOLDER_ARTISTS: Artist[] = [
  { _id: '1', name: 'Kozue Miyagi', slug: { current: 'kozue-miyagi' }, role: { fr: 'Danse', en: 'Dance' }, roleTag: 'DANSEUSE · RYŪKYŪ BUYŌ', group: 'okinawa-artists', bio: { fr: [], en: [] }, order: 1 },
  { _id: '2', name: 'Ruki Nakahara', slug: { current: 'ruki-nakahara' }, role: { fr: 'Danse', en: 'Dance' }, roleTag: 'DANSEUSE · RYŪKYŪ BUYŌ', group: 'okinawa-artists', bio: { fr: [], en: [] }, order: 2 },
  { _id: '3', name: 'Iroha Nakachi', slug: { current: 'iroha-nakachi' }, role: { fr: 'Danse', en: 'Dance' }, roleTag: 'DANSEUSE · RYŪKYŪ BUYŌ', group: 'okinawa-artists', bio: { fr: [], en: [] }, order: 3 },
  { _id: '4', name: 'Fūka Nakazato', slug: { current: 'fuka-nakazato' }, role: { fr: 'Danse', en: 'Dance' }, roleTag: 'DANSEUSE · KUMIODORI', group: 'okinawa-artists', bio: { fr: [], en: [] }, order: 4 },
  { _id: '5', name: 'Takuya Shimabukuro', slug: { current: 'takuya-shimabukuro' }, role: { fr: 'Shishi, tambours Eisa', en: 'Shishi, Eisa drums' }, roleTag: 'SHISHI · TAMBOURS EISA', group: 'okinawa-artists', bio: { fr: [], en: [] }, order: 5 },
  { _id: '6', name: 'Fumiya Iha', slug: { current: 'fumiya-iha' }, role: { fr: 'Shishi, tambours Eisa', en: 'Shishi, Eisa drums' }, roleTag: 'SHISHI · TAMBOURS EISA', group: 'okinawa-artists', bio: { fr: [], en: [] }, order: 6 },
  { _id: '7', name: 'Mina Mermoud', slug: { current: 'mina-mermoud' }, role: { fr: 'Sanshin, chant', en: 'Sanshin, vocals' }, roleTag: 'SANSHIN · CHANT', group: 'swiss-musicians', bio: { fr: [], en: [] }, order: 7 },
  { _id: '8', name: 'Yomo Tagami', slug: { current: 'yomo-tagami' }, role: { fr: 'Flûte, chant', en: 'Flute, vocals' }, roleTag: 'FLÛTE · CHANT', group: 'swiss-musicians', bio: { fr: [], en: [] }, order: 8 },
  { _id: '9', name: 'Daniel López', slug: { current: 'daniel-lopez' }, role: { fr: 'Réalisation, mise en scène', en: 'Direction, stage director' }, roleTag: 'RÉALISATION · MISE EN SCÈNE', group: 'film-crew', bio: { fr: [], en: [] }, order: 9 },
  { _id: '10', name: 'Tomoya Ogoshi', slug: { current: 'tomoya-ogoshi' }, role: { fr: 'Production, lumières', en: 'Production, lighting' }, roleTag: 'PRODUCTION · LUMIÈRES', group: 'film-crew', bio: { fr: [], en: [] }, order: 10 },
  { _id: '11', name: 'Denys Fontanarosa', slug: { current: 'denys-fontanarosa' }, role: { fr: 'Composition musicale', en: 'Music composition' }, roleTag: 'COMPOSITION MUSICALE', group: 'film-crew', bio: { fr: [], en: [] }, order: 11 },
  { _id: '12', name: 'Igor Shin Moromisato', slug: { current: 'igor-shin-moromisato' }, role: { fr: 'Caméra Live', en: 'Live Camera' }, roleTag: 'CAMÉRA LIVE', group: 'film-crew', bio: { fr: [], en: [] }, order: 12 },
  { _id: '13', name: 'Yuta Nakama', slug: { current: 'yuta-nakama' }, role: { fr: 'Photographe', en: 'Photographer' }, roleTag: 'PHOTOGRAPHE', group: 'film-crew', bio: { fr: [], en: [] }, order: 13 },
]

async function getArtists(): Promise<Artist[]> {
  try {
    const artists = await sanityClient.fetch(artistsQuery)
    return artists?.length ? artists : PLACEHOLDER_ARTISTS
  } catch {
    return PLACEHOLDER_ARTISTS
  }
}

export default async function ArtistesPage({ params: { locale } }: { params: { locale: Locale } }) {
  const artists = await getArtists()
  return <ArtistesInner artists={artists} locale={locale} />
}

function ArtistesInner({ artists, locale }: { artists: Artist[]; locale: Locale }) {
  const t = useTranslations('artistes')

  const groups = [
    { key: 'okinawa-artists', label: t('groupOkinawa') },
    { key: 'swiss-musicians', label: t('groupSwiss') },
    { key: 'film-crew', label: t('groupFilm') },
  ] as const

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">{t('title')}</h1>
      <p className="text-[#6B6B6B] text-lg mb-20">{t('subtitle')}</p>

      {groups.map(group => {
        const groupArtists = artists.filter(a => a.group === group.key)
        if (!groupArtists.length) return null
        return (
          <section key={group.key} className="mb-20">
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8E4DE]">{group.label}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {groupArtists.map(artist => (
                <ArtistCard key={artist._id} artist={artist} locale={locale} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
