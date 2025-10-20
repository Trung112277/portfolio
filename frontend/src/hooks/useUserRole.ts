import { useEffect, useState } from 'react';
import { AuthService } from '@/services/auth.service';
import { UserWithRole, UserRole } from '@/types/user-roles';

export function useUserRole() {
  const [userWithRole, setUserWithRole] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const user = await AuthService.getUserWithRole();
        setUserWithRole(user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user role');
        setUserWithRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const isAdmin = userWithRole?.profile?.user_role === 'admin';
  const isUser = userWithRole?.profile?.user_role === 'user';
  const hasRole = (role: UserRole) => userWithRole?.profile?.user_role === role;
  
  // Default to 'user' role if no profile exists but user is authenticated
  const userRole = userWithRole?.profile?.user_role || (userWithRole ? 'user' : null);

  return {
    userWithRole,
    loading,
    error,
    isAdmin,
    isUser,
    hasRole,
    userRole,
    refetch: async () => {
      try {
        setLoading(true);
        const user = await AuthService.getUserWithRole();
        setUserWithRole(user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user role');
      } finally {
        setLoading(false);
      }
    }
  };
}
