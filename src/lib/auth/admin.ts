import { createClient } from '@/lib/supabase/server'

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return false
  
  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', user.id)
    .single()
  
  return !!admin
}

export async function requireAdmin() {
  const adminStatus = await isAdmin()
  
  if (!adminStatus) {
    throw new Error('Unauthorized: Admin access required')
  }
  
  return true
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized: Authentication required')
  }
  
  return user
}