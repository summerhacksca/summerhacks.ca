import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { sendEmail } from '@/lib/gmail'

const waitlistConfirmationEmailDir = path.join(
  process.cwd(),
  'app/api/email/emailformat'
)
const waitlistConfirmationEmailPath = path.join(waitlistConfirmationEmailDir, 'email.html')

function replaceInlineSvgsWithPngs(html: string): string {
  const replacements = [
    '<img src="email-decor-left.png" width="211" height="239" alt="Decor left" style="display:block;width:211px;height:239px;" />',
    '<img src="email-decor-right.png" width="247" height="264" alt="Decor right" style="display:block;width:247px;height:264px;" />',
    '<img src="email-logo.png" width="20" height="20" alt="Logo mark" style="display:block;width:20px;height:20px;" />',
  ]

  let index = 0
  return html.replace(/<svg[\s\S]*?<\/svg>/g, () => {
    const replacement = replacements[index]
    index += 1
    return replacement ?? ''
  })
}

function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

async function inlineTemplateImages(html: string): Promise<string> {
  const srcRegex = /src="([^"]+)"/g
  const srcMatches = [...html.matchAll(srcRegex)]
  const uniqueSrcs = [...new Set(srcMatches.map((match) => match[1]))]

  for (const src of uniqueSrcs) {
    const isAlreadyEmbeddable =
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('data:') ||
      src.startsWith('cid:')

    if (isAlreadyEmbeddable) {
      continue
    }

    let resolvedSrc = src

    // Many email clients don't reliably render SVGs. Prefer a PNG sibling when available.
    if (path.extname(src).toLowerCase() === '.svg') {
      const pngCandidate = src.replace(/\.svg$/i, '.png')
      const pngPath = path.resolve(waitlistConfirmationEmailDir, pngCandidate)

      try {
        await readFile(pngPath)
        resolvedSrc = pngCandidate
      } catch {
        console.warn(`No PNG fallback found for SVG asset: ${src}`)
      }
    }

    const assetPath = path.resolve(waitlistConfirmationEmailDir, resolvedSrc)
    const isInsideTemplateDir =
      assetPath === waitlistConfirmationEmailDir ||
      assetPath.startsWith(`${waitlistConfirmationEmailDir}${path.sep}`)

    if (!isInsideTemplateDir) {
      console.warn(`Skipping non-local email asset path: ${src}`)
      continue
    }

    try {
      const assetBuffer = await readFile(assetPath)
      const mimeType = getMimeType(resolvedSrc)
      const dataUri = `data:${mimeType};base64,${assetBuffer.toString('base64')}`
      html = html.replaceAll(`src="${src}"`, `src="${dataUri}"`)
    } catch (error) {
      console.error(`Failed to inline email asset: ${resolvedSrc}`, error)
    }
  }

  return html
}

async function waitlistConfirmationEmail(): Promise<string> {
  const rawHtml = await readFile(waitlistConfirmationEmailPath, 'utf8')
  const emailSafeHtml = replaceInlineSvgsWithPngs(rawHtml)
  return inlineTemplateImages(emailSafeHtml)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Create Supabase client with SERVICE ROLE key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({ email: normalizedEmail })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        )
      }
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add email to waitlist' },
        { status: 500 }
      )
    }

    console.log(`New email subscription: ${normalizedEmail}`)

    const confirmationEmailHtml = await waitlistConfirmationEmail()

    // Send confirmation email — non-blocking, don't fail the request if it errors
    sendEmail(
      normalizedEmail,
      "You're on the Summer Hacks waitlist!",
      confirmationEmailHtml
    ).catch((err) => {
      console.error('Failed to send confirmation email:', err)
    })

    return NextResponse.json(
      {
        message: 'Email added successfully',
        email: data.email
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error processing email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Email API endpoint is working' }, { status: 200 })
}
