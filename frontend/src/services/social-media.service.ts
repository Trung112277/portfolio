import { Database } from '@/types/database'
import { supabase } from '@/lib/supabase-client'

type SocialMedia = Database['public']['Tables']['social_media']['Row']
type SocialMediaInsert = Database['public']['Tables']['social_media']['Insert']
type SocialMediaUpdate = Database['public']['Tables']['social_media']['Update']

export class SocialMediaService {
  static async getAll(): Promise<SocialMedia[]> {
    try {
      const response = await fetch('/api/social-media', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.socialMedia
    } catch (error) {
      console.error('Error fetching social media:', error)
      throw error
    }
  }

  static async create(social: SocialMediaInsert): Promise<SocialMedia> {
    try {
      // Get the current session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(social),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 403) {
          throw new Error('You do not have permission to create social media. Only admin can perform this action.');
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.socialMedia
    } catch (error) {
      console.error('Error creating social media:', error)
      throw error
    }
  }

  static async update(id: number, updates: SocialMediaUpdate): Promise<SocialMedia> {
    try {
      // Get the current session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const response = await fetch(`/api/social-media/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 403) {
          throw new Error('You do not have permission to update social media. Only admin can perform this action.');
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.socialMedia
    } catch (error) {
      console.error('Error updating social media:', error)
      throw error
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      // Get the current session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const response = await fetch(`/api/social-media/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 403) {
          throw new Error('You do not have permission to delete social media. Only admin can perform this action.');
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error deleting social media:', error)
      throw error
    }
  }
}