export const revalidate = 0

import { useTranslations } from 'next-intl'
import type { Locale, SpectaclePage } from '@/lib/types'
import { sanityClient, urlFor } from '@/lib/sanity'
import { spectaclePageQuery } from '@/lib/queries'
import ImageLightbox from '@/components/ImageLightbox'
import RichText from '@/components/RichText'

async function getSpectaclePage(): Promise<SpectaclePage | null> {
  try {
    return await sanityClient.fetch(spectaclePageQuery)
  } catch {
    return null
  }
}

export default async function SpectaclePage({ params: { locale } }: { params: { locale: Locale } }) {
  const page = await getSpectaclePage()

  const title = page?.title?.[locale] || null
  const subtitle = page?.subtitle?.[locale] || null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bodyBlocks: any[] | null = page?.body?.[locale]?.length ? page.body[locale] : null
  const images = (page?.images ?? []).filter((img: { asset?: unknown }) => img?.asset)

  return (
    <SpectacleInner
      title={title}
      subtitle={subtitle}
      bodyBlocks={bodyBlocks}
      images={images}
    />
  )
}

function SpectacleInner({
  title,
  subtitle,
  bodyBlocks,
  images,
}: {
  title: string | null
  subtitle: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyBlocks: any[] | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[]
}) {
  const t = useTranslations('spectacle')

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">{title || t('title')}</h1>
      <p className="text-[#6B6B6B] text-lg mb-16">{subtitle || t('subtitle')}</p>

      {bodyBlocks && (
        <div className="max-w-2xl mb-16">
          <RichText blocks={bodyBlocks} />
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, i) => (
            <ImageLightbox
              key={i}
              src={urlFor(img).width(1200).height(1500).url()}
              alt=""
            />
          ))}
        </div>
      )}
    </div>
  )
}
