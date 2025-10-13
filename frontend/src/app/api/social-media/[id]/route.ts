import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabase = createClient(url, anonKey)

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid social media ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { image_url, description, link, color } = body

    const updateData: any = {}
    if (image_url !== undefined) updateData.image_url = image_url
    if (description !== undefined) updateData.description = description
    if (link !== undefined) updateData.link = link
    if (color !== undefined) updateData.color = color

    const { data: socialMedia, error } = await supabase
      .from('social_media')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }

    if (!socialMedia) {
      return NextResponse.json(
        { error: 'Social media not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ socialMedia })
  } catch (error) {
    console.error('Error updating social media:', error)
    return NextResponse.json(
      { error: 'Failed to update social media' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid social media ID' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('social_media')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting social media:', error)
    return NextResponse.json(
      { error: 'Failed to delete social media' },
      { status: 500 }
    )
  }
}
