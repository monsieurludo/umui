import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const links = [
    { href: `/${locale}/concept`, label: tn('concept') },
    { href: `/${locale}/programme`, label: tn('programme') },
    { href: `/${locale}/artistes`, label: tn('artistes') },
    { href: `/${locale}/billets`, label: tn('billets') },
  ]

  return (
    <footer className="bg-white border-t border-[#E8E4DE] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-4">SUISSE</p>
            <h3 className="font-serif text-xl mb-3">ADIGARA Switzerland</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Ayako Yonaha<br />
              Tél +41 78 215 91 71<br />
              <a href="mailto:info@adigara.ch" className="hover:text-[#C8702A] transition-colors">info@adigara.ch</a>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-4">JAPON</p>
            <h3 className="font-serif text-xl mb-3">Garaman Hall</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              314-1 Ginoza, 904-1302 Ginoza village<br />
              Okinawa, Japan<br />
              Tomoya Ogoshi<br />
              <a href="mailto:otoyaogoshi@gmail.com" className="hover:text-[#C8702A] transition-colors">otoyaogoshi@gmail.com</a>
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
            <span className="text-xs text-[#6B6B6B]">{t('mentions')}</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-[#6B6B6B]">{t('copyright')}</p>
      </div>
    </footer>
  )
}
