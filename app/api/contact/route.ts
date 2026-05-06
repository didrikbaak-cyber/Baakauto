import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const labelMap: Record<string, string> = {
  merke: 'Merke',
  modell: 'Modell',
  aarsmodell: 'Årsmodell',
  kilometerstand: 'Kilometerstand',
  regnr: 'Regnr',
  drivstoff: 'Drivstoff',
  prisforventning: 'Prisforventning',
  beskrivelse: 'Beskrivelse',
  navn: 'Navn',
  telefon: 'Telefon',
  epost: 'E-post',
  melding: 'Melding',
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}

async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<string | null> {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!cloudName || !apiKey || !apiSecret) return null

    const base64 = buffer.toString('base64')
    const dataUri = `data:${mimeType};base64,${base64}`

    const formData = new FormData()
    formData.append('file', dataUri)
    formData.append('upload_preset', 'unsigned_baak') // fallback
    formData.append('folder', 'baak-auto')
    formData.append('public_id', `${Date.now()}-${filename.replace(/\.[^.]+$/, '')}`)

    // Signed upload
    const timestamp = Math.round(Date.now() / 1000)
    const publicId = `baak-auto/${Date.now()}-${filename.replace(/\.[^.]+$/, '')}`
    const strToSign = `folder=baak-auto&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const encoder = new TextEncoder()
    const data = encoder.encode(strToSign)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const fd = new FormData()
    fd.append('file', dataUri)
    fd.append('api_key', apiKey)
    fd.append('timestamp', String(timestamp))
    fd.append('signature', signature)
    fd.append('folder', 'baak-auto')
    fd.append('public_id', publicId)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: fd,
    })

    const json = await res.json() as { secure_url?: string; error?: { message: string } }
    if (json.error) throw new Error(json.error.message)
    return json.secure_url ?? null
  } catch (err) {
    console.error('[Cloudinary upload]', err)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const type = data.get('type') as string

    const fields: Record<string, string> = {}
    for (const [key, val] of data.entries()) {
      if (key !== 'bilder' && typeof val === 'string') {
        fields[key] = val
      }
    }

    const attachments: { filename: string; content: Buffer }[] = []
    const bilderEntries = data.getAll('bilder')
    const imageLinks: string[] = []

    for (const entry of bilderEntries) {
      if (entry instanceof File && entry.size > 0) {
        const buf = Buffer.from(await entry.arrayBuffer())
        attachments.push({ filename: entry.name, content: buf })

        const link = await uploadToCloudinary(buf, entry.name, entry.type || 'image/jpeg')
        if (link) imageLinks.push(link)
      }
    }

    const subjectMap: Record<string, string> = {
      innbytte: 'Ny innbytteforespørsel',
      selg: 'Ny forespørsel om bilsalg',
      kontakt: 'Ny kontaktmelding',
    }
    const emojiMap: Record<string, string> = {
      innbytte: '🔄',
      selg: '🚗',
      kontakt: '✉️',
    }

    const subject = subjectMap[type] ?? 'Ny henvendelse fra baakauto.no'
    const emoji = emojiMap[type] ?? '📩'

    // --- E-POST ---
    let html = `<h2>${subject}</h2><table style="border-collapse:collapse;width:100%">`
    for (const [k, v] of Object.entries(fields)) {
      if (k === 'type' || !v) continue
      const label = labelMap[k] ?? k
      html += `<tr><td style="padding:6px 12px;font-weight:bold;background:#f0f4f8;border:1px solid #ccdcee">${label}</td><td style="padding:6px 12px;border:1px solid #ccdcee">${v}</td></tr>`
    }
    html += '</table>'

    if (imageLinks.length) {
      html += `<h3 style="margin-top:1.5em">Bilder</h3><ul>`
      imageLinks.forEach((link, i) => {
        html += `<li><a href="${link}">Bilde ${i + 1}</a> &nbsp;<img src="${link}" style="max-width:300px;display:block;margin-top:4px"></li>`
      })
      html += '</ul>'
    } else if (attachments.length) {
      html += `<p style="margin-top:1em">${attachments.length} bilde(r) er vedlagt som e-postvedlegg.</p>`
    }

    // --- TELEGRAM ---
    let tgText = `${emoji} <b>${subject}</b>\n`
    tgText += `━━━━━━━━━━━━━━━━\n`
    for (const [k, v] of Object.entries(fields)) {
      if (k === 'type' || !v) continue
      const label = labelMap[k] ?? k
      tgText += `<b>${label}:</b> ${v}\n`
    }
    if (imageLinks.length) {
      tgText += `\n📷 <b>Bilder (${imageLinks.length} stk):</b>\n`
      imageLinks.forEach((link, i) => {
        tgText += `<a href="${link}">Bilde ${i + 1}</a>\n`
      })
    } else if (attachments.length) {
      tgText += `\n📷 ${attachments.length} bilde(r) vedlagt på e-post`
    }

    // Send parallelt
    await Promise.allSettled([
      process.env.SMTP_USER
        ? nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          }).sendMail({
            from: `"Baak Auto nettside" <${process.env.SMTP_USER}>`,
            to: 'albert@baakauto.no',
            subject,
            html,
            attachments,
          })
        : Promise.resolve(),
      sendTelegram(tgText),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
