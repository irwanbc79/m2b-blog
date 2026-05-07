'use client'
import { useEffect, useRef } from 'react'

interface Props {
  slug: string
}

export default function Comments({ slug }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('iframe')) return
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'irwanbc79/m2b-blog')
    script.setAttribute('data-repo-id', 'R_kgDOSWiLeQ')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', '')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'id')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
  }, [slug])

  return (
    <section className="mt-12 pt-8 border-t border-cream-dark">
      <h2 className="text-[20px] font-extrabold text-navy mb-6 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        Komentar & Diskusi
      </h2>

      {/* Giscus will inject here once GitHub Discussions is enabled */}
      <div ref={ref} />

      {/* Fallback CTA — visible before Giscus loads or if not configured */}
      <noscript>
        <div className="p-5 rounded-[12px] bg-cream border border-cream-dark text-[13px] text-text-mid">
          Aktifkan JavaScript untuk melihat komentar.
        </div>
      </noscript>

      {/* Direct WhatsApp discussion as permanent complement */}
      <div className="mt-6 p-5 rounded-[14px] bg-navy flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-[14px] font-bold text-cream mb-1">Punya pertanyaan langsung?</p>
          <p className="text-[12.5px] text-cream/60">Diskusi lebih cepat via WhatsApp dengan tim M2B.</p>
        </div>
        <a
          href="https://wa.me/6281263027818"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-[13px] no-underline transition-opacity hover:opacity-90"
          style={{ background: '#25D366', color: '#fff' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat WhatsApp
        </a>
      </div>
    </section>
  )
}
