import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import '../globals.css'

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main className="pt-14">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}
