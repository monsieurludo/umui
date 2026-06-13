import Link from 'next/link'
import Image from 'next/image'
import { Artist, Locale } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

export default function ArtistCard({ artist, locale }: { artist: Artist; locale: Locale }) {
  return (
    <Link href={`/${locale}/artistes/${artist.slug.current}`} className="group block">
      <div className="aspect-[3/4] bg-[#F5F3F0] mb-4 overflow-hidden relative">
        {artist.photo?.asset ? (
          <Image
            src={urlFor(artist.photo).width(600).height(800).url()}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-serif text-[#6B6B6B] opacity-30">
              {artist.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#C8702A] transition-colors">
            {artist.name}
          </h3>
          <p className="text-xs font-medium text-[#C8702A] tracking-widest mt-1">{artist.roleTag}</p>
        </div>
        <span className="text-[#C8702A] text-xl mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
      </div>
    </Link>
  )
}
