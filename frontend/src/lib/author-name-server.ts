import { createClient } from '@supabase/supabase-js';

/**
 * Server-side function to get author name directly from Supabase
 * Used for generating metadata - always fetches fresh data
 * No caching to ensure real-time updates
 */
export async function getAuthorNameServerSide(): Promise<string> {

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      console.warn('Missing Supabase environment variables');
      return 'Developer';
    }

    const supabase = createClient(url, anonKey);
    
    const { data: authorName, error } = await supabase
      .from('author_name')
      .select('name')
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
