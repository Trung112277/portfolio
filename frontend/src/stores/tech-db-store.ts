import { create } from 'zustand';
import { Database } from '@/types/database';

type TechStack = Database['public']['Tables']['tech_stack']['Row'];

interface TechDbState {
  // Data by category
  frontendTech: TechStack[];
  backendTech: TechStack[];
  databaseTech: TechStack[];
  devopsTech: TechStack[];
  allTech: TechStack[];
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Actions
  setTechByCategory: (category: string, tech: TechStack[]) => void;
  setAllTech: (tech: TechStack[]) => void;
  addTech: (tech: TechStack) => void;
  updateTech: (id: number, updates: Partial<TechStack>) => void;
  deleteTech: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Getters
  getTechByCategory: (category: string) => TechStack[];
  getAllTech: () => TechStack[];
}

export const useTechDbStore = create<TechDbState>((set, get) => ({
  // Initial state
  frontendTech: [],
  backendTech: [],
  databaseTech: [],
  devopsTech: [],
  allTech: [],
  loading: true, // Start with loading = true
  error: null,
  
  // Actions
  setTechByCategory: (category: string, tech: TechStack[]) => {
    set((state) => ({
      ...state,
      [category.toLowerCase() + 'Tech']: tech,
    }));
  },
  
  setAllTech: (tech: TechStack[]) => {
    // Group by category
    const frontend = tech.filter(t => t.category === 'frontend');
    const backend = tech.filter(t => t.category === 'backend');
    const database = tech.filter(t => t.category === 'database');
    const devops = tech.filter(t => t.category === 'devops');
    
    set({
      allTech: tech,
      frontendTech: frontend,
      backendTech: backend,
      databaseTech: database,
      devopsTech: devops,
    });
  },
  
  addTech: (tech: TechStack) => {
    set((state) => {
      console.log('Store addTech called:', { tech, category: tech.category });
      
      // Check if tech already exists to prevent duplicates
      const existingTech = state.allTech.find(t => t.id === tech.id);
      if (existingTech) {
        console.log('Tech already exists, skipping add');
        return state; // Don't add if already exists
      }
      
      const newAllTech = [tech, ...state.allTech];
      const categoryKey = tech.category.toLowerCase() + 'Tech' as keyof TechDbState;
      const newCategoryTech = [tech, ...(state[categoryKey] as TechStack[])];
      
      console.log('Adding tech to store:', { categoryKey, newCategoryTech: newCategoryTech.length });
      
      return {
        ...state,
        allTech: newAllTech,
        [categoryKey]: newCategoryTech,
      };
    });
  },
  
  updateTech: (id: number, updates: Partial<TechStack>) => {
    set((state) => {
      console.log('Store updateTech called:', { id, updates });
      
      const updateInArray = (arr: TechStack[]) => 
        arr.map(t => t.id === id ? { ...t, ...updates } : t);
      
      const updatedAllTech = updateInArray(state.allTech);
      
      // If category changed, we need to move the item between category arrays
      const oldItem = state.allTech.find(t => t.id === id);
      const newItem = { ...oldItem, ...updates } as TechStack;
      
      if (oldItem) {
        console.log('Category change:', { old: oldItem.category, new: newItem.category });
      }
      
      if (oldItem && newItem.category !== oldItem.category) {
        // Remove from old category and add to new category
        const removeFromArray = (arr: TechStack[]) => 
          arr.filter(t => t.id !== id);
        
        const addToArray = (arr: TechStack[]) => 
          [newItem, ...arr];
        
        // Update all category arrays
        const frontend = oldItem.category === 'frontend' 
          ? removeFromArray(state.frontendTech)
          : newItem.category === 'frontend' 
            ? addToArray(state.frontendTech)
            : updateInArray(state.frontendTech);
            
        const backend = oldItem.category === 'backend' 
          ? removeFromArray(state.backendTech)
          : newItem.category === 'backend' 
            ? addToArray(state.backendTech)
            : updateInArray(state.backendTech);
            
        const database = oldItem.category === 'database' 
          ? removeFromArray(state.databaseTech)
          : newItem.category === 'database' 
            ? addToArray(state.databaseTech)
            : updateInArray(state.databaseTech);
            
        const devops = oldItem.category === 'devops' 
          ? removeFromArray(state.devopsTech)
          : newItem.category === 'devops' 
            ? addToArray(state.devopsTech)
            : updateInArray(state.devopsTech);
        
        
        return {
          ...state,
          allTech: updatedAllTech,
          frontendTech: frontend,
          backendTech: backend,
          databaseTech: database,
          devopsTech: devops,
        };
      } else {
        // No category change, just update all arrays
        console.log('No category change, updating all arrays');
        const frontend = updateInArray(state.frontendTech);
        const backend = updateInArray(state.backendTech);
        const database = updateInArray(state.databaseTech);
        const devops = updateInArray(state.devopsTech);
        
        return {
          ...state,
          allTech: updatedAllTech,
          frontendTech: frontend,
          backendTech: backend,
          databaseTech: database,
          devopsTech: devops,
        };
      }
    });
  },
  
  deleteTech: (id: number) => {
    set((state) => {
      const removeFromArray = (arr: TechStack[]) => 
        arr.filter(t => t.id !== id);
      
      const updatedAllTech = removeFromArray(state.allTech);
      const frontend = removeFromArray(state.frontendTech);
      const backend = removeFromArray(state.backendTech);
      const database = removeFromArray(state.databaseTech);
      const devops = removeFromArray(state.devopsTech);
      
      return {
        ...state,
        allTech: updatedAllTech,
        frontendTech: frontend,
        backendTech: backend,
        databaseTech: database,
        devopsTech: devops,
      };
    });
  },
  
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  
  // Getters
  getTechByCategory: (category: string) => {
    const state = get();
    const categoryKey = category.toLowerCase() + 'Tech' as keyof TechDbState;
    return (state[categoryKey] as TechStack[]) || [];
  },
  
  getAllTech: () => get().allTech,
}));
