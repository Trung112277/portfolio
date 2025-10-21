import { useEffect } from 'react';
import { useUserRole as useUserRoleStore, useUserRoleActions } from '@/stores/user-role-store';
import { UserRole } from '@/types/user-roles';

export function useUserRole() {
  const store = useUserRoleStore();
  const { fetchUserRole } = useUserRoleActions();

  useEffect(() => {
    // Only fetch if we don't have data or it's stale
    if (!store.userWithRole && !store.loading) {
      fetchUserRole();
    }
  }, [store.userWithRole, store.loading, fetchUserRole]);

  const hasRole = (role: UserRole) => store.userWithRole?.profile?.user_role === role;

  return {
    userWithRole: store.userWithRole,
    loading: store.loading,
    error: store.error,
    isAdmin: store.isAdmin,
    isUser: store.isUser,
    hasRole,
    userRole: store.userRole,
    refetch: store.refetch,
  };
}
