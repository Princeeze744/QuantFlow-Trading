import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'

// GET - Public (but could restrict to authenticated users)
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const featured = searchParams.get('featured')

  let query = supabase
    .from('signals')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)
  if (featured === 'true') query = query.eq('is_featured', true)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST - Admin Only
export async function POST(request: NextRequest) {
  // ✅ SECURITY: Check if user is admin
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' }, 
      { status: 403 }
    )
  }

  const supabase = await createClient()
  const body = await request.json()

  // ✅ SECURITY: Validate required fields
  if (!body.asset) {
    return NextResponse.json(
      { error: 'Asset is required' }, 
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('signals')
    .insert({
      asset: body.asset,
      timeframe: body.timeframe || 'M15',
      full_analysis: body.full_analysis,
      chart_image_url: body.chart_image_url || null,
      is_featured: body.is_featured || false,
      status: body.status || 'ACTIVE',
    })
    .select()
    .single()

  if (error) {
    console.error('Signal creation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}