// frontend/src/services/introduction.service.ts
import { Database } from '@/types/database'
import { supabase } from '@/lib/supabase-client'

type Introduction = Database['public']['Tables']['introduction']['Row']
type IntroductionInsert = Database['public']['Tables']['introduction']['Insert']
type IntroductionUpdate = Database['public']['Tables']['introduction']['Update']

export class IntroductionService {
  static async get(): Promise<Introduction | null> {
    try {
      const response = await fetch('/api/introduction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.introduction
    } catch (error) {
      console.error('Error fetching introduction:', error)
      throw error
    }
  }

  static async create(intro: IntroductionInsert): Promise<Introduction> {
    try {
      // Get the current session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const response = await fetch('/api/introduction', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(intro),
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You do not have permission to create introduction. Only admin can perform this action.');
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.introduction
    } catch (error) {
      console.error('Error creating introduction:', error)
      throw error
    }
  }

  static async update(updates: IntroductionUpdate): Promise<Introduction> {
    try {
      // Get the current session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }

      const response = await fetch('/api/introduction', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You do not have permission to update introduction. Only admin can perform this action.');
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.introduction
    } catch (error) {
      console.error('Error updating introduction:', error)
      throw error
    }
  }
}