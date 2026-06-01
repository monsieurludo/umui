import { useTranslations } from 'next-intl'
import { Locale } from '@/lib/types'

const partners = [
  { name: 'Centre culturel Garaman Hall', url: 'https://www.garaman.jp' },
  { name: 'ADIGARA', url: 'https://www.adigara.ch' },
  { name: 'Japan Information and Cultural Center, Berne', url: 'https://www.ch.emb-japan.go.jp/itpr_de/kultur.html' },
  { name: 'Centre culturel du district de Porrentruy', url: 'https://cultureporrentruy.ch/' },
  { name: 'Melinda Dance Company', url: 'https://melindadancecompany.com' },
  { name: 'Association Jura-Okinawa', url: null },
]

export default function ContactPage({ params: {} }: { params: { locale: Locale } }) {
  const t = useTranslations('contact')

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-16">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div>
          <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('suisse')}</p>
          <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4">ADIGARA Switzerland</h2>
          <div className="text-sm text-[#6B6B6B] space-y-2">
            <p>Ayako Yonaha</p>
            <p>Tél +41 78 215 91 71</p>
            <a href="mailto:info@adigara.ch" className="block hover:text-[#C8702A] transition-colors">info@adigara.ch</a>
            <a href="https://www.adigara.ch" target="_blank" rel="noopener noreferrer" className="block hover:text-[#C8702A] transition-colors">www.adigara.ch</a>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('japon')}</p>
          <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4">Garaman Hall</h2>
          <div className="text-sm text-[#6B6B6B] space-y-2">
            <p>314-1 Ginoza, 904-1302 Ginoza village</p>
            <p>Okinawa, Japan</p>
            <p>Tomoya Ogoshi</p>
            <p>Tél +81 98 983 26 13</p>
            <a href="mailto:otoyaogoshi@gmail.com" className="block hover:text-[#C8702A] transition-colors">otoyaogoshi@gmail.com</a>
            <a href="https://www.garaman.jp" target="_blank" rel="noopener noreferrer" className="block hover:text-[#C8702A] transition-colors">www.garaman.jp</a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E4DE] pt-16">
        <h2 className="font-serif text-2xl text-[#1A1A1A] mb-8">{t('partenaires')}</h2>
        <ul className="space-y-3">
          {partners.map(p => (
            <li key={p.name} className="text-sm text-[#6B6B6B]">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="hover:text-[#C8702A] transition-colors">
                  {p.name} ↗
                </a>
              ) : p.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
