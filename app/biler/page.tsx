import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Våre biler',
  description:
    'Se utvalget av kvalitetssikrede bruktbiler hos Baak Auto AS i Sandefjord. Finn din neste bil på Finn.no eller ta kontakt med oss.',
}

export default function BilerPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#1e5fa8] text-white py-20 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Utvalg</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Våre biler</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-9">
          Se vårt utvalg av kvalitetssikrede bruktbiler på Finn.no. Utvalget oppdateres jevnlig.
        </p>
        <a
          href="https://www.finn.no/mobility/search/car?q=baak+auto"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-[#1a3a5c] font-bold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all text-base"
        >
          <span className="bg-[#1e5fa8] text-white text-xs font-bold px-2 py-0.5 rounded">FINN</span>
          Se alle biler på Finn.no ↗
        </a>
      </section>

      {/* LAGERBILDE */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-12">
          <Image
            src="/lagerbilde.webp"
            alt="Billager hos Baak Auto AS"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Baak Auto</p>
            <p className="text-xl font-extrabold">Alltid et godt utvalg</p>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#ccdcee] rounded-xl p-6">
            <div className="w-10 h-10 bg-[#e8f1fb] rounded-xl flex items-center justify-center text-xl mb-4">🔍</div>
            <h3 className="font-bold text-[#1a3a5c] mb-2">Kvalitetssikrede biler</h3>
            <p className="text-sm text-[#5a7a9a] leading-relaxed">
              Alle biler er gjennomgått og kontrollert før salg. Du kjøper trygt hos oss.
            </p>
          </div>
          <div className="bg-white border border-[#ccdcee] rounded-xl p-6">
            <div className="w-10 h-10 bg-[#e8f1fb] rounded-xl flex items-center justify-center text-xl mb-4">🛡️</div>
            <h3 className="font-bold text-[#1a3a5c] mb-2">Bruktbilgaranti</h3>
            <p className="text-sm text-[#5a7a9a] leading-relaxed">
              Alle biler leveres med garanti, slik at du er trygg også etter kjøpet.
            </p>
          </div>
          <div className="bg-white border border-[#ccdcee] rounded-xl p-6">
            <div className="w-10 h-10 bg-[#e8f1fb] rounded-xl flex items-center justify-center text-xl mb-4">🔄</div>
            <h3 className="font-bold text-[#1a3a5c] mb-2">Jevnlig oppdatert</h3>
            <p className="text-sm text-[#5a7a9a] leading-relaxed">
              Utvalget på Finn.no oppdateres fortløpende. Sjekk tilbake jevnlig for nye biler.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white border border-[#ccdcee] rounded-2xl p-8 text-center max-w-lg mx-auto">
          <div className="text-4xl mb-4">🚗</div>
          <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">Fant du ikke det du leter etter?</h3>
          <p className="text-sm text-[#5a7a9a] mb-6 leading-relaxed">
            Ta kontakt med oss — vi hjelper deg finne riktig bil, eller finner den for deg.
          </p>
          <Link
            href="/kontakt"
            className="bg-[#1e5fa8] hover:bg-[#2471c8] text-white font-bold px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </>
  )
}
