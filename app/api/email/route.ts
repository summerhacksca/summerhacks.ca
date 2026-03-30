import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/gmail'

function waitlistConfirmationEmail(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">
          <tr>
            <td style="background-color: #ffefdd; border-radius: 16px; padding: 40px 40px 32px 40px;">
              <p style="margin: 0 0 24px 0; font-size: 28px;">☀️</p>
              <h1 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">
                You're on the list!
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.6;">
                Thanks for signing up for Summer Hacks. We'll reach out with updates as we get closer to the event.
              </p>
              <p style="margin: 0; font-size: 15px; color: #888888; line-height: 1.5;">
                — The Summer Hacks Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0 0 0; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #bbbbbb;">
                summerhacks.ca
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
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

    // Send confirmation email — non-blocking, don't fail the request if it errors
    sendEmail(
      normalizedEmail,
      "You're on the Summer Hacks waitlist!",
      waitlistConfirmationEmail()
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
