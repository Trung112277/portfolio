import { create } from 'zustand'
import { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

type State = {
  projects: Project[]
  setProjects: (list: Project[]) => void
  addProject: (p: Project) => void
  updateProject: (id: number, updates: Partial<Project>) => void
  removeProject: (id: number) => void
}

export const useProjectsDbStore = create<State>((set) => ({
  projects: [],
  setProjects: (list) => set({ projects: list }),
  addProject: (p) => set((s) => ({ projects: [p, ...s.projects] })),
  updateProject: (id, updates) =>
    set((s) => ({ projects: s.projects.map(p => p.id === id ? { ...p, ...updates } : p) })),
  removeProject: (id) =>
    set((s) => ({ projects: s.projects.filter(p => p.id !== id) })),
}))