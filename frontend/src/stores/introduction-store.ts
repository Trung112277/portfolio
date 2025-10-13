import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IntroductionService } from '@/services/introduction.service';

export interface IntroductionState {
  // Data
  introduction: string;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean; // Track if data has been loaded at least once
  isCurrentlyLoading: boolean; // Track if currently loading to prevent duplicate calls
  
  // Actions
  loadIntroduction: () => Promise<void>;
  updateIntroduction: (introduction: string) => Promise<void>;
  setIntroduction: (introduction: string) => void;
  clearError: () => void;
  
  // Realtime sync
  syncWithRealtime: (introduction: string) => void;
  resetInitialization: () => void;
  forceReload: () => Promise<void>;
  forceLoadIntroduction: () => Promise<void>;
}

export const useIntroductionStore = create<IntroductionState>()(
  persist(
    (set) => ({
      // Initial state
      introduction: '',
      isLoading: false,
      error: null,
      isInitialized: false,
      isCurrentlyLoading: false,
      
      // Actions
      loadIntroduction: async () => {
        // Prevent duplicate calls only if currently loading
        const state = useIntroductionStore.getState();
        
        if (state.isCurrentlyLoading) {
          return;
        }

        // If already initialized and has data, don't reload unless forced
        if (state.isInitialized && state.introduction && state.introduction.trim() !== '') {
          return;
        }

        set({ isLoading: true, error: null, isCurrentlyLoading: true });
        
         try {
           const introductionData = await IntroductionService.get();
           
           if (introductionData?.content) {
             set({ 
               introduction: introductionData.content, 
               isLoading: false, 
               isInitialized: true,
               isCurrentlyLoading: false
             });
           } else {
             set({ isLoading: false, isInitialized: true, isCurrentlyLoading: false });
           }
         } catch (error) {
           console.error('Error loading introduction:', error);
           set({ 
             error: 'Failed to load introduction', 
             isLoading: false,
             isInitialized: true,
             isCurrentlyLoading: false
           });
         }
      },
      
      updateIntroduction: async (introduction: string) => {
        set({ isLoading: true, error: null });
        
         try {
           await IntroductionService.update({ content: introduction });
           set({ 
             introduction, 
             isLoading: false, 
             isInitialized: true 
           });
         } catch (error) {
           console.error('Error updating introduction:', error);
           set({ 
             error: 'Failed to update introduction', 
             isLoading: false 
           });
         }
      },
      
      setIntroduction: (introduction: string) => {
        set({ introduction });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      // Realtime sync method
      syncWithRealtime: (introduction: string) => {
        set({ 
          introduction, 
          isLoading: false, 
          error: null, 
          isInitialized: true 
        });
      },
      
      // Force reload with loading state
      forceReload: async () => {
        set({ isLoading: true, error: null, isCurrentlyLoading: true });
        try {
          const introductionData = await IntroductionService.get();
          if (introductionData?.content) {
            set({ 
              introduction: introductionData.content, 
              isLoading: false, 
              isInitialized: true,
              isCurrentlyLoading: false
            });
          } else {
            set({ isLoading: false, isInitialized: true, isCurrentlyLoading: false });
          }
        } catch (error) {
          console.error('Error loading introduction:', error);
          set({ 
            error: 'Failed to load introduction', 
            isLoading: false,
            isInitialized: true,
            isCurrentlyLoading: false
          });
        }
      },
      
      // Reset initialization state
      resetInitialization: () => {
        set({ isInitialized: false, isCurrentlyLoading: false });
      },

      // Force load introduction (bypass cache)
      forceLoadIntroduction: async () => {
        set({ isLoading: true, error: null, isCurrentlyLoading: true });
        
        try {
          const introductionData = await IntroductionService.get();
          if (introductionData?.content) {
            set({ 
              introduction: introductionData.content, 
              isLoading: false, 
              isInitialized: true,
              isCurrentlyLoading: false
            });
          } else {
            set({ isLoading: false, isInitialized: true, isCurrentlyLoading: false });
          }
        } catch (error) {
          console.error('Error loading introduction:', error);
          set({ 
            error: 'Failed to load introduction', 
            isLoading: false,
            isInitialized: true,
            isCurrentlyLoading: false
          });
        }
      },
    }),
    {
      name: 'introduction-storage',
      partialize: (state) => ({
        introduction: state.introduction,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
