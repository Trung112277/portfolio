import { createClient } from '@supabase/supabase-js';

/**
 * Server-side function to get author name directly from Supabase
 * Used for generating metadata - always fetches fresh data
 * No caching to ensure real-time updates
 */
export async function getAuthorNameServerSide(): Promise<string> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Use service role key for server-side operations to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url) {
      console.warn('Missing NEXT_PUBLIC_SUPABASE_URL');
      return 'Developer';
    }

    // Prefer service role key for server-side operations, fallback to anon key
    const key = serviceRoleKey || anonKey;
    if (!key) {
      console.warn('Missing Supabase keys (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
      return 'Developer';
    }

    const supabase = createClient(url, key);
    
    // Query by singleton ID for better performance
    const singletonId = '00000000-0000-0000-0000-000000000001';
    
    const { data: authorName, error } = await supabase
      .from('author_name')
      .select('name')
      .eq('id', singletonId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching author name:', error);
      return 'Developer';
    }
    
    // Ensure we always return a valid string
    const name = authorName?.name;
    if (typeof name === 'string' && name.trim()) {
      return name.trim();
    }
    
    return 'Developer';
  } catch (error) {
    console.error('Error in getAuthorNameServerSide:', error);
    return 'Developer';
  }
}
