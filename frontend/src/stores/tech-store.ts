import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BaseTechStack, Socials } from '@/types/tech-stack';

export interface TechState {
  // Tech stack data
  frontendTech: BaseTechStack[];
  backendTech: BaseTechStack[];
  socials: Socials[];
  
  // UI state
  selectedTech: string | null;
  hoveredTech: string | null;
  selectedCategory: 'frontend' | 'backend' | 'socials' | 'all';
  
  // Filters
  searchQuery: string;
  skillLevelFilter: string[];
  
  // Actions
  setFrontendTech: (tech: BaseTechStack[]) => void;
  setBackendTech: (tech: BaseTechStack[]) => void;
  setSocials: (socials: Socials[]) => void;
  
  addFrontendTech: (tech: BaseTechStack) => void;
  addBackendTech: (tech: BaseTechStack) => void;
  addSocial: (social: Socials) => void;
  
  updateTech: (id: string, updates: Partial<BaseTechStack | Socials>) => void;
  deleteTech: (id: string) => void;
  
  setSelectedTech: (id: string | null) => void;
  setHoveredTech: (id: string | null) => void;
  setSelectedCategory: (category: 'frontend' | 'backend' | 'socials' | 'all') => void;
  
  setSearchQuery: (query: string) => void;
  setSkillLevelFilter: (levels: string[]) => void;
  
  // Computed actions
  getAllTech: () => (BaseTechStack | Socials)[];
  getTechById: (id: string) => (BaseTechStack | Socials) | undefined;
  getTechByCategory: (category: string) => (BaseTechStack | Socials)[];
  searchTech: (query: string) => (BaseTechStack | Socials)[];
}

export const useTechStore = create<TechState>()(
  persist(
    (set, get) => ({
      // Initial state
      frontendTech: [],
      backendTech: [],
      socials: [],
      selectedTech: null,
      hoveredTech: null,
      selectedCategory: 'all',
      searchQuery: '',
      skillLevelFilter: [],
      
      // Actions
      setFrontendTech: (tech) => set({ frontendTech: tech }),
      setBackendTech: (tech) => set({ backendTech: tech }),
      setSocials: (socials) => set({ socials }),
      
      addFrontendTech: (tech) => {
        const { frontendTech } = get();
        set({ frontendTech: [...frontendTech, tech] });
      },
      
      addBackendTech: (tech) => {
        const { backendTech } = get();
        set({ backendTech: [...backendTech, tech] });
      },
      
      addSocial: (social) => {
        const { socials } = get();
        set({ socials: [...socials, social] });
      },
      
      updateTech: (id, updates) => {
        const { frontendTech, backendTech, socials } = get();
        
        // Update in frontend tech
        const updatedFrontend = frontendTech.map(tech =>
          tech.id === id ? { ...tech, ...updates } : tech
        );
        
        // Update in backend tech
        const updatedBackend = backendTech.map(tech =>
          tech.id === id ? { ...tech, ...updates } : tech
        );
        
        // Update in socials
        const updatedSocials = socials.map(social =>
          social.id === id ? { ...social, ...updates } : social
        );
        
        set({ 
          frontendTech: updatedFrontend,
          backendTech: updatedBackend,
          socials: updatedSocials
        });
      },
      
      deleteTech: (id) => {
        const { frontendTech, backendTech, socials } = get();
        
        set({
          frontendTech: frontendTech.filter(tech => tech.id !== id),
          backendTech: backendTech.filter(tech => tech.id !== id),
          socials: socials.filter(social => social.id !== id)
        });
      },
      
      setSelectedTech: (id) => set({ selectedTech: id }),
      setHoveredTech: (id) => set({ hoveredTech: id }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSkillLevelFilter: (levels) => set({ skillLevelFilter: levels }),
      
      // Computed actions
      getAllTech: () => {
        const { frontendTech, backendTech, socials } = get();
        return [...frontendTech, ...backendTech, ...socials];
      },
      
      getTechById: (id) => {
        const { frontendTech, backendTech, socials } = get();
        return [...frontendTech, ...backendTech, ...socials]
          .find(tech => tech.id === id);
      },
      
      getTechByCategory: (category) => {
        const { frontendTech, backendTech, socials } = get();
        
        switch (category) {
          case 'frontend':
            return frontendTech;
          case 'backend':
            return backendTech;
          case 'socials':
            return socials;
          default:
            return [...frontendTech, ...backendTech, ...socials];
        }
      },
      
      searchTech: (query) => {
        const allTech = get().getAllTech();
        return allTech.filter(tech =>
          tech.name.toLowerCase().includes(query.toLowerCase())
        );
      },
    }),
    {
      name: 'tech-storage',
      partialize: (state) => ({
        frontendTech: state.frontendTech,
        backendTech: state.backendTech,
        socials: state.socials,
        selectedCategory: state.selectedCategory,
        skillLevelFilter: state.skillLevelFilter,
      }),
    }
  )
);
