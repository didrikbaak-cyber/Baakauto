import type { Metadata } from 'next'
import CarForm from '@/components/CarForm'

export const metadata: Metadata = {
  title: 'Innbytte',
  description:
    'Bytt inn bilen din hos Baak Auto AS i Sandefjord. Fyll ut skjemaet og få et godt tilbud raskt. Ærlig og enkel innbytteprosess.',
}

export default function InnbyttePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#1e5fa8] text-white py-16 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Innbytte</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Bytt inn bilen din</h1>
        <p className="text-white/80 text-lg max-w-lg mx-auto">
          Har du en bil du vil bytte inn? Fyll ut skjemaet under, så gir vi deg et tilbud.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 bg-[#e8f1fb] border border-[#ccdcee] rounded-xl p-5 mb-8">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-[#1a3a5c] text-sm mb-1">Slik fungerer innbytte</p>
            <p className="text-xs text-[#5a7a9a] leading-relaxed">
              Fyll ut skjemaet med info om bilen din. Vi kontakter deg raskt med et tilbud.
              Enkel, ærlig og rask prosess — uten skjulte overraskelser.
            </p>
          </div>
        </div>

        <CarForm type="innbytte" />
      </div>
    </>
  )
}
