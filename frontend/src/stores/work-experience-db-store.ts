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
  addWorkExperience: (we) => {
    set((s) => {
      // Check if work experience already exists to prevent duplicates
      const existing = s.workExperiences.find(w => w.id === we.id)
      if (existing) {
        console.log('Work experience already exists, skipping add:', we.id)
        return s // Don't add if already exists
      }
      console.log('Adding work experience:', we.id)
      return { workExperiences: [we, ...s.workExperiences] }
    })
  },
  updateWorkExperience: (id, updates) => {
    set((s) => {
      console.log('Updating work experience:', id, updates)
      const updated = s.workExperiences.map(we => 
        we.id === id ? { ...we, ...updates } : we
      )
      return { workExperiences: updated }
    })
  },
  removeWorkExperience: (id) => {
    set((s) => {
      console.log('Removing work experience:', id)
      return { workExperiences: s.workExperiences.filter(we => we.id !== id) }
    })
  },
}))
