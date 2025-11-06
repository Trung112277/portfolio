import { Database } from '@/types/database'
import { supabase } from '@/lib/supabase-client'

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
    // Get the current session token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    const response = await fetch('/api/work-experience', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const errorData = await response.json()
      if (response.status === 403) {
        throw new Error('You do not have permission to create a new work experience. Only admin can perform this action.');
      }
      throw new Error(errorData.error || 'Failed to create work experience')
    }

    return response.json()
  }

  static async update(id: string, updates: WorkExperienceUpdate): Promise<WorkExperience> {
    // Get the current session token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    const response = await fetch(`/api/work-experience/${id}`, {
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
        throw new Error('You do not have permission to update work experience. Only admin can perform this action.');
      }
      throw new Error(errorData.error || 'Failed to update work experience')
    }

    return response.json()
  }

  static async delete(id: string): Promise<void> {
    // Get the current session token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    const response = await fetch(`/api/work-experience/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      if (response.status === 403) {
        throw new Error('You do not have permission to delete work experience. Only admin can perform this action.');
      }
      throw new Error(errorData.error || 'Failed to delete work experience')
    }
  }
}