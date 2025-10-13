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
    const { data: socialMedia, error } = await supabase
      .from('social_media')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ socialMedia })
  } catch (error) {
    console.error('Error fetching social media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image_url, description, link, color } = body

    if (!image_url || !description || !link || !color) {
      return NextResponse.json(
        { error: 'Missing required fields: image_url, description, link, color' },
        { status: 400 }
      )
    }

    const { data: socialMedia, error } = await supabase
      .from('social_media')
      .insert({
        image_url,
        description,
        link,
        color,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ socialMedia }, { status: 201 })
  } catch (error) {
    console.error('Error creating social media:', error)
    return NextResponse.json(
      { error: 'Failed to create social media' },
      { status: 500 }
    )
  }
}
