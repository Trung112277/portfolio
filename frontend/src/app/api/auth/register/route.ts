import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    console.log('Register request:', { email, name, hasPassword: !!password })
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    // Try to create user with admin API first
    console.log('Creating user with supabaseAdmin...')
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      // Display name on Supabase UI reads from user_metadata.full_name
      user_metadata: name ? { name, full_name: name, role: 'user' } : { role: 'user' },
      app_metadata: { role: 'user' },
    })

    console.log('Create user result:', { 
      hasData: !!data, 
      hasUser: !!data?.user,
      error: error?.message,
      errorCode: error?.status,
      errorDetails: error
    })

    if (error) {
      console.error('Supabase auth error:', error)
      
      // Check if it's a permission error
      if (error.message?.includes('permission') || error.message?.includes('unauthorized')) {
        return NextResponse.json({ 
          error: 'Database error creating new user - Permission denied. Please check Supabase Auth settings.',
          details: error.message
        }, { status: 500 })
      }
      
      // If the email is already registered in this Supabase project, return 200 to avoid client error
      if (typeof error.message === 'string' && error.message.toLowerCase().includes('already been registered')) {
        return NextResponse.json({ user: null, alreadyExists: true })
      }
      
      return NextResponse.json({ 
        error: error.message || 'Database error creating new user',
        details: error
      }, { status: 400 })
    }

    // Optionally mirror role/name into a public profiles table if it exists
    try {
      if (data.user) {
        const { error: profileError } = await supabaseAdmin.from('profiles').insert({
          id: data.user.id,
          display_name: name ?? data.user.email?.split('@')[0] ?? 'User',
          user_role: 'user',
        })
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Log the error but don't fail the registration
          console.warn('User created but profile creation failed:', profileError.message)
        }
      }
    } catch (error) {
      console.error('Unexpected error creating profile:', error)
      // Log the error but don't fail the registration
      console.warn('User created but profile creation failed:', error)
    }

    return NextResponse.json({ user: data.user })
  } catch (e: unknown) {
    console.error('Register API error:', e)
    const error = e as Error
    return NextResponse.json({ 
      error: error.message ?? 'Unexpected error',
      stack: error.stack,
      type: error.constructor.name
    }, { status: 500 })
  }
}


