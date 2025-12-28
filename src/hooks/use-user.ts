'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          setUser(null)
          setProfile(null)
          setIsAdmin(false)
          setLoading(false)
          return
        }

        setUser(user)

        // Get profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }

        // Check admin status
        const { data: adminCheck, error: adminError } = await supabase.rpc('is_admin')
        console.log('🔍 Admin Check Result:', adminCheck)
        
        if (adminError) {
          console.error('Admin check error:', adminError)
          setIsAdmin(false)
        } else {
          setIsAdmin(adminCheck === true)
        }

      } catch (err: any) {
        setError(err.message)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getUser()
      } else {
        setUser(null)
        setProfile(null)
        setIsAdmin(false)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, profile, isAdmin, loading, error }
}