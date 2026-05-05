import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-white/85 pt-12 pb-6 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-extrabold tracking-widest text-white mb-3">BAAK AUTO</div>
            <p className="text-sm text-white/70 leading-relaxed">
              Bruktbilforhandler i Sandefjord med ærlig og personlig service.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Kontakt</h4>
            <div className="space-y-1.5 text-sm text-white/70">
              <p>Hinderveien 7, 3223 Sandefjord</p>
              <p>Tlf: 47 68 03 95</p>
              <a href="mailto:albert@baakauto.no" className="hover:text-white transition-colors block">
                albert@baakauto.no
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Åpningstider</h4>
            <div className="space-y-1.5 text-sm text-white/70">
              <p>Man–Fre: 08:00–17:00</p>
              <p>Lørdag: 10:00–15:00</p>
              <p>Søndag: <span className="text-red-400">Stengt</span></p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Meny</h4>
            <div className="space-y-1.5 text-sm">
              {[
                { href: '/', label: 'Hjem' },
                { href: '/biler', label: 'Våre biler' },
                { href: '/innbytte', label: 'Innbytte' },
                { href: '/selg', label: 'Selg din bil' },
                { href: '/kontakt', label: 'Kontakt' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
          <span>© 2026 Baak Auto AS · Org.nr: 931 464 531</span>
          <span>Hinderveien 7, 3223 Sandefjord</span>
        </div>
      </div>
    </footer>
  )
}
