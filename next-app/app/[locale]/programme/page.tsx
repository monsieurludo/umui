export const revalidate = 0

import { Locale, ShowDate, ParallelActivity } from '@/lib/types'
import { sanityClient } from '@/lib/sanity'
import { showDatesQuery, parallelActivitiesQuery } from '@/lib/queries'
import ShowDateCard from '@/components/ShowDateCard'
import { useTranslations } from 'next-intl'

const PLACEHOLDER_SHOWS: ShowDate[] = [
  { _id: '1', date: '2026-09-11T20:00:00', city: 'Onex', venue: 'Ciné-théâtre', address: 'Rue des Bossons 7, 1213 Onex', status: 'confirmed' },
  { _id: '2', date: '2026-09-12T19:00:00', city: 'Berne', venue: 'Musée d\'Histoire de Berne', address: 'Engestrasse 43, 3012 Bern', status: 'confirmed', eventLabel: 'Nihon Matsuri' },
  { _id: '3', date: '2026-09-13T18:00:00', city: 'Neuchâtel', venue: 'Temple du Bas', address: 'Rue du Temple-Neuf 5, 2000 Neuchâtel', status: 'confirmed', eventLabel: 'Mo Ashibi — Journée Okinawa' },
  { _id: '4', date: '2026-09-17T20:00:00', city: 'Porrentruy', venue: 'Salle de l\'INTER', address: 'Allée des Soupirs 15, 2900 Porrentruy', status: 'confirmed', notes: { fr: 'Dans le cadre de la saison EVIDANSE 2026-2027', en: 'Part of the EVIDANSE 2026-2027 season' } },
  { _id: '5', date: '2026-09-19T19:00:00', city: 'Évolène', venue: 'Chapelle des Haudères', address: '1984 Les Haudères', status: 'confirmed', eventLabel: 'Festival Japon en Hérens' },
  { _id: '6', date: '2026-09-22T20:00:00', city: 'Le Sentier', venue: 'Cinéma la Bobine', address: 'Chemin des Cytises 1, 1347 Le Sentier', status: 'confirmed' },
  { _id: '7', date: '2026-09-24T20:00:00', city: 'Zurich', venue: 'À confirmer', address: 'Zurich', status: 'pending' },
]

async function getPageData(): Promise<{ shows: ShowDate[]; activities: ParallelActivity[] }> {
  try {
    const [shows, activities] = await Promise.all([
      sanityClient.fetch(showDatesQuery),
      sanityClient.fetch(parallelActivitiesQuery),
    ])
    return {
      shows: shows?.length ? shows : PLACEHOLDER_SHOWS,
      activities: activities || [],
    }
  } catch {
    return { shows: PLACEHOLDER_SHOWS, activities: [] }
  }
}

export default async function ProgrammePage({ params: { locale } }: { params: { locale: Locale } }) {
  const { shows, activities } = await getPageData()
  return <ProgrammeInner shows={shows} activities={activities} locale={locale} />
}

function ProgrammeInner({ shows, activities, locale }: { shows: ShowDate[]; activities: ParallelActivity[]; locale: Locale }) {
  const t = useTranslations('programme')

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-16">{t('title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
        {shows.map(show => (
          <ShowDateCard key={show._id} show={show} locale={locale} />
        ))}
      </div>

      {/* Parallel activities */}
      {activities.length > 0 && (
        <div className="border-t border-[#E8E4DE] pt-16">
          <h2 className="font-serif text-3xl text-[#1A1A1A] mb-10">{t('parallelTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map(activity => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const descBlocks: any[] = activity.description?.[locale] || []
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const descParas = descBlocks.map((block: any) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                block.children?.map((c: any) => c.text).join('') ?? ''
              ).filter(Boolean)

              return (
                <div key={activity._id}>
                  <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-3">
                    {activity.type.toUpperCase()}
                  </p>
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                    {activity.title?.[locale] || activity.title?.fr || ''}
                  </h3>
                  {descParas.map((para, i) => (
                    <p key={i} className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{para}</p>
                  ))}
                  {activity.locations && activity.locations.length > 0 && (
                    <ul className="text-sm text-[#6B6B6B] space-y-1">
                      {activity.locations.map((loc, i) => (
                        <li key={i}>· {loc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
