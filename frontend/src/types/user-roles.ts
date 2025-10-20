export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  user_role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    display_name?: string;
  };
}

export interface UserWithRole extends AuthUser {
  profile?: UserProfile;
}
