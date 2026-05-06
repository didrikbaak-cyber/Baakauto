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
    const body = await req.json() as Record<string, unknown>
    const type = body.type as string
    const imageUrls: string[] = Array.isArray(body.imageUrls) ? body.imageUrls : []

    const fields: Record<string, string> = {}
    for (const [k, v] of Object.entries(body)) {
      if (k !== 'type' && k !== 'imageUrls' && typeof v === 'string' && v) {
        fields[k] = v
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
      const label = labelMap[k] ?? k
      html += `<tr><td style="padding:6px 12px;font-weight:bold;background:#f0f4f8;border:1px solid #ccdcee">${label}</td><td style="padding:6px 12px;border:1px solid #ccdcee">${v}</td></tr>`
    }
    html += '</table>'
    if (imageUrls.length) {
      html += `<h3 style="margin-top:1.5em">Bilder</h3><ul>`
      imageUrls.forEach((url, i) => {
        html += `<li><a href="${url}">Bilde ${i + 1}</a><br><img src="${url}" style="max-width:300px;margin-top:4px"></li>`
      })
      html += '</ul>'
    }

    // --- TELEGRAM ---
    let tgText = `${emoji} <b>${subject}</b>\n━━━━━━━━━━━━━━━━\n`
    for (const [k, v] of Object.entries(fields)) {
      const label = labelMap[k] ?? k
      tgText += `<b>${label}:</b> ${v}\n`
    }
    if (imageUrls.length) {
      tgText += `\n📷 <b>Bilder (${imageUrls.length} stk):</b>\n`
      imageUrls.forEach((url, i) => {
        tgText += `<a href="${url}">Bilde ${i + 1}</a>\n`
      })
    }

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
