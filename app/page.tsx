import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ReviewCarousel from '@/components/ReviewCarousel'

export const metadata: Metadata = {
  title: 'Baak Auto AS — Bruktbilforhandler i Sandefjord',
  description:
    'Din neste bil venter hos Baak Auto. Bruktbilforhandler i Sandefjord med ærlig, rask og personlig service. 4.9 ★ på Google basert på 43 anmeldelser.',
}

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1e5fa8]">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
    label: 'Ærlig og transparent',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1e5fa8]">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
      </svg>
    ),
    label: 'Rask handel',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1e5fa8]">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    label: 'Personlig service',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1e5fa8]">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
      </svg>
    ),
    label: 'Bruktbilgaranti',
  },
]

const whyCards = [
  {
    icon: '🔍',
    title: 'Ærlig og transparent',
    desc: 'Vi gir deg all info om bilen, uten skjulte overraskelser.',
  },
  {
    icon: '⚡',
    title: 'Rask handel',
    desc: 'Enkel og effektiv prosess fra start til slutt. Mange kunder er i bilen samme dag.',
  },
  {
    icon: '☕',
    title: 'Personlig service',
    desc: 'Vi henter deg på Torp flyplass eller Sandefjord stasjon',
  },
  {
    icon: '🛡️',
    title: 'Bruktbilgaranti',
    desc: 'Vi kan levere med garanti.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Baak Auto — Bruktbilforhandler i Sandefjord"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c]/80 via-[#1a3a5c]/70 to-[#1e5fa8]/60" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/18 border border-white/35 rounded-full px-5 py-2 text-sm font-semibold mb-7">
            <span className="text-yellow-300">★★★★★</span>
            4.9 · 43 Google-anmeldelser
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 text-balance">
            Din neste bil venter hos Baak Auto
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-9 max-w-xl mx-auto">
            Bruktbilforhandler i Sandefjord — ærlig, rask og personlig service
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.finn.no/mobility/search/car?q=baak+auto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1a3a5c] font-bold px-8 py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all text-base"
            >
              Se våre biler
            </a>
            <Link
              href="/selg"
              className="bg-transparent border-2 border-white/50 hover:border-white hover:bg-white/12 text-white font-bold px-8 py-3.5 rounded-lg transition-all text-base"
            >
              Selg din bil
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white border-b border-[#ccdcee] py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-10">
          {trustItems.map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-sm font-semibold text-[#1a3a5c]">
              {t.icon}
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <ReviewCarousel />

      {/* HVORFOR BAAK AUTO */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <p className="text-xs font-bold uppercase tracking-widest text-[#2471c8] mb-2">Hvorfor oss</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3a5c] mb-3">
          Trygt bilkjøp fra start til slutt
        </h2>
        <p className="text-[#5a7a9a] mb-10 max-w-lg">
          Vi setter kunden først — alltid. Det er derfor nesten alle våre kunder anbefaler oss videre.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyCards.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-[#ccdcee] rounded-xl p-6 hover:shadow-[0_6px_24px_rgba(30,95,168,0.1)] hover:-translate-y-0.5 transition-all"
            >
              <div className="w-11 h-11 bg-[#e8f1fb] rounded-xl flex items-center justify-center text-2xl mb-4">
                {c.icon}
              </div>
              <h3 className="font-bold text-[#1a3a5c] mb-2">{c.title}</h3>
              <p className="text-sm text-[#5a7a9a] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LAGER-BILDE CTA */}
      <section className="bg-[#e4edf6] py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#2471c8] mb-2">Vårt utvalg</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3a5c] mb-4">
              Gunstige bruktbiler — alltid et godt utvalg
            </h2>
            <p className="text-[#5a7a9a] mb-7 leading-relaxed">
              Vi selger bruktbiler med fokus på konkurransedyktige priser. 
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.finn.no/mobility/search/car?q=baak+auto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e5fa8] hover:bg-[#2471c8] text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Se alle biler
              </a>
              <Link
                href="/innbytte"
                className="border-2 border-[#ccdcee] hover:border-[#1e5fa8] text-[#1a3a5c] font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Bytt inn din bil
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/lagerbilde.webp"
              alt="Billager hos Baak Auto"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  )
}
