'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Hjem' },
  { href: 'https://www.finn.no/mobility/search/car?q=baak+auto', label: 'Våre biler', external: true },
  { href: '/innbytte', label: 'Innbytte' },
  { href: '/selg', label: 'Selg din bil' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/97 backdrop-blur-sm border-b border-[#ccdcee] shadow-[0_1px_8px_rgba(30,95,168,0.08)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-[#1a3a5c] font-extrabold text-xl tracking-widest">
          BAAK<span className="text-[#2471c8]"> AUTO</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors text-[#5a7a9a] hover:text-[#1a3a5c]"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href ? 'text-[#1a3a5c]' : 'text-[#5a7a9a] hover:text-[#1a3a5c]'
                }`}
              >
                {l.label}
              </Link>
            )
          ))}
          <Link
            href="/kontakt"
            className="bg-[#1e5fa8] hover:bg-[#2471c8] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Ring oss
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meny"
        >
          <span className={`block h-0.5 w-6 bg-[#1a3a5c] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#1a3a5c] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#1a3a5c] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#ccdcee] px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-2 border-b border-[#e4edf6] text-[#5a7a9a]"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium py-2 border-b border-[#e4edf6] ${
                  pathname === l.href ? 'text-[#1a3a5c] font-bold' : 'text-[#5a7a9a]'
                }`}
              >
                {l.label}
              </Link>
            )
          ))}
          <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
            className="bg-[#1e5fa8] text-white text-sm font-semibold px-4 py-2.5 rounded-md text-center mt-1"
          >
            Ring oss
          </Link>
        </div>
      )}
    </nav>
  )
}
