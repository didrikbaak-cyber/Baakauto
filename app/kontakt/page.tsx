import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt oss',
  description:
    'Kontakt Baak Auto AS i Sandefjord. Adresse: Hinderveien 7, 3223 Sandefjord. Telefon: 47 68 03 95. Åpent man–fre 08–17, lørdag 10–15.',
}

export default function KontaktPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#1a3a5c] to-[#1e5fa8] text-white py-16 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Kontakt</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Kontakt oss</h1>
        <p className="text-white/80 text-lg max-w-lg mx-auto">
          Vi er alltid klare til å hjelpe deg — ta gjerne kontakt!
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: Info + åpningstider + kart */}
          <div className="space-y-6">
            <div className="bg-white border border-[#ccdcee] rounded-2xl p-6">
              <h2 className="font-bold text-[#1a3a5c] text-lg mb-5">Kontaktinformasjon</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: '📍',
                    label: 'Adresse',
                    value: 'Hinderveien 7, 3223 Sandefjord',
                    href: 'https://maps.google.com/?q=Hinderveien+7,+3223+Sandefjord',
                  },
                  {
                    icon: '📞',
                    label: 'Telefon',
                    value: '47 68 03 95',
                    href: 'tel:+4747680395',
                  },
                  {
                    icon: '✉️',
                    label: 'E-post',
                    value: 'albert@baakauto.no',
                    href: 'mailto:albert@baakauto.no',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 items-start">
                    <div className="w-9 h-9 bg-[#e8f1fb] rounded-lg flex items-center justify-center flex-shrink-0 text-base">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#5a7a9a] font-semibold uppercase tracking-wide">{item.label}</p>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[#1a2a3a] text-sm hover:text-[#2471c8] transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#ccdcee] rounded-2xl p-6">
              <h2 className="font-bold text-[#1a3a5c] text-lg mb-4">Åpningstider</h2>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Mandag–Fredag', time: '08:00–17:00', closed: false },
                  { day: 'Lørdag', time: '10:00–15:00', closed: false },
                  { day: 'Søndag', time: 'Stengt', closed: true },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between py-2 border-b border-[#e4edf6] last:border-0">
                    <span className="text-[#5a7a9a]">{row.day}</span>
                    <span className={`font-semibold ${row.closed ? 'text-red-500' : 'text-[#1a3a5c]'}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-[#ccdcee] shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2062.5!2d10.2345!3d59.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4646c1c31b72994b%3A0x1b97a124a4e5e213!2sHinderveien%207%2C%203223%20Sandefjord!5e0!3m2!1sno!2sno!4v1620000000000!5m2!1sno!2sno"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Baak Auto AS — Hinderveien 7, Sandefjord"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Hinderveien+7,+3223+Sandefjord"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-semibold text-[#2471c8] hover:underline"
            >
              Åpne i Google Maps ↗
            </a>

            {/* Bilde av lokalet */}
            <div className="relative h-52 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/forside-bygg.jpg"
                alt="Baak Auto AS — Hinderveien 7, Sandefjord"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* RIGHT: Profilkort + Kontaktskjema */}
          <div className="space-y-6">
            <div className="bg-white border border-[#ccdcee] rounded-2xl p-6 flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src="/albert.jpg"
                  alt="Albert Baak — Daglig leder"
                  fill
                  className="object-cover rounded-full"
                  sizes="80px"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#2471c8] mb-0.5">Daglig leder</p>
                <h3 className="text-lg font-extrabold text-[#1a3a5c]">Albert Baak</h3>
                <p className="text-sm text-[#5a7a9a] mt-1">Ta gjerne kontakt direkte — jeg svarer raskt!</p>
                <a
                  href="tel:+4747680395"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-[#1e5fa8] hover:text-[#2471c8] transition-colors"
                >
                  📞 47 68 03 95
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
