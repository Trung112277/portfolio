import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabase = createClient(url, anonKey)

export async function GET() {
  try {
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
      { error: 'Failed to fetch author name' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
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
      { error: 'Failed to create/update author name' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
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
      { error: 'Failed to update author name' },
      { status: 500 }
    )
  }
}
