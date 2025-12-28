import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch signal performance stats
export async function GET() {
  try {
    const supabase = await createClient()

    // Get all closed signals
    const { data: signals, error } = await supabase
      .from('signals')
      .select('*')
      .in('status', ['TP_HIT', 'SL_HIT'])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calculate stats
    const totalSignals = signals?.length || 0
    const wins = signals?.filter(s => s.status === 'TP_HIT').length || 0
    const losses = signals?.filter(s => s.status === 'SL_HIT').length || 0
    const winRate = totalSignals > 0 ? ((wins / totalSignals) * 100).toFixed(1) : '0'
    
    const totalPips = signals?.reduce((sum, s) => sum + (s.result_pips || 0), 0) || 0

    // Get active signals count
    const { count: activeCount } = await supabase
      .from('signals')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE')

    // Get signals by asset
    const { data: allSignals } = await supabase
      .from('signals')
      .select('asset, status, result_pips')

    const byAsset: Record<string, { total: number; wins: number; pips: number }> = {}
    
    allSignals?.forEach(signal => {
      if (!byAsset[signal.asset]) {
        byAsset[signal.asset] = { total: 0, wins: 0, pips: 0 }
      }
      if (signal.status === 'TP_HIT' || signal.status === 'SL_HIT') {
        byAsset[signal.asset].total++
        if (signal.status === 'TP_HIT') byAsset[signal.asset].wins++
        byAsset[signal.asset].pips += signal.result_pips || 0
      }
    })

    // Monthly performance (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const { data: monthlySignals } = await supabase
      .from('signals')
      .select('created_at, status, result_pips')
      .gte('created_at', sixMonthsAgo.toISOString())
      .in('status', ['TP_HIT', 'SL_HIT'])

    const monthlyStats: Record<string, { wins: number; losses: number; pips: number }> = {}
    
    monthlySignals?.forEach(signal => {
      const month = new Date(signal.created_at).toLocaleString('default', { month: 'short', year: '2-digit' })
      if (!monthlyStats[month]) {
        monthlyStats[month] = { wins: 0, losses: 0, pips: 0 }
      }
      if (signal.status === 'TP_HIT') monthlyStats[month].wins++
      if (signal.status === 'SL_HIT') monthlyStats[month].losses++
      monthlyStats[month].pips += signal.result_pips || 0
    })

    return NextResponse.json({
      overview: {
        totalSignals,
        wins,
        losses,
        winRate: `${winRate}%`,
        totalPips: totalPips.toFixed(1),
        activeSignals: activeCount || 0
      },
      byAsset,
      monthly: monthlyStats
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}