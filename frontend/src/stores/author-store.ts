import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthorNameService } from '@/services/author-name.service';
import { useAuthorDbStore } from './author-db-store';

export interface AuthorState {
  // State
  authorName: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadAuthorName: () => Promise<void>;
  updateAuthorName: (name: string) => Promise<void>;
  setAuthorName: (name: string) => void;
  clearError: () => void;
  syncWithDbStore: () => void;
}

export const useAuthorStore = create<AuthorState>()(
  persist(
    (set) => ({
      // Initial state
      authorName: '', // Default fallback
      isLoading: false,
      error: null,
      
      // Actions
      loadAuthorName: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const authorData = await AuthorNameService.get();
          if (authorData?.name) {
            set({ authorName: authorData.name, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error loading author name:', error);
          set({ 
            error: 'Failed to load author name', 
            isLoading: false 
          });
        }
      },
      
      updateAuthorName: async (name: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthorNameService.update({ name });
          set({ authorName: name, isLoading: false });
        } catch (error) {
          console.error('Error updating author name:', error);
          set({ 
            error: 'Failed to update author name', 
            isLoading: false 
          });
        }
      },
      
      setAuthorName: (name: string) => {
        set({ authorName: name });
      },
      
      clearError: () => {
        set({ error: null });
      },

      // Sync with database store for realtime updates
      syncWithDbStore: () => {
        const dbAuthorName = useAuthorDbStore.getState().authorName;
        if (dbAuthorName?.name) {
          set({ authorName: dbAuthorName.name });
        }
      },
    }),
    {
      name: 'author-storage',
      partialize: (state) => ({
        authorName: state.authorName,
      }),
    }
  )
);

// Subscribe to database store changes for realtime updates
let isSubscribed = false;

if (!isSubscribed) {
  isSubscribed = true;
  useAuthorDbStore.subscribe((state) => {
    if (state.authorName?.name) {
      // Use setState to trigger re-renders
      useAuthorStore.setState({ authorName: state.authorName.name });
    }
  });
}
