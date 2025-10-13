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
  
  // Actions
  loadIntroduction: () => Promise<void>;
  updateIntroduction: (introduction: string) => Promise<void>;
  setIntroduction: (introduction: string) => void;
  clearError: () => void;
  
  // Realtime sync
  syncWithRealtime: (introduction: string) => void;
  resetInitialization: () => void;
}

export const useIntroductionStore = create<IntroductionState>()(
  persist(
    (set, get) => ({
      // Initial state
      introduction: '',
      isLoading: false,
      error: null,
      isInitialized: false,
      
      // Actions
      loadIntroduction: async () => {
        const { isInitialized } = get();
        
        // Skip loading if already initialized and not in error state
        if (isInitialized && !get().error) {
          return;
        }
        
        set({ isLoading: true, error: null });
        
         try {
           const introductionData = await IntroductionService.get();
           if (introductionData?.content) {
             set({ 
               introduction: introductionData.content, 
               isLoading: false, 
               isInitialized: true 
             });
           } else {
             set({ isLoading: false, isInitialized: true });
           }
         } catch (error) {
           console.error('Error loading introduction:', error);
           set({ 
             error: 'Failed to load introduction', 
             isLoading: false,
             isInitialized: true
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
      
      // Reset initialization state
      resetInitialization: () => {
        set({ isInitialized: false });
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
