import { create } from 'zustand';
import { Database } from '@/types/database';

type SocialMedia = Database['public']['Tables']['social_media']['Row'];

interface SocialMediaDbState {
  socialMedia: SocialMedia[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setSocialMedia: (socialMedia: SocialMedia[]) => void;
  addSocialMedia: (social: SocialMedia) => void;
  updateSocialMedia: (id: number, updates: Partial<SocialMedia>) => void;
  deleteSocialMedia: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSocialMediaDbStore = create<SocialMediaDbState>((set, get) => ({
  // Initial state
  socialMedia: [],
  loading: true,
  error: null,
  
  // Actions
  setSocialMedia: (socialMedia) => set({ socialMedia }),
  
  addSocialMedia: (social) => {
    set((state) => {
      // Check if social media already exists to prevent duplicates
      const existingSocial = state.socialMedia.find(s => s.id === social.id);
      if (existingSocial) {
        return state; // Don't add if already exists
      }
      
      return {
        ...state,
        socialMedia: [social, ...state.socialMedia],
      };
    });
  },
  
  updateSocialMedia: (id, updates) => {
    set((state) => ({
      ...state,
      socialMedia: state.socialMedia.map(social =>
        social.id === id ? { ...social, ...updates } : social
      ),
    }));
  },
  
  deleteSocialMedia: (id) => {
    set((state) => ({
      ...state,
      socialMedia: state.socialMedia.filter(social => social.id !== id),
    }));
  },
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
