import { create } from 'zustand'
import { Database } from '@/types/database'

type AuthorName = Database['public']['Tables']['author_name']['Row']

type State = {
  authorName: AuthorName | null
  setAuthorName: (authorName: AuthorName | null) => void
  updateAuthorName: (updates: Partial<AuthorName>) => void
}

export const useAuthorDbStore = create<State>((set) => ({
  authorName: null,
  setAuthorName: (authorName) => set({ authorName }),
  updateAuthorName: (updates) =>
    set((s) => ({ 
      authorName: s.authorName ? { ...s.authorName, ...updates } : null 
    })),
}))