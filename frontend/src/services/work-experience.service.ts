// frontend/src/services/work-experience.service.ts
import { supabase } from '@/lib/supabase-client'
import { Database } from '@/types/database'

type WorkExperience = Database['public']['Tables']['work_experience']['Row']
type WorkExperienceInsert = Database['public']['Tables']['work_experience']['Insert']
type WorkExperienceUpdate = Database['public']['Tables']['work_experience']['Update']

export class WorkExperienceService {
  static async getAll(): Promise<WorkExperience[]> {
    const { data, error } = await supabase
      .from('work_experience')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async create(work: WorkExperienceInsert): Promise<WorkExperience> {
    const { data, error } = await supabase
      .from('work_experience')
      .insert(work)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async update(id: number, updates: WorkExperienceUpdate): Promise<WorkExperience> {
    const { data, error } = await supabase
      .from('work_experience')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('work_experience')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}