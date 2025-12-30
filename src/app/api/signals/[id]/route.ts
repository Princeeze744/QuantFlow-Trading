import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'

// PATCH - Admin Only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ SECURITY: Check if user is admin
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' }, 
      { status: 403 }
    )
  }

  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()

  // ✅ SECURITY: Validate ID
  if (!id) {
    return NextResponse.json(
      { error: 'Signal ID is required' }, 
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('signals')
    .update({ 
      status: body.status,
      result_pips: body.result_pips,
      closed_at: body.status !== 'ACTIVE' ? new Date().toISOString() : null,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// DELETE - Admin Only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ SECURITY: Check if user is admin
  const adminCheck = await isAdmin()
  if (!adminCheck) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' }, 
      { status: 403 }
    )
  }

  const { id } = await params
  const supabase = await createClient()

  // ✅ SECURITY: Validate ID
  if (!id) {
    return NextResponse.json(
      { error: 'Signal ID is required' }, 
      { status: 400 }
    )
  }

  const { error } = await supabase
    .from('signals')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}