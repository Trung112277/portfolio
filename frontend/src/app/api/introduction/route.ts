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
    const { data: introduction, error } = await supabase
      .from('introduction')
      .select('*')
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ introduction })
  } catch (error) {
    console.error('Error fetching introduction:', error)
    return NextResponse.json(
      { error: 'Failed to fetch introduction' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const introductionData = await request.json()
    
    const { data: introduction, error } = await supabase
      .from('introduction')
      .insert(introductionData)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ introduction })
  } catch (error) {
    console.error('Error creating introduction:', error)
    return NextResponse.json(
      { error: 'Failed to create introduction' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const introductionData = await request.json()
    
    const { data: introduction, error } = await supabase
      .from('introduction')
      .upsert({ ...introductionData, updated_at: new Date().toISOString() })
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ introduction })
  } catch (error) {
    console.error('Error updating introduction:', error)
    return NextResponse.json(
      { error: 'Failed to update introduction' },
      { status: 500 }
    )
  }
}
