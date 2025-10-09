import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function GET() {
  try {
    const { data: techStack, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ techStack })
  } catch (error) {
    console.error('Error fetching tech stack:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tech stack' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const techData = await request.json()
    
    const { data: tech, error } = await supabase
      .from('tech_stack')
      .insert(techData)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ tech })
  } catch (error) {
    console.error('Error creating tech:', error)
    return NextResponse.json(
      { error: 'Failed to create tech' },
      { status: 500 }
    )
  }
}
