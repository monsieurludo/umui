export const revalidate = 0

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type { Locale, ConceptPage } from '@/lib/types'
import { sanityClient, urlFor } from '@/lib/sanity'
import { conceptPageQuery } from '@/lib/queries'

const filmTextFr = [
  `Vingt ans se sont écoulés depuis que je me suis installé à Okinawa. Pendant cette période, j'ai été témoin de la richesse culturelle unique de cette île issue d'anciennes traditions profondément enracinées dans la vie quotidienne des habitants de l'archipel.`,
  `La volonté de faire un film sur ces "gardiens des traditions" est née pendant la pandémie de COVID-19. Avec Tomoya Ogoshi, le producteur du film, nous sommes allés à la rencontre de personnes dans le village de Ginoza qui s'efforcent de maintenir la culture vivante en créant des liens entre les générations.`,
  `J'ai été touché par la volonté des anciens de transmettre l'héritage culturel de l'île à la jeune génération. Chacun a sa propre façon d'entretenir sa culture. Certains s'en tiennent strictement aux traditions, tandis que d'autres essaient de créer de nouvelles bases en brisant les moules et en mélangeant l'ancien et le nouveau.`,
  `C'est pourquoi j'ai décidé d'intituler le film "UMUI", un mot de la langue d'Okinawa qui selon le contexte peut signifier : sentiment, émotion, pensée, esprit, amour...`,
]

const filmTextEn = [
  `Twenty years have passed since I settled in Okinawa. During that time, I witnessed the unique cultural richness of this island, born from ancient traditions deeply rooted in the daily lives of the archipelago's inhabitants.`,
  `The desire to make a film about these "guardians of traditions" was born during the COVID-19 pandemic. With Tomoya Ogoshi, the film's producer, we went to meet people in the village of Ginoza who strive to keep culture alive by building bridges between generations.`,
  `I was moved by the elders' desire to pass on the island's cultural heritage to the younger generation. Each person has their own way of nurturing their culture — some strictly follow traditions, while others try to create new foundations by mixing old and new.`,
  `That is why I chose to title the film "UMUI", a word from the Okinawan language that can mean, depending on context: feeling, emotion, thought, spirit, love...`,
]

async function getConceptPage(): Promise<ConceptPage | null> {
  try {
    return await sanityClient.fetch(conceptPageQuery)
  } catch {
    return null
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function renderBlocks(blocks: any[] | undefined): string[] {
  if (!blocks?.length) return []
  return blocks.map((block: any) => block.children?.map((c: any) => c.text).join('') ?? '')
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function ConceptPage({ params: { locale } }: { params: { locale: Locale } }) {
  const conceptPage = await getConceptPage()

  const filmBlocksSanity = renderBlocks(conceptPage?.filmDescription?.[locale])

  const filmText = filmBlocksSanity.length ? filmBlocksSanity : (locale === 'fr' ? filmTextFr : filmTextEn)

  const images = conceptPage?.images ?? []

  return (
    <ConceptPage_Inner
      filmText={filmText}
      images={images}
    />
  )
}

function ConceptPage_Inner({
  filmText,
  images,
}: {
  filmText: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[]
}) {
  const t = useTranslations('concept')

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">Concept</h1>
      <p className="text-[#6B6B6B] text-lg mb-20">UMUI — Gardiens des Traditions · Tournée Suisse 2026</p>

      {/* Film section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 space-y-4 text-[#6B6B6B] leading-relaxed">
            <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('filmLabel')}</p>
            {filmText.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="md:col-span-2 space-y-4">
            {images.filter((img) => img?.asset).length > 0 ? images.filter((img) => img?.asset).map((img, i) => (
              <div key={i} className="aspect-[3/4] bg-[#F5F3F0] relative overflow-hidden">
                <Image
                  src={urlFor(img).width(600).height(800).url()}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )) : (
              <div className="aspect-[3/4] bg-[#F5F3F0] flex items-center justify-center">
                <p className="text-sm text-[#6B6B6B]">Photo du film</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
