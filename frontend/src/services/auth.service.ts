import { supabase } from '@/lib/supabase-client'
import { UserProfileService } from './user-profile.service'
import { UserWithRole } from '@/types/user-roles'

export const AuthService = {
  async signUp({ email, password, name }: { email: string; password: string; name?: string }) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Register failed')
    return json
  },

  async signIn({ email, password, rememberMe }: { email: string; password: string; rememberMe?: boolean }) {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password
    })
    
    if (error) throw error
    
    // Cấu hình session persistence dựa trên Remember me
    if (rememberMe) {
      // Lưu thông tin remember me
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('userEmail', email);
      
      // Clear temporary session flag
      sessionStorage.removeItem('supabase-temporary-session');
    } else {
      // Không lưu thông tin remember me
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userEmail');
      
      // Set flag để đánh dấu session tạm thời
      sessionStorage.setItem('supabase-temporary-session', 'true');
    }
    
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Xóa thông tin remember me khi logout
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userEmail');
    
    // Clear OAuth toast flag
    sessionStorage.removeItem('oauth-toast-shown');
    
    // Clear temporary session flag
    sessionStorage.removeItem('supabase-temporary-session');
    
    // Clear all Supabase auth data from both storages
    const authKeys = [
      'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token',
      'supabase.auth.token'
    ];
    
    authKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  },

  async getUser() {
    try {
      // First try to get the current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        throw sessionError
      }
      
      // If we have a session, return the user
      if (sessionData.session?.user) {
        return sessionData.session.user
      }
      
      // If no session, try to get user directly
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        // If it's a session missing error, return null instead of throwing
        if (error.message?.includes('Auth session missing')) {
          return null
        }
        throw error
      }
      return data.user
    } catch (error: unknown) {
      // Handle session missing error gracefully
      if (error instanceof Error && error.message.includes('Auth session missing')) {
        return null
      }
      throw error
    }
  },

  async getUserWithRole(): Promise<UserWithRole | null> {
    try {
      const user = await this.getUser()
      if (!user) return null

      const userWithRole = await UserProfileService.getUserWithRole(user.id)
      return userWithRole
    } catch {
      return null
    }
  },

  async isAdmin(): Promise<boolean> {
    try {
      const userWithRole = await this.getUserWithRole()
      return userWithRole?.profile?.user_role === 'admin'
    } catch {
      return false
    }
  },

  // OAuth Login Methods
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        skipBrowserRedirect: false,
      }
    })
    if (error) throw error
    return data
  },

  async signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        skipBrowserRedirect: false,
      }
    })
    if (error) throw error
    return data
  },

  // Handle OAuth callback and session refresh
  async handleAuthCallback() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        // Don't throw for session missing - it's normal when not logged in
        if (error.message?.includes('Auth session missing')) {
          return { session: null, user: null }
        }
        throw error
      }
      return data
    } catch (error: unknown) {
      // Handle session missing error gracefully
      if (error instanceof Error && error.message.includes('Auth session missing')) {
        return { session: null, user: null }
      }
      throw error
    }
  },

  // Refresh session if needed
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession()
    if (error) {
      // If refresh fails, clear the session
      await this.signOut()
      throw error
    }
    return data
  },
}