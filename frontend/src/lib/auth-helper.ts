import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase-server';

export interface AuthResult {
  success: boolean;
  user?: Record<string, unknown>;
  profile?: {
    user_role: string;
    [key: string]: unknown;
  };
  error?: NextResponse;
}

export async function verifyAdminAuth(): Promise<AuthResult> {
  try {
    // Get the current user from the request headers
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        )
      };
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token and get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        )
      };
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        )
      };
    }

    // Check if user is admin
    if (profile.user_role !== 'admin') {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      };
    }

    return {
      success: true,
      user: user as unknown as Record<string, unknown>,
      profile
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return {
      success: false,
      error: NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    };
  }
}
