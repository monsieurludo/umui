export const revalidate = 0

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import ShowDateCard from '@/components/ShowDateCard'
import { sanityClient, urlFor } from '@/lib/sanity'
import { showDatesQuery, siteSettingsQuery, conceptPageQuery } from '@/lib/queries'
import { ShowDate, Locale, ConceptPage, SiteSettings } from '@/lib/types'

// Static placeholder show dates while Sanity is not yet connected
const PLACEHOLDER_SHOWS: ShowDate[] = [
  { _id: '1', date: '2026-09-11T20:00:00', city: 'Onex', venue: 'Ciné-théâtre', address: 'Rue des Bossons 7, 1213 Onex', status: 'confirmed' },
  { _id: '2', date: '2026-09-12T19:00:00', city: 'Berne', venue: 'Musée d\'Histoire de Berne', address: 'Helvetiaplatz 5, 3005 Bern', status: 'confirmed', eventLabel: 'Nihon Matsuri' },
  { _id: '3', date: '2026-09-13T18:00:00', city: 'Neuchâtel', venue: 'Temple du Bas', address: 'Rue du Temple-Neuf 5, 2000 Neuchâtel', status: 'confirmed', eventLabel: 'Mo Ashibi — Journée Okinawa' },
  { _id: '4', date: '2026-09-17T20:00:00', city: 'Porrentruy', venue: 'Salle de l\'INTER', address: 'Allée des Soupirs 15, 2900 Porrentruy', status: 'confirmed', notes: { fr: 'Dans le cadre de la saison EVIDANSE 2026-2027', en: 'Part of the EVIDANSE 2026-2027 season' } },
  { _id: '5', date: '2026-09-19T19:00:00', city: 'Évolène', venue: 'Chapelle des Haudères', address: '1984 Les Haudères', status: 'confirmed', eventLabel: 'Festival Japon en Hérens' },
  { _id: '6', date: '2026-09-22T20:00:00', city: 'Le Sentier', venue: 'Cinéma la Bobine', address: 'Chemin des Cytises 1, 1347 Le Sentier', status: 'confirmed' },
  { _id: '7', date: '2026-09-24T20:00:00', city: 'Zurich', venue: 'À confirmer', address: 'Zurich', status: 'pending' },
]

const FALLBACK_STATS = [
  { value: '7', label: { fr: 'Villes', en: 'Cities' } },
  { value: '13', label: { fr: 'Artistes', en: 'Artists' } },
  { value: '135', label: { fr: 'Min.', en: 'Min.' } },
]

async function getPageData(): Promise<{
  shows: ShowDate[]
  siteSettings: SiteSettings | null
  conceptPage: ConceptPage | null
}> {
  try {
    const [shows, siteSettings, conceptPage] = await Promise.all([
      sanityClient.fetch(showDatesQuery),
      sanityClient.fetch(siteSettingsQuery),
      sanityClient.fetch(conceptPageQuery),
    ])
    return {
      shows: shows?.length ? shows : PLACEHOLDER_SHOWS,
      siteSettings: siteSettings || null,
      conceptPage: conceptPage || null,
    }
  } catch {
    return { shows: PLACEHOLDER_SHOWS, siteSettings: null, conceptPage: null }
  }
}

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  const { shows, siteSettings, conceptPage } = await getPageData()
  const upcomingShows = shows

  const stats: { value: string; label: { fr: string; en: string } }[] =
    conceptPage?.stats?.length ? conceptPage.stats : FALLBACK_STATS

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroImage = siteSettings?.heroImage?.asset ? siteSettings.heroImage : null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conceptTeaserImage = siteSettings?.conceptTeaserImage?.asset ? siteSettings.conceptTeaserImage : null

  return (
    <HomePage_Inner
      shows={upcomingShows}
      locale={locale}
      tagline={siteSettings?.tagline?.[locale] || null}
      supertitle={siteSettings?.supertitle?.[locale] || null}
      stats={stats}
      heroImage={heroImage}
      conceptTeaserImage={conceptTeaserImage}
      videoUrl={siteSettings?.videoUrl || null}
      conceptTeaserText={siteSettings?.conceptTeaserText?.[locale] || null}
    />
  )
}

