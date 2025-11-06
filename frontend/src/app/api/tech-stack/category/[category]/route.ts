import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const { data: techStack, error } = await supabase
      .from('tech_stack')
      .select('*')
      .eq('category', category)
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
    console.error('Error fetching tech stack by category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tech stack by category' },
      { status: 500 }
    )
  }
}
