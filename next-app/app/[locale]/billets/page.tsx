export const revalidate = 0

import { Locale, ShowDate } from '@/lib/types'
import { sanityClient } from '@/lib/sanity'
import { showDatesQuery } from '@/lib/queries'
import { useTranslations } from 'next-intl'

const PLACEHOLDER_SHOWS: ShowDate[] = [
  { _id: '1', date: '2026-09-11T20:00:00', city: 'Onex', venue: 'Ciné-théâtre', address: 'Rue des Bossons 7, 1213 Onex', status: 'confirmed' },
  { _id: '2', date: '2026-09-12T19:00:00', city: 'Berne', venue: 'Musée d\'Histoire de Berne', address: 'Engestrasse 43, 3012 Bern', status: 'confirmed', eventLabel: 'Nihon Matsuri' },
  { _id: '3', date: '2026-09-13T18:00:00', city: 'Neuchâtel', venue: 'Temple du Bas', address: 'Rue du Temple-Neuf 5, 2000 Neuchâtel', status: 'confirmed', eventLabel: 'Mo Ashibi — Journée Okinawa' },
  { _id: '4', date: '2026-09-17T20:00:00', city: 'Porrentruy', venue: 'Salle de l\'INTER', address: 'Allée des Soupirs 15, 2900 Porrentruy', status: 'confirmed' },
  { _id: '5', date: '2026-09-19T19:00:00', city: 'Évolène', venue: 'Chapelle des Haudères', address: '1984 Les Haudères', status: 'confirmed', eventLabel: 'Festival Japon en Hérens' },
  { _id: '6', date: '2026-09-22T20:00:00', city: 'Le Sentier', venue: 'Cinéma la Bobine', address: 'Chemin des Cytises 1, 1347 Le Sentier', status: 'confirmed' },
  { _id: '7', date: '2026-09-24T20:00:00', city: 'Zurich', venue: 'À confirmer', address: 'Zurich', status: 'pending' },
]

async function getShows(): Promise<ShowDate[]> {
  try {
    const shows = await sanityClient.fetch(showDatesQuery)
    return shows?.length ? shows : PLACEHOLDER_SHOWS
  } catch {
    return PLACEHOLDER_SHOWS
  }
}

const TZ = 'Europe/Zurich'

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ
  })
}
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: TZ })
}

export default async function BilletsPage({ params: { locale } }: { params: { locale: Locale } }) {
  const shows = await getShows()
  return <BilletsInner shows={shows} locale={locale} />
}

function BilletsInner({ shows, locale }: { shows: ShowDate[]; locale: Locale }) {
  const t = useTranslations('billets')

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">{t('title')}</h1>
      <p className="text-[#6B6B6B] text-lg mb-16">{t('subtitle')}</p>

      <div className="space-y-0">
        {shows.map((show) => (
          <div key={show._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#E8E4DE] gap-4">
            <div>
              <p className="text-xs text-[#C8702A] font-medium tracking-wide mb-1">{formatDate(show.date, locale)}</p>
              {(show.eventTitle || show.eventLabel) && (
                <p className="text-xs text-[#6B6B6B] mb-1 italic">{show.eventTitle || show.eventLabel}</p>
              )}
              <h3 className="font-serif text-xl text-[#1A1A1A]">{show.city}</h3>
              <p className="text-sm text-[#6B6B6B]">{show.venue} · {formatTime(show.date)}</p>
              <p className="text-xs text-[#6B6B6B] mt-1">{show.address}</p>
            </div>
            <div className="shrink-0">
              {show.status === 'sold-out' ? (
                <span className="text-xs font-medium text-red-600 border border-red-200 px-4 py-2">{t('soldOut')}</span>
              ) : show.ticketUrl ? (
                <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-[#C8702A] text-white text-xs font-medium tracking-widest px-6 py-3 hover:bg-[#b5621f] transition-colors">
                  {t('reserver')}
                </a>
              ) : (
                <span className="text-xs text-[#6B6B6B] border border-[#E8E4DE] px-4 py-2">{t('aVenir')}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
