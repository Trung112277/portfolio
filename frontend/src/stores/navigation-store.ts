import { create } from 'zustand';

export interface NavigationState {
  // Current navigation state
  currentSection: string;
  previousSection: string;
  
  // Scroll state
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'none';
  isScrolling: boolean;
  
  // Navigation items
  sections: string[];
  activeSection: string;
  
  // Mobile navigation
  isMobileMenuOpen: boolean;
  isSidebarOpen: boolean;
  
  // Actions
  setCurrentSection: (section: string) => void;
  setScrollY: (y: number) => void;
  setScrollDirection: (direction: 'up' | 'down' | 'none') => void;
  setIsScrolling: (scrolling: boolean) => void;
  setActiveSection: (section: string) => void;
  toggleMobileMenu: () => void;
  toggleSidebar: () => void;
  closeMobileMenu: () => void;
  closeSidebar: () => void;
  
  // Navigation helpers
  goToSection: (section: string) => void;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  isSectionVisible: (section: string) => boolean;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  // Initial state
  currentSection: 'home',
  previousSection: 'home',
  scrollY: 0,
  scrollDirection: 'none',
  isScrolling: false,
  sections: ['home', 'about', 'tech', 'projects', 'contact'],
  activeSection: 'home',
  isMobileMenuOpen: false,
  isSidebarOpen: false,
  
  // Actions
  setCurrentSection: (section) => {
    const { currentSection } = get();
    set({ 
      previousSection: currentSection,
      currentSection: section 
    });
  },
  
  setScrollY: (y) => {
    const { scrollY } = get();
    const direction = y > scrollY ? 'down' : y < scrollY ? 'up' : 'none';
    
    set({ 
      scrollY: y,
      scrollDirection: direction
    });
  },
  
  setScrollDirection: (direction) => set({ scrollDirection: direction }),
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),
  setActiveSection: (section) => set({ activeSection: section }),
  
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  
  toggleSidebar: () => set((state) => ({ 
    isSidebarOpen: !state.isSidebarOpen 
  })),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  
  // Navigation helpers
  goToSection: (section) => {
    const { sections } = get();
    if (sections.includes(section)) {
      get().setCurrentSection(section);
      
      // Scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  },
  
  goToNextSection: () => {
    const { sections, currentSection } = get();
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSection = sections[nextIndex];
    
    get().goToSection(nextSection);
  },
  
  goToPreviousSection: () => {
    const { sections, currentSection } = get();
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    const prevSection = sections[prevIndex];
    
    get().goToSection(prevSection);
  },
  
  isSectionVisible: (section) => {
    const { currentSection } = get();
    return currentSection === section;
  },
}));
