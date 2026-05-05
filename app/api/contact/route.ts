import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    const subject = subjectMap[type] ?? 'Ny henvendelse fra baakauto.no'

    let html = `<h2>${subject}</h2><table style="border-collapse:collapse;width:100%">`
    for (const [k, v] of Object.entries(fields)) {
      if (k === 'type' || !v) continue
      html += `<tr><td style="padding:6px 12px;font-weight:bold;background:#f0f4f8;border:1px solid #ccdcee">${k}</td><td style="padding:6px 12px;border:1px solid #ccdcee">${v}</td></tr>`
    }
    html += '</table>'
    if (attachments.length) {
      html += `<p style="margin-top:1em">${attachments.length} bilde(r) er vedlagt.</p>`
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Baak Auto nettside" <${process.env.SMTP_USER}>`,
      to: 'albert@baakauto.no',
      subject,
      html,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
