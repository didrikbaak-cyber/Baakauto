import type { Metadata } from 'next'
import CarForm from '@/components/CarForm'

export const metadata: Metadata = {
  title: 'Selg din bil',
  description:
    'La Baak Auto AS i Sandefjord selge bilen din. Enkelt, trygt og effektivt. Fyll ut skjemaet så tar vi kontakt.',
}

export default function SelgPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#1e5fa8] text-white py-16 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Selg</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">La oss selge bilen din</h1>
        <p className="text-white/80 text-lg max-w-lg mx-auto">
          Vi selger bilen din for deg — enkelt og trygt. Fyll ut skjemaet, så tar vi kontakt.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '📋', title: 'Fyll ut skjema', desc: 'Send oss info og bilder av bilen' },
            { icon: '📞', title: 'Vi tar kontakt', desc: 'Vi ringer deg og avtaler det videre' },
            { icon: '🤝', title: 'Enkel handel', desc: 'Vi tar seg av alt det praktiske' },
          ].map((s) => (
            <div key={s.title} className="bg-white border border-[#ccdcee] rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="font-bold text-[#1a3a5c] text-sm mb-1">{s.title}</p>
              <p className="text-xs text-[#5a7a9a]">{s.desc}</p>
            </div>
          ))}
        </div>

        <CarForm type="selg" />
      </div>
    </>
  )
}
