import { create } from 'zustand';
import { Database } from '@/types/database';

type WorkExperience = Database['public']['Tables']['work_experience']['Row'];
type WorkExperienceInsert = Database['public']['Tables']['work_experience']['Insert'];
type WorkExperienceUpdate = Database['public']['Tables']['work_experience']['Update'];

interface WorkExperienceStore {
  workExperiences: WorkExperience[];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean; // Add flag to track if data has been loaded
  setWorkExperiences: (experiences: WorkExperience[]) => void;
  addWorkExperience: (experience: WorkExperience) => void;
  updateWorkExperience: (id: string, updatedExperience: WorkExperience) => void;
  removeWorkExperience: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchWorkExperiences: () => Promise<void>;
  createWorkExperience: (work: WorkExperienceInsert) => Promise<WorkExperience>;
  updateWorkExperienceById: (id: string, updates: WorkExperienceUpdate) => Promise<WorkExperience>;
  deleteWorkExperienceById: (id: string) => Promise<void>;
}

export const useWorkExperienceStore = create<WorkExperienceStore>((set, get) => ({
  workExperiences: [],
  loading: false,
  error: null,
  hasLoaded: false,

  setWorkExperiences: (experiences) => set({ workExperiences: experiences }),
  
  addWorkExperience: (experience) => set((state) => ({
    workExperiences: [experience, ...state.workExperiences]
  })),
  
  updateWorkExperience: (id, updatedExperience) => set((state) => ({
    workExperiences: state.workExperiences.map((exp) =>
      exp.id === id ? updatedExperience : exp
    )
  })),
  
  removeWorkExperience: (id) => set((state) => ({
    workExperiences: state.workExperiences.filter((exp) => exp.id !== id)
  })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchWorkExperiences: async () => {
    const state = get();
    if (state.loading || state.hasLoaded) return; // Prevent multiple simultaneous fetches and redundant calls
    
    try {
      set({ loading: true, error: null });
      
      const response = await fetch('/api/work-experience');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      set({ workExperiences: data, loading: false, error: null, hasLoaded: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch work experiences";
      set({ error: errorMessage, loading: false });
    }
  },

  createWorkExperience: async (work) => {
    try {
      set({ loading: true, error: null });
      
      const response = await fetch('/api/work-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(work),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create work experience');
      }

      const newWork = await response.json();
      get().addWorkExperience(newWork);
      set({ loading: false });
      return newWork;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create work experience";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateWorkExperienceById: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      
      const response = await fetch(`/api/work-experience/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update work experience');
      }

      const updatedWork = await response.json();
      get().updateWorkExperience(id, updatedWork);
      set({ loading: false });
      return updatedWork;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update work experience";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteWorkExperienceById: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const response = await fetch(`/api/work-experience/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete work experience');
      }

      get().removeWorkExperience(id);
      set({ loading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete work experience";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
