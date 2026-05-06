'use client'

import { useState, useRef } from 'react'

type FormType = 'innbytte' | 'selg'

interface CarFormProps {
  type: FormType
}

interface FormState {
  merke: string
  modell: string
  aarsmodell: string
  kilometerstand: string
  regnr: string
  drivstoff: string
  prisforventning: string
  beskrivelse: string
  navn: string
  telefon: string
  epost: string
}

const emptyForm: FormState = {
  merke: '',
  modell: '',
  aarsmodell: '',
  kilometerstand: '',
  regnr: '',
  drivstoff: 'Bensin',
  prisforventning: '',
  beskrivelse: '',
  navn: '',
  telefon: '',
  epost: '',
}

export default function CarForm({ type }: CarFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const MAX_FILES = 10
    const MAX_SIZE_MB = 8
    const arr = Array.from(newFiles).filter((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`"${file.name}" er for stor (maks ${MAX_SIZE_MB}MB per bilde).`)
        return false
      }
      return true
    })
    if (!arr.length) return

    setFiles((prevFiles) => {
      const combined = [...prevFiles, ...arr].slice(0, MAX_FILES)
      if (prevFiles.length + arr.length > MAX_FILES) {
        alert(`Maks ${MAX_FILES} bilder tillatt.`)
      }

      // Les previews basert på eksakt kombinasjon
      const newPreviews: string[] = []
      let loaded = 0
      arr.slice(0, MAX_FILES - prevFiles.length).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string)
          loaded++
          if (loaded === arr.slice(0, MAX_FILES - prevFiles.length).length) {
            setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews].slice(0, MAX_FILES))
          }
        }
        reader.readAsDataURL(file)
      })

      return combined
    })
  }

  const removeFile = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i))
    setPreviews((prev) => prev.filter((_, idx) => idx !== i))
  }

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.navn.trim()) e.navn = 'Navn er påkrevd'
    if (!form.telefon.trim()) e.telefon = 'Telefon er påkrevd'
    if (!form.epost.trim()) e.epost = 'E-post er påkrevd'
    else if (!/\S+@\S+\.\S+/.test(form.epost)) e.epost = 'Ugyldig e-postadresse'
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
      data.append('type', type)
      files.forEach((f) => data.append('bilder', f))

      const res = await fetch('/api/contact', { method: 'POST', body: data })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(emptyForm)
      setFiles([])
      setPreviews([])
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormState) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm bg-white text-[#1a2a3a] outline-none transition-colors ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-[#ccdcee] focus:border-[#2471c8]'
    }`

  const label = (text: string, required = false) => (
    <label className="text-xs font-semibold text-[#1a3a5c] mb-1 block">
      {text}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )

  if (status === 'success') {
    return (
      <div className="bg-[#e8f1fb] border border-[#ccdcee] rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">Takk! Forespørselen er mottatt.</h3>
        <p className="text-[#5a7a9a] text-sm">Vi tar kontakt med deg innen kort tid.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 bg-[#1e5fa8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#2471c8] transition-colors"
        >
          Send ny forespørsel
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-[#ccdcee] rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="text-base font-bold text-[#1a3a5c] mb-5">Om bilen din</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          {label('Merke')}
          <input type="text" placeholder="f.eks. Toyota" value={form.merke} onChange={set('merke')} className={inputClass('merke')} />
        </div>
        <div>
          {label('Modell')}
          <input type="text" placeholder="f.eks. Corolla" value={form.modell} onChange={set('modell')} className={inputClass('modell')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          {label('Årsmodell')}
          <input type="number" placeholder="2019" value={form.aarsmodell} onChange={set('aarsmodell')} className={inputClass('aarsmodell')} />
        </div>
        <div>
          {label('Kilometerstand')}
          <input type="number" placeholder="85 000" value={form.kilometerstand} onChange={set('kilometerstand')} className={inputClass('kilometerstand')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          {label('Registreringsnummer')}
          <input type="text" placeholder="AB 12345" value={form.regnr} onChange={set('regnr')} className={`${inputClass('regnr')} uppercase`} />
        </div>
        <div>
          {label('Drivstofftype')}
          <select value={form.drivstoff} onChange={set('drivstoff')} className={inputClass('drivstoff')}>
            {['Bensin', 'Diesel', 'Elektrisk', 'Hybrid', 'Annet'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {type === 'selg' && (
        <div className="mb-4">
          {label('Prisforventning (valgfritt)')}
          <input
            type="number"
            placeholder="kr 150 000"
            value={form.prisforventning}
            onChange={set('prisforventning')}
            className={inputClass('prisforventning')}
          />
        </div>
      )}

      <div className="mb-6">
        {label('Beskrivelse / kommentar')}
        <textarea
          placeholder="Stand, utstyr, historikk..."
          value={form.beskrivelse}
          onChange={set('beskrivelse')}
          rows={4}
          className={`${inputClass('beskrivelse')} resize-y`}
        />
      </div>

      <h3 className="text-base font-bold text-[#1a3a5c] mb-5">Kontaktinformasjon</h3>

      <div className="mb-4">
        {label('Navn', true)}
        <input type="text" placeholder="Ditt navn" value={form.navn} onChange={set('navn')} className={inputClass('navn')} />
        {errors.navn && <p className="text-red-500 text-xs mt-1">{errors.navn}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          {label('Telefon', true)}
          <input type="tel" placeholder="900 00 000" value={form.telefon} onChange={set('telefon')} className={inputClass('telefon')} />
          {errors.telefon && <p className="text-red-500 text-xs mt-1">{errors.telefon}</p>}
        </div>
        <div>
          {label('E-post', true)}
          <input type="email" placeholder="din@epost.no" value={form.epost} onChange={set('epost')} className={inputClass('epost')} />
          {errors.epost && <p className="text-red-500 text-xs mt-1">{errors.epost}</p>}
        </div>
      </div>

      {/* Bildeopplasting */}
      <div className="mb-6">
        {label('Bilder av bilen')}
        <div
          className="border-2 border-dashed border-[#ccdcee] hover:border-[#2471c8] hover:bg-[#e8f1fb] rounded-xl p-6 text-center cursor-pointer transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        >
          <div className="text-3xl mb-2">📷</div>
          <p className="text-sm text-[#5a7a9a]">Klikk for å laste opp, eller dra og slipp</p>
          <p className="text-xs text-[#5a7a9a] mt-1">JPG, PNG — maks 10 bilder, 8MB per bilde</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { handleFiles(e.target.files); e.currentTarget.value = '' }}
        />
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-20 h-20 object-cover rounded-lg border border-[#ccdcee]" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs font-bold hidden group-hover:flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-4">
          Noe gikk galt. Prøv igjen eller ring oss på 47 68 03 95.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#1e5fa8] hover:bg-[#2471c8] disabled:opacity-60 text-white font-bold py-3.5 rounded-lg text-base transition-colors hover:-translate-y-0.5 hover:shadow-lg"
      >
        {status === 'sending'
          ? 'Sender...'
          : type === 'innbytte'
          ? 'Send innbytteforespørsel'
          : 'Send forespørsel'}
      </button>
    </form>
  )
}
