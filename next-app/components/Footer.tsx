import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SiteSettings } from '@/lib/types'

export default function Footer({ locale, siteSettings }: { locale: string; siteSettings: SiteSettings | null }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const links = [
    { href: `/${locale}/concept`, label: tn('concept') },
    { href: `/${locale}/programme`, label: tn('programme') },
    { href: `/${locale}/artistes`, label: tn('artistes') },
    { href: `/${locale}/billets`, label: tn('billets') },
  ]

  const swiss = siteSettings?.footerTextSwiss
  const japan = siteSettings?.footerTextJapan
  const instagramUrl = siteSettings?.instagramUrl

  return (
    <footer className="bg-white border-t border-[#E8E4DE] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-4">
              {swiss?.label || 'SUISSE'}
            </p>
            <h3 className="font-serif text-xl mb-3">{swiss?.name || 'ADIGARA Switzerland'}</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              {swiss?.contactPerson && <>{swiss.contactPerson}<br /></>}
              {swiss?.phone ? <>{swiss.phone}<br /></> : <>Tél +41 78 215 91 71<br /></>}
              {swiss?.email
                ? <a href={`mailto:${swiss.email}`} className="hover:text-[#C8702A] transition-colors">{swiss.email}</a>
                : <a href="mailto:info@adigara.ch" className="hover:text-[#C8702A] transition-colors">info@adigara.ch</a>
              }
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-4">
              {japan?.label || 'JAPON'}
            </p>
            <h3 className="font-serif text-xl mb-3">{japan?.name || 'Garaman Hall'}</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              {japan?.address ? <>{japan.address}<br /></> : <>314-1 Ginoza, 904-1302 Ginoza village<br />Okinawa, Japan<br /></>}
              {japan?.contactPerson && <>{japan.contactPerson}<br /></>}
              {japan?.phone ? <>{japan.phone}<br /></> : null}
              {japan?.email
                ? <a href={`mailto:${japan.email}`} className="hover:text-[#C8702A] transition-colors">{japan.email}</a>
                : <a href="mailto:otoyaogoshi@gmail.com" className="hover:text-[#C8702A] transition-colors">otoyaogoshi@gmail.com</a>
              }
            </p>
          </div>
        </div>

        <div className="border-t border-[#E8E4DE] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="font-serif text-base font-medium">UMUI</p>
            <p className="text-xs text-[#6B6B6B]">{t('tagline')}</p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                {l.label}
              </Link>
            ))}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                Instagram ↗
              </a>
            )}
            <span className="text-xs text-[#6B6B6B]">{t('mentions')}</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-[#6B6B6B]">
          {siteSettings?.copyright?.[locale] || t('copyright')}
        </p>
      </div>
    </footer>
  )
}
