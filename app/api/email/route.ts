import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { sendEmail } from '@/lib/gmail'

const emailImagesBaseUrl = 'https://summerhacks.ca/emailimages'

const waitlistConfirmationEmailDir = path.join(
  process.cwd(),
  'app/api/email/emailformat'
)
const waitlistConfirmationEmailPath = path.join(waitlistConfirmationEmailDir, 'email.html')

function replaceInlineSvgsWithPngs(html: string): string {
  const replacements = [
    `<img src="${emailImagesBaseUrl}/email-decor-left.png" width="211" height="239" alt="Decor left" style="display:block;width:211px;height:239px;" />`,
    `<img src="${emailImagesBaseUrl}/email-decor-right.png" width="247" height="264" alt="Decor right" style="display:block;width:247px;height:264px;" />`,
    `<img src="${emailImagesBaseUrl}/email-logo.png" width="20" height="20" alt="Logo mark" style="display:block;width:20px;height:20px;" />`,
  ]

  let index = 0
  return html.replace(/<svg[\s\S]*?<\/svg>/g, () => {
    const replacement = replacements[index]
    index += 1
    return replacement ?? ''
  })
}

function rewriteTemplateImageSources(html: string): string {
  const srcRegex = /src="([^"]+)"/g
  return html.replace(srcRegex, (_fullMatch, src: string) => {
    const isAlreadyAbsolute =
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('data:') ||
      src.startsWith('cid:')

    if (isAlreadyAbsolute) {
      return `src="${src}"`
    }

    const assetFileName = path.basename(src)
    return `src="${emailImagesBaseUrl}/${assetFileName}"`
  })
}

async function waitlistConfirmationEmail(): Promise<string> {
  const rawHtml = await readFile(waitlistConfirmationEmailPath, 'utf8')
  const emailSafeHtml = replaceInlineSvgsWithPngs(rawHtml)
  return rewriteTemplateImageSources(emailSafeHtml)
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
