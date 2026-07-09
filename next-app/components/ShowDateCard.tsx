import { ShowDate, Locale } from '@/lib/types'
import { useTranslations } from 'next-intl'

// Parse date string without timezone conversion (Sanity stores as local time)
function parseDateParts(dateStr: string) {
  const [datePart, timePart] = dateStr.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute] = (timePart || '00:00').split(':').map(Number)
  return { year, month, day, hour, minute }
}

function formatDay(dateStr: string) {
  return parseDateParts(dateStr).day.toString().padStart(2, '0')
}
function formatMonth(dateStr: string, locale: string) {
  const { year, month, day } = parseDateParts(dateStr)
  // Use UTC date to avoid timezone shift
  const d = new Date(Date.UTC(year, month - 1, day))
  return d.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export default function ShowDateCard({ show, locale }: { show: ShowDate; locale: Locale }) {
  const t = useTranslations('programme')
  const isEmpty = !show.ticketUrl

  return (
    <div className="border border-[#E8E4DE] bg-white p-5 rounded-sm hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-3xl font-serif font-medium text-[#1A1A1A]">{formatDay(show.date)}</span>
          <p className="text-xs text-[#6B6B6B] mt-0.5">{formatMonth(show.date, locale)}</p>
        </div>
        {show.status === 'sold-out' && (
          <span className="text-xs font-medium text-red-600 border border-red-200 px-2 py-0.5 rounded-sm">Complet</span>
        )}
      </div>
      {show.eventLabel && (
        <p className="text-xs text-[#C8702A] font-medium tracking-wide mb-1">{show.eventLabel}</p>
      )}
      <p className="font-medium text-[#1A1A1A] text-base">{show.city}</p>
      <p className="text-sm text-[#6B6B6B] mb-4">{show.venue}</p>
      {show.notes && (
        <p className="text-xs text-[#6B6B6B] mb-3 italic">{show.notes[locale]}</p>
      )}
      {isEmpty || show.status === 'sold-out' ? (
        <span className="text-xs text-[#6B6B6B]">{show.status === 'sold-out' ? 'Complet' : t('aVenir')}</span>
      ) : (
        <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer"
          className="text-sm text-[#C8702A] font-medium hover:underline">
          {t('reserver')}
        </a>
      )}
    </div>
  )
}
