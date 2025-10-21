import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '@/services/auth.service';
import { UserWithRole } from '@/types/user-roles';

interface UserRoleState {
  userWithRole: UserWithRole | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  isAdmin: boolean;
  isUser: boolean;
  userRole: string | null;
  
  // Actions
  setUserWithRole: (user: UserWithRole | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchUserRole: () => Promise<void>;
  clearUserRole: () => void;
  refetch: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export const useUserRoleStore = create<UserRoleState>()(
  persist(
    (set, get) => ({
      userWithRole: null,
      loading: false,
      error: null,
      lastFetched: null,
      isAdmin: false,
      isUser: false,
      userRole: null,

      setUserWithRole: (user) => {
        const userRole = user?.profile?.user_role;
        const isAdmin = userRole === 'admin';
        const isUser = userRole === 'user' || (!userRole && !!user); // Default to user if no role but has user
        
        set({
          userWithRole: user,
          isAdmin,
          isUser,
          userRole: userRole || (user ? 'user' : null),
          lastFetched: Date.now(),
        });
      },

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      fetchUserRole: async () => {
        const state = get();
        
        // Check if we have cached data and it's still valid
        if (
          state.userWithRole && 
          state.lastFetched && 
          (Date.now() - state.lastFetched) < CACHE_DURATION
        ) {
          return;
        }

        // Prevent duplicate requests
        if (state.loading) {
          return;
        }

        try {
          set({ loading: true, error: null });
          
          const user = await AuthService.getUserWithRole();
          
          const userRole = user?.profile?.user_role;
          const isAdmin = userRole === 'admin';
          const isUser = userRole === 'user' || (!userRole && !!user); // Default to user if no role but has user
          
          set({
            userWithRole: user,
            isAdmin,
            isUser,
            userRole: userRole || (user ? 'user' : null),
            lastFetched: Date.now(),
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch user role',
            loading: false,
          });
        }
      },

      clearUserRole: () => {
        set({
          userWithRole: null,
          loading: false,
          error: null,
          lastFetched: null,
          isAdmin: false,
          isUser: false,
          userRole: null,
        });
      },

      refetch: async () => {
        set({ lastFetched: null }); // Force refresh
        await get().fetchUserRole();
      },

      // Force clear cache and refetch
      forceRefresh: async () => {
        set({ 
          lastFetched: null,
          userWithRole: null,
          isAdmin: false,
          isUser: false,
          userRole: null,
          error: null
        });
        await get().fetchUserRole();
      },
    }),
    {
      name: 'user-role-storage',
      partialize: (state) => ({
        userWithRole: state.userWithRole,
        lastFetched: state.lastFetched,
        isAdmin: state.isAdmin,
        isUser: state.isUser,
        userRole: state.userRole,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUserRole = () => {
  const store = useUserRoleStore();
  return {
    userWithRole: store.userWithRole,
    loading: store.loading,
    error: store.error,
    isAdmin: store.isAdmin,
    isUser: store.isUser,
    userRole: store.userRole,
    refetch: store.refetch,
  };
};

export const useUserRoleActions = () => {
  const store = useUserRoleStore();
  return {
    fetchUserRole: store.fetchUserRole,
    clearUserRole: store.clearUserRole,
    setUserWithRole: store.setUserWithRole,
    forceRefresh: store.forceRefresh,
  };
};
