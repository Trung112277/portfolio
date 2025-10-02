// frontend/src/services/introduction.service.ts
import { supabase } from '@/lib/supabase-client'
import { Database } from '@/types/database'

type Introduction = Database['public']['Tables']['introduction']['Row']
type IntroductionInsert = Database['public']['Tables']['introduction']['Insert']
type IntroductionUpdate = Database['public']['Tables']['introduction']['Update']

export class IntroductionService {
  static async get(): Promise<Introduction | null> {
    const { data, error } = await supabase
      .from('introduction')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  }

  static async create(intro: IntroductionInsert): Promise<Introduction> {
    const { data, error } = await supabase
      .from('introduction')
      .insert(intro)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async update(updates: IntroductionUpdate): Promise<Introduction> {
    const { data, error } = await supabase
      .from('introduction')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}