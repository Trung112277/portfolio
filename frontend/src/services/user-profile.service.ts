import { supabase } from '@/lib/supabase-client';
import { Database } from '@/types/database';
import { UserProfile, UserWithRole } from '@/types/user-roles';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export class UserProfileService {
  static async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }

    return data;
  }

  static async createProfile(profile: ProfileInsert): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserWithRole(userId?: string): Promise<UserWithRole | null> {
    try {
      // Get auth user
      const { data: authData, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authData.user) {
        return null;
      }

      // Use provided userId or current user's id
      const targetUserId = userId || authData.user.id;

      // Get profile
      const profile = await this.getProfile(targetUserId);
      
      return {
        ...authData.user,
        profile: profile || undefined,
      };
    } catch (error) {
      return null;
    }
  }

  static async getAllUsers(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateUserRole(userId: string, role: 'admin' | 'user'): Promise<Profile> {
    return this.updateProfile(userId, { user_role: role });
  }
}
