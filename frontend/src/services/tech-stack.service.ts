// frontend/src/services/tech-stack.service.ts
import { supabase } from '@/lib/supabase-client'
import { Database } from '@/types/database'

type TechStack = Database['public']['Tables']['tech_stack']['Row']
type TechStackInsert = Database['public']['Tables']['tech_stack']['Insert']
type TechStackUpdate = Database['public']['Tables']['tech_stack']['Update']

export class TechStackService {
  static async getAll(): Promise<TechStack[]> {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async getByCategory(category: string): Promise<TechStack[]> {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async create(tech: TechStackInsert): Promise<TechStack> {
    const { data, error } = await supabase
      .from('tech_stack')
      .insert(tech)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async update(id: number, updates: TechStackUpdate): Promise<TechStack> {
    const { data, error } = await supabase
      .from('tech_stack')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('tech_stack')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}