import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';
import { Database } from '@/types/database';

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProfileInsert = await request.json();
    
    const { data, error } = await supabase
      .from('profiles')
      .insert(body)
      .select()
      .single();

    if (error) {
      // console.error('Error creating profile:', error);
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
