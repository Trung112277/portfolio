import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UIState {
  // Cursor effects
  cursorEnabled: boolean;
  cursorSize: number;
  cursorTrailEnabled: boolean;
  
  // Animations
  animationsEnabled: boolean;
  reducedMotion: boolean;
  
  // UI interactions
  isScrolling: boolean;
  currentSection: string;
  
  // Actions
  toggleCursor: () => void;
  setCursorSize: (size: number) => void;
  toggleCursorTrail: () => void;
  toggleAnimations: () => void;
  setReducedMotion: (reduced: boolean) => void;
  setScrolling: (scrolling: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      cursorEnabled: true,
      cursorSize: 24,
      cursorTrailEnabled: true,
      animationsEnabled: true,
      reducedMotion: false,
      isScrolling: false,
      currentSection: 'home',
      
      // Actions
      toggleCursor: () => set((state) => ({ 
        cursorEnabled: !state.cursorEnabled 
      })),
      
      setCursorSize: (size) => set({ cursorSize: size }),
      
      toggleCursorTrail: () => set((state) => ({ 
        cursorTrailEnabled: !state.cursorTrailEnabled 
      })),
      
      toggleAnimations: () => set((state) => ({ 
        animationsEnabled: !state.animationsEnabled 
      })),
      
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      
      setScrolling: (scrolling) => set({ isScrolling: scrolling }),
      
      setCurrentSection: (section) => set({ currentSection: section }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        cursorEnabled: state.cursorEnabled,
        cursorSize: state.cursorSize,
        cursorTrailEnabled: state.cursorTrailEnabled,
        animationsEnabled: state.animationsEnabled,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);
