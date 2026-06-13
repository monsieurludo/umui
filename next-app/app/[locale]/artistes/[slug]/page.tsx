import { Locale, Artist } from '@/lib/types'
import { sanityClient, urlFor } from '@/lib/sanity'
import { artistBySlugQuery } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Placeholder artist data by slug
const PLACEHOLDER_ARTISTS: Record<string, Artist> = {
  'kozue-miyagi': { _id: '1', name: 'Kozue Miyagi', slug: { current: 'kozue-miyagi' }, role: { fr: 'Danse', en: 'Dance' }, roleTag: 'DANSEUSE · RYŪKYŪ BUYŌ', group: 'okinawa-artists', bio: { fr: [{ _type: 'block', children: [{ text: 'Dès l\'âge de 7 ans, elle s\'initie à la danse traditionnelle d\'Okinawa dans le dojo de sa mère, Toyoko Miyagi, figure importante de la danse de Ryūkyū. Depuis, elle a gravi tous les échelons jusqu\'à recevoir de nombreuses distinctions dont le prestigieux prix du Ryūkyū Shimpo. Elle fait partie des héritiers officiels de la danse Ryūkyū Buyō déclaré patrimoine culturel par le gouvernement japonais. Kozue est une habituée de la scène du Théâtre National d\'Okinawa et se produit régulièrement au Japon et à l\'étranger.' }] }], en: [{ _type: 'block', children: [{ text: 'From the age of 7, she began training in traditional Okinawan dance in the dojo of her mother, Toyoko Miyagi, an important figure in Ryūkyū dance. She has risen through the ranks to receive numerous distinctions including the prestigious Ryūkyū Shimpo prize. She is one of the official inheritors of Ryūkyū Buyō dance, declared a cultural heritage by the Japanese government.' }] }] }, order: 1 },
}

async function getArtist(slug: string): Promise<Artist | null> {
  try {
    const artist = await sanityClient.fetch(artistBySlugQuery, { slug })
    if (artist) return artist
  } catch {}
  return PLACEHOLDER_ARTISTS[slug] || null
}

export default async function ArtistPage({ params: { locale, slug } }: { params: { locale: Locale; slug: string } }) {
  const artist = await getArtist(slug)
  if (!artist) notFound()

  const backLabel = locale === 'fr' ? '← Les Artistes' : '← Artists'

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <Link href={`/${locale}/artistes`} className="text-sm text-[#6B6B6B] hover:text-[#C8702A] transition-colors mb-12 inline-block">
        {backLabel}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-8">
        <div className="aspect-[3/4] bg-[#F5F3F0] relative overflow-hidden">
          {artist.photo?.asset ? (
            <Image
              src={urlFor(artist.photo).width(800).height(1067).url()}
              alt={artist.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-serif text-[#6B6B6B] opacity-20">{artist.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="pt-4">
          <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-3">{artist.roleTag}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-2">{artist.name}</h1>
          <p className="text-[#6B6B6B] mb-10">{artist.role[locale]}</p>
          <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
            {artist.bio[locale]?.map((block: { children?: { text: string }[] }, i: number) => (
              <p key={i}>{block.children?.map((c) => c.text).join('')}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = ['kozue-miyagi', 'ruki-nakahara', 'iroha-nakachi', 'fuka-nakazato', 'takuya-shimabukuro', 'fumiya-iha', 'mina-mermoud', 'yomo-tagami', 'daniel-lopez', 'tomoya-ogoshi', 'denys-fontanarosa', 'igor-shin-moromisato', 'yuta-nakama']
  const locales = ['fr', 'en']
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })))
}
