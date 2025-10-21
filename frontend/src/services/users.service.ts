// frontend/src/services/users.service.ts
import { supabase } from '@/lib/supabase-server'
import { Database } from '@/types/database'
import { UserRole } from '@/types/user-roles'

type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// User type for the profiles table
export interface ProfileUser {
  id: string
  display_name: string
  email: string
  user_role: UserRole
  created_at: string
  updated_at: string
}

export class UsersService {
  // Get all users from profiles table
  static async getAll(): Promise<ProfileUser[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data || []
  }

  // Get user by ID from profiles table
  static async getById(id: string): Promise<ProfileUser | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  // Create new user in profiles table
  static async create(userData: { id: string; email: string; display_name: string; user_role?: UserRole }): Promise<ProfileUser> {
    const { id, email, display_name, user_role = 'user' } = userData
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id,
        email,
        display_name,
        user_role
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Update user role in profiles table
  static async updateRole(id: string, user_role: UserRole): Promise<ProfileUser> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        user_role,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Update user in profiles table
  static async updateUser(id: string, updates: { email?: string; display_name?: string; user_role?: UserRole }): Promise<ProfileUser> {
    const updateData: ProfileUpdate = {
      updated_at: new Date().toISOString()
    }
    
    if (updates.email) {
      updateData.email = updates.email
    }
    
    if (updates.display_name) {
      updateData.display_name = updates.display_name
    }
    
    if (updates.user_role) {
      updateData.user_role = updates.user_role
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Delete user from profiles table
  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
