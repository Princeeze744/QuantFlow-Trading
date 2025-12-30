import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  
  // Use environment variable for production URL
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quantflow-trading-production.up.railway.app'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${siteUrl}${next}`)
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${siteUrl}/login?error=auth_failed`)
}