function HomePage_Inner({
  shows,
  locale,
  tagline,
  supertitle,
  stats,
  heroImage,
  conceptTeaserImage,
  videoUrl,
  conceptTeaserText,
}: {
  shows: ShowDate[]
  locale: Locale
  tagline: string | null
  supertitle: string | null
  stats: { value: string; label: { fr: string; en: string } }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conceptTeaserImage: any
  videoUrl: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conceptTeaserText: any[] | null
}) {
  const t = useTranslations('home')
  const th = useTranslations('hero')

  // Extract Vimeo video ID from URL like https://vimeo.com/811180335
  const vimeoId = videoUrl ? videoUrl.split('/').filter(Boolean).pop() : null

  // Render concept teaser text from Sanity blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conceptParas: string[] = conceptTeaserText?.length
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? conceptTeaserText.map((block: any) => block.children?.map((c: any) => c.text).join('') ?? '')
    : []

  const fallbackParas = locale === 'fr'
    ? [
        '"UMUI - Gardiens des Traditions" est la combinaison d\'un film et d\'un spectacle de danse qui invite le public à une immersion dans l\'essence même d\'Okinawa, cet "autre Japon" dont la richesse culturelle demeure encore largement méconnue.',
        'Au fil des rencontres dans le village de Ginoza, guidé par le Shishi (chien-lion), le spectacle met en lumière des traditions qui relient les générations et façonnent l\'identité d\'Okinawa.',
      ]
    : [
        '"UMUI — Guardians of Traditions" combines a documentary film and a dance performance that invites the audience into the very essence of Okinawa, this "other Japan" whose cultural richness remains largely unknown.',
        'Through encounters in the village of Ginoza, guided by the Shishi (lion-dog), the show illuminates traditions that connect generations and shape the identity of Okinawa.',
      ]

  const teaserParas = conceptParas.length ? conceptParas : fallbackParas

  return (
    <>
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative bg-[#F5F3F0]">
        {heroImage && (
          <Image
            src={urlFor(heroImage).width(1600).height(900).url()}
            alt="UMUI — Gardiens des Traditions"
            fill
            className="object-cover"
            priority
          />
        )}
        {heroImage && <div className="absolute inset-0 bg-black/40" />}
        <div className="relative z-10">
          <p className={`text-xs tracking-[0.3em] mb-6 ${heroImage ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
            {supertitle || th('supertitle')}
          </p>
          <h1 className={`font-serif text-5xl md:text-7xl font-medium max-w-3xl leading-tight mb-6 ${heroImage ? 'text-white' : 'text-[#1A1A1A]'}`}>
            {th('title')}
          </h1>
          <p className={`text-base mb-10 ${heroImage ? 'text-white/80' : 'text-[#6B6B6B]'}`}>{tagline || th('subtitle')}</p>
          <Link href={`/${locale}/concept`}
            className="bg-[#C8702A] text-white text-xs font-medium tracking-[0.2em] px-8 py-4 hover:bg-[#b5621f] transition-colors">
            {th('cta')}
          </Link>
        </div>
      </section>

      {/* Video section */}
      {vimeoId && (
        <section className="bg-[#1A1A1A] py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Concept teaser */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-4">{t('conceptLabel')}</p>
            {teaserParas.map((para, i) => (
              <p key={i} className={`text-[#6B6B6B] leading-relaxed ${i < teaserParas.length - 1 ? 'mb-4' : 'mb-8'}`}>
                {para}
              </p>
            ))}
            <div className="flex gap-12 mb-8">
              {stats.map(stat => (
                <div key={stat.value}>
                  <p className="font-serif text-3xl text-[#1A1A1A]">{stat.value}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">{stat.label[locale]}</p>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/concept`}
              className="text-sm text-[#C8702A] font-medium hover:underline">
              {t('conceptLinkLabel')}
            </Link>
          </div>
          <div className="aspect-[4/5] bg-[#F5F3F0] relative overflow-hidden">
            {conceptTeaserImage ? (
              <Image
                src={urlFor(conceptTeaserImage).width(800).height(1000).url()}
                alt="UMUI — Gardiens des Traditions"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-[#6B6B6B]">Photo de performance</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Programme strip */}
      <section className="bg-[#F5F3F0] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-4 text-center">{t('programmeLabel')}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12 text-center">{t('programmeTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {shows.map(show => (
              <ShowDateCard key={show._id} show={show} locale={locale} />
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${locale}/billets`}
              className="inline-block border border-[#1A1A1A] text-[#1A1A1A] text-xs font-medium tracking-widest px-8 py-4 hover:bg-[#1A1A1A] hover:text-white transition-colors">
              {t('programmeLinkLabel')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
