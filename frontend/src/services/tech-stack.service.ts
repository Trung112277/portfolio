// frontend/src/services/tech-stack.service.ts
import { supabase } from '@/lib/supabase-client'
import { Database } from '@/types/database'
import { AuthService } from './auth.service'

type TechStack = Database['public']['Tables']['tech_stack']['Row']
type TechStackInsert = Database['public']['Tables']['tech_stack']['Insert']
type TechStackUpdate = Database['public']['Tables']['tech_stack']['Update']

export class TechStackService {
  /**
   * Check if user is authenticated before performing operations
   */
  private static async checkAuth(): Promise<void> {
    const user = await AuthService.getUser()
    if (!user) {
      throw new Error('Authentication required. Please log in to perform this action.')
    }
  }

  static async getAll(): Promise<TechStack[]> {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Get all tech stack error:', error)
      throw new Error(`Failed to fetch tech stack: ${error.message}`)
    }
    return data || []
  }

  static async getByCategory(category: string): Promise<TechStack[]> {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Get tech stack by category error:', error)
      throw new Error(`Failed to fetch ${category} tech stack: ${error.message}`)
    }
    return data || []
  }

  static async create(tech: TechStackInsert): Promise<TechStack> {
    try {
      // Check authentication
      await this.checkAuth()

      // Validate required fields
      if (!tech.name || !tech.category) {
        throw new Error('Name and category are required')
      }

      const { data, error } = await supabase
        .from('tech_stack')
        .insert({
          ...tech,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) {
        console.error('Create tech stack error:', error)
        
        // Handle specific RLS errors
        if (error.message.includes('row-level security policy')) {
          throw new Error('You do not have permission to create tech stack items. Please check your account permissions.')
        }
        
        if (error.message.includes('duplicate key')) {
          throw new Error('A tech stack item with this name already exists.')
        }
        
        throw new Error(`Failed to create tech stack: ${error.message}`)
      }
      
      return data
    } catch (error) {
      console.error('Tech stack creation failed:', error)
      throw error
    }
  }

  static async update(id: number, updates: TechStackUpdate): Promise<TechStack> {
    try {
      // Check authentication
      await this.checkAuth()

      const { data, error } = await supabase
        .from('tech_stack')
        .update({ 
          ...updates, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Update tech stack error:', error)
        
        if (error.message.includes('row-level security policy')) {
          throw new Error('You do not have permission to update this tech stack item.')
        }
        
        throw new Error(`Failed to update tech stack: ${error.message}`)
      }
      
      return data
    } catch (error) {
      console.error('Tech stack update failed:', error)
      throw error
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      // Check authentication
      await this.checkAuth()

      const { error } = await supabase
        .from('tech_stack')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Delete tech stack error:', error)
        
        if (error.message.includes('row-level security policy')) {
          throw new Error('You do not have permission to delete this tech stack item.')
        }
        
        throw new Error(`Failed to delete tech stack: ${error.message}`)
      }
    } catch (error) {
      console.error('Tech stack deletion failed:', error)
      throw error
    }
  }
}