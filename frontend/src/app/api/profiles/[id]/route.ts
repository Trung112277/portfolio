import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';
import { Database } from '@/types/database';
import { verifyAdminAuth } from '@/lib/auth-helper';

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();
    if (!authResult.success) {
      return authResult.error!;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
      }
      // console.error('Error fetching profile:', error);
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    // console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();
    if (!authResult.success) {
      return authResult.error!;
    }

    const body: ProfileUpdate = await request.json();
    
    const { data, error } = await supabase
      .from('profiles')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      // console.error('Error updating profile:', error);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    // console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth();
    if (!authResult.success) {
      return authResult.error!;
    }

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', params.id);

    if (error) {
      // console.error('Error deleting profile:', error);
      return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile deleted successfully' });
  } catch {
    // console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
