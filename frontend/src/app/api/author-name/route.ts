import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Helper function to create Supabase client with error handling
function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL - please set up your Supabase environment variables')
  }

  const key = serviceRoleKey || anonKey
  if (!key) {
    throw new Error('Missing Supabase keys (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY) - please set up your Supabase environment variables')
  }

  return createClient(url, key)
}

export async function GET() {
  try {
    const supabase = createSupabaseClient()
    
    const { data: authorName, error } = await supabase
      .from('author_name')
      .select('*')
      .maybeSingle()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ authorName })
  } catch (error) {
    console.error('Error fetching author name:', error)
    return NextResponse.json(
      { error: 'Failed to fetch author name: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseClient()
    const authorData = await request.json()
    
    const { data: authorName, error } = await supabase
      .from('author_name')
      .upsert(authorData)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ authorName })
  } catch (error) {
    console.error('Error creating/updating author name:', error)
    return NextResponse.json(
      { error: 'Failed to create/update author name: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createSupabaseClient()
    const authorData = await request.json()
    
    const { data: authorName, error } = await supabase
      .from('author_name')
      .upsert({ ...authorData, updated_at: new Date().toISOString() })
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ authorName })
  } catch (error) {
    console.error('Error updating author name:', error)
    return NextResponse.json(
      { error: 'Failed to update author name: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
