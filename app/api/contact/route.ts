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
    for (const entry of bilderEntries) {
      if (entry instanceof File && entry.size > 0) {
        const buf = Buffer.from(await entry.arrayBuffer())
        attachments.push({ filename: entry.name, content: buf })
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
    if (attachments.length) {
      html += `<p style="margin-top:1em">${attachments.length} bilde(r) er vedlagt.</p>`
    }

    // --- TELEGRAM ---
    let tgText = `${emoji} <b>${subject}</b>\n`
    tgText += `━━━━━━━━━━━━━━━━\n`
    for (const [k, v] of Object.entries(fields)) {
      if (k === 'type' || !v) continue
      const label = labelMap[k] ?? k
      tgText += `<b>${label}:</b> ${v}\n`
    }
    if (attachments.length) {
      tgText += `\n📷 ${attachments.length} bilde(r) lastet opp`
    }

    // Send parallelt
    await Promise.allSettled([
      // E-post (kun hvis SMTP er konfigurert)
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
      // Telegram
      sendTelegram(tgText),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
