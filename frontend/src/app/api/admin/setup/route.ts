import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function POST(request: Request) {
  try {
    const { userId, email, displayName } = await request.json()
    
    if (!userId || !email || !displayName) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, email, displayName' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Create admin profile
    const { data: adminProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        display_name: displayName,
        user_role: 'admin'
      })
      .select()
      .single()

    if (createError) {
      throw createError
    }

    return NextResponse.json({ 
      success: true, 
      adminProfile 
    })
  } catch (error) {
    console.error('Error creating admin profile:', error)
    return NextResponse.json(
      { error: 'Failed to create admin profile' },
      { status: 500 }
    )
  }
}
