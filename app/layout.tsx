import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Baak Auto AS — Bruktbilforhandler i Sandefjord',
    template: '%s | Baak Auto AS',
  },
  description:
    'Baak Auto AS er din lokale bruktbilforhandler i Sandefjord. Ærlig, rask og personlig service. 4.9 ★ på Google. Besøk oss på Hinderveien 7.',
  keywords: ['bruktbil', 'Sandefjord', 'bilforhandler', 'innbytte', 'selg bil', 'Baak Auto'],
  openGraph: {
    siteName: 'Baak Auto AS',
    locale: 'nb_NO',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
