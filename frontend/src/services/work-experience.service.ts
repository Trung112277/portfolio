import { Database } from '@/types/database'

type WorkExperience = Database['public']['Tables']['work_experience']['Row']
type WorkExperienceInsert = Database['public']['Tables']['work_experience']['Insert']
type WorkExperienceUpdate = Database['public']['Tables']['work_experience']['Update']

export class WorkExperienceService {
  static async getAll(): Promise<WorkExperience[]> {
    const response = await fetch('/api/work-experience')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  static async create(input: WorkExperienceInsert): Promise<WorkExperience> {
    const response = await fetch('/api/work-experience', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create work experience')
    }

    return response.json()
  }

  static async update(id: string, updates: WorkExperienceUpdate): Promise<WorkExperience> {
    const response = await fetch(`/api/work-experience/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update work experience')
    }

    return response.json()
  }

  static async delete(id: string): Promise<void> {
    const response = await fetch(`/api/work-experience/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete work experience')
    }
  }
}