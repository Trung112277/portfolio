// frontend/src/services/introduction.service.ts
import { Database } from '@/types/database'

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
      const response = await fetch('/api/introduction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(intro),
      })

      if (!response.ok) {
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
      const response = await fetch('/api/introduction', {
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
      return result.introduction
    } catch (error) {
      console.error('Error updating introduction:', error)
      throw error
    }
  }
}