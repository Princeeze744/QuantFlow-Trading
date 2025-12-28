'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Signal {
  id: string
  asset: string
  direction: 'BUY' | 'SELL'
  entry_price: number
  stop_loss: number
  take_profit: number
  risk_reward: number
  timeframe: string
  status: 'ACTIVE' | 'TP_HIT' | 'SL_HIT' | 'EXPIRED' | 'CANCELLED'
  analysis: string | null
  chart_image_url: string | null
  result_pips: number | null
  created_at: string
  closed_at: string | null
}

interface UseSignalsReturn {
  signals: Signal[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useSignals(status?: string): UseSignalsReturn {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchSignals = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setSignals(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignals()

    const channel = supabase
      .channel('signals-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'signals' }, () => {
        fetchSignals()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [status])

  return { signals, loading, error, refetch: fetchSignals }
}