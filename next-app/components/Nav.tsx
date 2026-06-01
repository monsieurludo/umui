'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const otherLocale = locale === 'fr' ? 'en' : 'fr'
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const links = [
    { href: `/${locale}/concept`, label: t('concept') },
    { href: `/${locale}/programme`, label: t('programme') },
    { href: `/${locale}/artistes`, label: t('artistes') },
    { href: `/${locale}/billets`, label: t('billets') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8E4DE]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-serif text-lg font-medium text-[#1A1A1A] tracking-wide">
          UMUI
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors tracking-wide">
              {link.label}
            </Link>
          ))}
          <div className="ml-4 pl-4 border-l border-[#E8E4DE] text-sm font-medium">
            <span className="text-[#1A1A1A]">{locale.toUpperCase()}</span>
            <span className="mx-1.5 text-[#E8E4DE]">/</span>
            <Link href={switchLocalePath} className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              {otherLocale.toUpperCase()}
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <div className="space-y-1.5">
              <span className="block w-6 h-px bg-[#1A1A1A]" />
              <span className="block w-6 h-px bg-[#1A1A1A]" />
              <span className="block w-4 h-px bg-[#1A1A1A]" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E4DE] px-6 py-6">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-base text-[#1A1A1A] border-b border-[#E8E4DE] last:border-0">
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-[#E8E4DE] text-sm font-medium">
            <span className="text-[#C8702A] font-medium">{locale.toUpperCase()}</span>
            <span className="mx-1.5 text-[#6B6B6B]">/</span>
            <Link href={switchLocalePath} onClick={() => setMenuOpen(false)}
              className="text-[#6B6B6B]">{otherLocale.toUpperCase()}</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
