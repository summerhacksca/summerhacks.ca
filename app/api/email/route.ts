import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import validDomainsArray from '@/public/university-domains.json'

const validDomains = new Set<string>(validDomainsArray);

function getBaseDomain(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return '';
  
  const domain = parts[1].toLowerCase();
  const domainParts = domain.split('.');
  
  const secondLevelTLDs = ['ac', 'edu', 'gov', 'co'];
  
  if (domainParts.length >= 3 && secondLevelTLDs.includes(domainParts[domainParts.length - 2])) {
    return domainParts.slice(-3).join('.');
  }
  
  if (domainParts.length >= 2) {
    return domainParts.slice(-2).join('.');
  }
  
  return domain;
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

    const baseDomain = getBaseDomain(email);
    
    if (!baseDomain) {
      return NextResponse.json(
        { error: 'Could not extract domain from email' },
        { status: 400 }
      )
    }

    if (!validDomains.has(baseDomain)) {
      return NextResponse.json(
        { error: 'Must use a university email address' },
        { status: 400 }
      )
    }

    // Create Supabase client with SERVICE ROLE key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim() })
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

    console.log(`New email subscription: ${email}`)

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