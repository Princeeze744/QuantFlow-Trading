import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch user's tracked signals
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('user_signals')
      .select(`
        *,
        signal:signals(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calculate user's personal stats
    const followed = data?.filter(us => us.followed) || []
    const wins = followed.filter(us => us.signal?.status === 'TP_HIT').length
    const losses = followed.filter(us => us.signal?.status === 'SL_HIT').length
    const totalPips = followed.reduce((sum, us) => sum + (us.signal?.result_pips || 0), 0)

    return NextResponse.json({
      userSignals: data,
      stats: {
        totalFollowed: followed.length,
        wins,
        losses,
        winRate: followed.length > 0 ? ((wins / followed.length) * 100).toFixed(1) + '%' : '0%',
        totalPips: totalPips.toFixed(1)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Track a signal (mark as followed or not)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { signal_id, followed, notes } = body

    if (!signal_id) {
      return NextResponse.json({ error: 'signal_id is required' }, { status: 400 })
    }

    // Upsert - insert or update if exists
    const { data, error } = await supabase
      .from('user_signals')
      .upsert({
        user_id: user.id,
        signal_id,
        followed: followed ?? true,
        notes
      }, {
        onConflict: 'user_id,signal_id'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ userSignal: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}