import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      // Display name on Supabase UI reads from user_metadata.full_name
      user_metadata: name ? { name, full_name: name, role: 'user' } : { role: 'user' },
      app_metadata: { role: 'user' },
    })

    if (error) {
      // If the email is already registered in this Supabase project, return 200 to avoid client error
      if (typeof error.message === 'string' && error.message.toLowerCase().includes('already been registered')) {
        return NextResponse.json({ user: null, alreadyExists: true })
      }
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Optionally mirror role/name into a public profiles table if it exists
    try {
      if (data.user) {
        await supabaseAdmin.from('profiles').insert({
          id: data.user.id,
          role: 'user',
          name: name ?? null,
        })
      }
    } catch (_) {
      // ignore if table doesn't exist
    }

    return NextResponse.json({ user: data.user })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({ error: error.message ?? 'Unexpected error' }, { status: 500 })
  }
}


