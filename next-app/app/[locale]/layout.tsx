export const revalidate = 0

import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { sanityClient } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/lib/types'
import '../globals.css'

export const metadata: Metadata = {
  title: 'UMUI — Gardiens des Traditions',
  description: 'Tournée Suisse · Septembre 2026 · Danse traditionnelle japonaise et okinawaïenne',
  icons: { icon: '/icon.svg' },
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  let siteSettings: SiteSettings | null = null
  try {
    siteSettings = await sanityClient.fetch(siteSettingsQuery)
  } catch {
    siteSettings = null
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main className="pt-14">{children}</main>
          <Footer locale={locale} siteSettings={siteSettings} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}
