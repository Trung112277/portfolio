import { create } from 'zustand'
import { Database } from '@/types/database'

type WorkExperience = Database['public']['Tables']['work_experience']['Row']

type State = {
  workExperiences: WorkExperience[]
  setWorkExperiences: (list: WorkExperience[]) => void
  addWorkExperience: (we: WorkExperience) => void
  updateWorkExperience: (id: string, updates: Partial<WorkExperience>) => void
  removeWorkExperience: (id: string) => void
}

export const useWorkExperienceDbStore = create<State>((set) => ({
  workExperiences: [],
  setWorkExperiences: (list) => set({ workExperiences: list }),
  addWorkExperience: (we) => set((s) => ({ workExperiences: [we, ...s.workExperiences] })),
  updateWorkExperience: (id, updates) =>
    set((s) => ({ workExperiences: s.workExperiences.map(we => we.id === id ? { ...we, ...updates } : we) })),
  removeWorkExperience: (id) =>
    set((s) => ({ workExperiences: s.workExperiences.filter(we => we.id !== id) })),
}))
