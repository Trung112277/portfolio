import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { supabase } from '@/lib/supabase-server'
import { Database } from '@/types/database'

type SocialMediaUpdate = Database['public']['Tables']['social_media']['Update']

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the current user from the request headers
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the token and get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Check if user is admin
    if (profile.user_role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid social media ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { image_url, description, link, color } = body

    const updateData: Partial<SocialMediaUpdate> = {}
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the current user from the request headers
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the token and get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Check if user is admin
    if (profile.user_role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam)
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
