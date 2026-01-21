import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email } = body

    // Validate email format
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a string' },
        { status: 400 }
      )
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // TODO: Add your email storage logic here
    // This could be:
    // - Adding to a database
    // - Adding to a mailing list service (e.g., Mailchimp, ConvertKit)
    // - Sending to a webhook
    // - Storing in a file

    console.log(`New email subscription: ${email}`)

    // For now, we'll just return success
    // In a real implementation, you might want to:
    // 1. Store in database
    // 2. Send confirmation email
    // 3. Add to email marketing service

    return NextResponse.json(
      {
        message: 'Email added successfully',
        email: email
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error processing email:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Email API endpoint is working' },
    { status: 200 }
  )
}
