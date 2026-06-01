import { ShowDate, Locale } from '@/lib/types'
import { useTranslations } from 'next-intl'

function formatDay(dateStr: string) {
  return new Date(dateStr).getDate().toString().padStart(2, '0')
}
function formatMonth(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { month: 'short', year: 'numeric' })
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
