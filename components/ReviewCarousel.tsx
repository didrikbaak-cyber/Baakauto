'use client'

const reviews = [
  {
    name: 'Daniel Eduardo Lopez',
    text: 'Rask og hyggelig handel! Opplever at informasjonen som blir oppgitt om bilen er ærlig. God service!',
  },
  {
    name: 'celine l',
    text: 'Utrolig bra service og hyggelige folk! Fikser opp i hver minste ting, og gjør det veldig enkelt å kjøpe bil 😊 Anbefales! 🙌🏻',
  },
  {
    name: 'Siim Orasmäe',
    text: 'Fornøgd god service. Alt gikk smertefritt, blei henta på Torp flyplass, kjørt til kontoret, kaffi og kjeks og handelen va i boks.',
  },
  {
    name: 'Andreas Eek',
    text: "Veldig fornøyd med Toyota'en som jeg kjøpte hos Baak Auto! God service med kaffe og kjeks, og hyggelige folk.",
  },
  {
    name: 'Ivar Dillan',
    text: 'Hyggelig og løsningsorientert kundebehandling. Anbefales!',
  },
  {
    name: 'Gustav Kronstad',
    text: 'Leverer effektiv og god service. God opplevelse fra start til slutt. Anbefaler sterkt.',
  },
  {
    name: 'Tor Arne Thorsen',
    text: 'Ærlig selger, meget fornøyd med kjøp!!',
  },
  {
    name: 'Kristian Moe',
    text: 'Topp service og profesjonelle selgere! Anbefales!',
  },
]

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.5 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2c-7.4 0-13.8 4-17.7 10.7z" />
    <path fill="#FBBC05" d="M24 46c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.5C29.5 37.5 26.9 38 24 38c-6.1 0-10.7-3.1-11.8-8.5l-7 5.4C8.8 42.1 15.9 46 24 46z" />
    <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.9-2.6 5.2-4.9 6.7l6.5 5.5c3.8-3.5 6.1-8.7 6.1-14.7 0-1.3-.2-2.7-.5-4z" />
  </svg>
)

export default function ReviewCarousel() {
  const doubled = [...reviews, ...reviews]

  return (
    <section className="bg-[#e4edf6] py-16">
      <div className="text-center px-4 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#2471c8] mb-2">Kundeanmeldelser</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3a5c] mb-4">Hva kundene våre sier</h2>
        <div className="inline-flex items-center gap-2 bg-white border border-[#ccdcee] rounded-full px-5 py-2 text-sm font-bold text-[#1a3a5c]">
          <GoogleIcon />
          <span className="text-yellow-500">★★★★★</span>
          4.9 · 43 anmeldelser
        </div>
      </div>

      <div className="overflow-hidden w-full py-2">
        <div
          className="flex gap-4 w-max animate-marquee"
          style={{ animation: 'marquee 40s linear infinite' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
        >
          {doubled.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-[#ccdcee] rounded-xl p-5 w-80 flex-shrink-0 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <GoogleIcon />
                <span className="text-yellow-400 text-sm tracking-wider">★★★★★</span>
              </div>
              <p className="text-sm text-[#1a2a3a] leading-relaxed mb-4">"{r.text}"</p>
              <p className="text-xs font-bold text-[#1a3a5c]">{r.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-[#5a7a9a]">
        <GoogleIcon />
        <span>Anmeldelser fra Google</span>
      </div>
    </section>
  )
}
