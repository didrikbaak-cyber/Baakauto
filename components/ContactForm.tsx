'use client'

import { useState } from 'react'

interface Fields {
  navn: string
  epost: string
  telefon: string
  melding: string
}

const empty: Fields = { navn: '', epost: '', telefon: '', melding: '' }

export default function ContactForm() {
  const [form, setForm] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const e: Partial<Fields> = {}
    if (!form.navn.trim()) e.navn = 'Navn er påkrevd'
    if (!form.epost.trim()) e.epost = 'E-post er påkrevd'
    else if (!/\S+@\S+\.\S+/.test(form.epost)) e.epost = 'Ugyldig e-postadresse'
    if (!form.melding.trim()) e.melding = 'Melding er påkrevd'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      data.append('type', 'kontakt')
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: keyof Fields) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm bg-white text-[#1a2a3a] outline-none transition-colors ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-[#ccdcee] focus:border-[#2471c8]'
    }`

  if (status === 'success') {
    return (
      <div className="bg-white border border-[#ccdcee] rounded-2xl p-8 text-center shadow-sm">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">Takk for meldingen!</h3>
        <p className="text-[#5a7a9a] text-sm">Vi svarer deg så snart som mulig.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 bg-[#1e5fa8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#2471c8] transition-colors"
        >
          Send ny melding
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-[#ccdcee] rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-lg font-bold text-[#1a3a5c] mb-6">Send oss en melding</h2>

      <div className="mb-4">
        <label className="text-xs font-semibold text-[#1a3a5c] mb-1 block">
          Navn <span className="text-red-500">*</span>
        </label>
        <input type="text" placeholder="Ditt navn" value={form.navn} onChange={set('navn')} className={inputClass('navn')} />
        {errors.navn && <p className="text-red-500 text-xs mt-1">{errors.navn}</p>}
      </div>

      <div className="mb-4">
        <label className="text-xs font-semibold text-[#1a3a5c] mb-1 block">
          E-post <span className="text-red-500">*</span>
        </label>
        <input type="email" placeholder="din@epost.no" value={form.epost} onChange={set('epost')} className={inputClass('epost')} />
        {errors.epost && <p className="text-red-500 text-xs mt-1">{errors.epost}</p>}
      </div>

      <div className="mb-4">
        <label className="text-xs font-semibold text-[#1a3a5c] mb-1 block">Telefon</label>
        <input type="tel" placeholder="900 00 000" value={form.telefon} onChange={set('telefon')} className={inputClass('telefon')} />
      </div>

      <div className="mb-6">
        <label className="text-xs font-semibold text-[#1a3a5c] mb-1 block">
          Melding <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Hva kan vi hjelpe deg med?"
          value={form.melding}
          onChange={set('melding')}
          rows={5}
          className={`${inputClass('melding')} resize-y`}
        />
        {errors.melding && <p className="text-red-500 text-xs mt-1">{errors.melding}</p>}
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-4">
          Noe gikk galt. Prøv igjen eller ring oss på 47 68 03 95.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#1e5fa8] hover:bg-[#2471c8] disabled:opacity-60 text-white font-bold py-3.5 rounded-lg text-base transition-colors"
      >
        {status === 'sending' ? 'Sender...' : 'Send melding'}
      </button>
    </form>
  )
}
