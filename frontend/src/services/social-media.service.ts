// frontend/src/services/social-media.service.ts
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type SocialMedia = Database['public']['Tables']['social_media']['Row']
type SocialMediaInsert = Database['public']['Tables']['social_media']['Insert']
type SocialMediaUpdate = Database['public']['Tables']['social_media']['Update']

export class SocialMediaService {
  static async getAll(): Promise<SocialMedia[]> {
    const { data, error } = await supabase
      .from('social_media')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async create(social: SocialMediaInsert): Promise<SocialMedia> {
    const { data, error } = await supabase
      .from('social_media')
      .insert(social)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async update(id: number, updates: SocialMediaUpdate): Promise<SocialMedia> {
    const { data, error } = await supabase
      .from('social_media')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('social_media')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}