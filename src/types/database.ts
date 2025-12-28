export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SignalDirection = 'BUY' | 'SELL'
export type SignalStatus = 'ACTIVE' | 'TP_HIT' | 'SL_HIT' | 'EXPIRED' | 'CANCELLED'
export type SubscriptionTier = 'FREE' | 'BASIC' | 'PRO' | 'VIP'
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: SubscriptionTier
          subscription_status: SubscriptionStatus
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: SubscriptionTier
          subscription_status?: SubscriptionStatus
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: SubscriptionTier
          subscription_status?: SubscriptionStatus
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      signals: {
        Row: {
          id: string
          asset: string
          direction: SignalDirection
          entry_price: number
          stop_loss: number
          take_profit: number
          risk_reward: string
          timeframe: string
          status: SignalStatus
          analysis: string | null
          chart_image_url: string | null
          result_pips: number | null
          closed_at: string | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          asset: string
          direction: SignalDirection
          entry_price: number
          stop_loss: number
          take_profit: number
          risk_reward?: string
          timeframe: string
          status?: SignalStatus
          analysis?: string | null
          chart_image_url?: string | null
          result_pips?: number | null
          closed_at?: string | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          asset?: string
          direction?: SignalDirection
          entry_price?: number
          stop_loss?: number
          take_profit?: number
          risk_reward?: string
          timeframe?: string
          status?: SignalStatus
          analysis?: string | null
          chart_image_url?: string | null
          result_pips?: number | null
          closed_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      user_signals: {
        Row: {
          id: string
          user_id: string
          signal_id: string
          followed: boolean
          result: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          signal_id: string
          followed?: boolean
          result?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          signal_id?: string
          followed?: boolean
          result?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Signal = Database['public']['Tables']['signals']['Row']
export type UserSignal = Database['public']['Tables']['user_signals']['Row']
export type Admin = Database['public']['Tables']['admins']['Row']