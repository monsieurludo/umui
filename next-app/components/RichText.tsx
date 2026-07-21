'use client'
import React from 'react'
import { PortableText } from '@portabletext/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RichText({ blocks, className }: { blocks: any[]; className?: string }) {
  if (!blocks?.length) return null

  return (
    <div className={className}>
      <PortableText
        value={blocks}
        components={{
          block: {
            normal: ({ children }: { children?: React.ReactNode }) => (
              <p className="text-[#6B6B6B] leading-relaxed mb-4 last:mb-0">{children}</p>
            ),
          },
          marks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
              <a
                href={value?.href}
                target={value?.href?.startsWith('http') ? '_blank' : undefined}
                rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[#C8702A] underline hover:text-[#b5621f] transition-colors"
              >
                {children}
              </a>
            ),
            strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-medium text-[#1A1A1A]">{children}</strong>,
            em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
          },
        }}
      />
    </div>
  )
}
