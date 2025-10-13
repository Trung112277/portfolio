import { Database } from '@/types/database'

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
      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(social),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
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
      const response = await fetch(`/api/social-media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
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
      const response = await fetch(`/api/social-media/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error deleting social media:', error)
      throw error
    }
  }
}