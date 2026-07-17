'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="aspect-[4/5] bg-[#F5F3F0] relative overflow-hidden cursor-zoom-in"
        onClick={() => setOpen(true)}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image src={src} alt={alt} fill className="object-contain" />
          </div>
          <button
            className="absolute top-6 right-6 text-white text-3xl leading-none hover:text-[#C8702A] transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
          >×</button>
        </div>
      )}
    </>
  )
}
