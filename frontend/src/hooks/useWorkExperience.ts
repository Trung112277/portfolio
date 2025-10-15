import { useEffect, useState, useRef } from 'react'
import { WorkExperienceService } from '@/services/work-experience.service'
import { Database } from '@/types/database'
import { useWorkExperienceDbStore } from '@/stores/work-experience-db-store'
import { supabase } from '@/lib/supabase-client'

type WorkExperience = Database['public']['Tables']['work_experience']['Row']

// Global flag to prevent multiple API calls
let isWorkExperiencesLoading = false
let workExperiencesRealtimeSetup = false

// Function to reset global flags
export function resetWorkExperiencesFlags() {
  isWorkExperiencesLoading = false
  workExperiencesRealtimeSetup = false
}

export function useWorkExperience() {
  const { workExperiences, setWorkExperiences } = useWorkExperienceDbStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)
  const hasLoadedRef = useRef(false)
  const setWorkExperiencesRef = useRef(setWorkExperiences)
  setWorkExperiencesRef.current = setWorkExperiences

  useEffect(() => {
    isMountedRef.current = true
    // Always show loading when component mounts
    setLoading(true)
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    // If we already have data, show it immediately but still show loading briefly
    if (workExperiences.length > 0 && !isWorkExperiencesLoading) {
      // Show loading for a brief moment to indicate component is mounting
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }, 100) // Brief loading state
      return () => clearTimeout(timer)
    }

    // Prevent duplicate API calls only if already loading
    if (isWorkExperiencesLoading) {
      return
    }

    isWorkExperiencesLoading = true
    hasLoadedRef.current = true
    
    ;(async () => {
      try {
        if (isMountedRef.current) {
          setLoading(true)
          setError(null)
        }
        
        const data = await WorkExperienceService.getAll()
        
        if (isMountedRef.current) {
          setWorkExperiencesRef.current(data)
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to load work experiences')
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
        isWorkExperiencesLoading = false
      }
    })()
  }, [workExperiences.length])

  // Realtime (enable bảng `work_experience` trong Realtime trên Supabase)
  useEffect(() => {
    // Prevent duplicate realtime setup
    if (workExperiencesRealtimeSetup) {
      return
    }

    workExperiencesRealtimeSetup = true
    
    const channel = supabase
      .channel('work-experiences-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'work_experience' }, (payload) => {
        // Get fresh store functions inside the callback
        const { addWorkExperience: addWorkExperienceFresh } = useWorkExperienceDbStore.getState()
        addWorkExperienceFresh(payload.new as WorkExperience)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'work_experience' }, (payload) => {
        // Get fresh store functions inside the callback
        const { updateWorkExperience: updateWorkExperienceFresh } = useWorkExperienceDbStore.getState()
        updateWorkExperienceFresh((payload.new as WorkExperience).id, payload.new as Partial<WorkExperience>)
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'work_experience' }, (payload) => {
        // Get fresh store functions inside the callback
        const { removeWorkExperience: removeWorkExperienceFresh } = useWorkExperienceDbStore.getState()
        removeWorkExperienceFresh((payload.old as WorkExperience).id)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
      workExperiencesRealtimeSetup = false
    }
  }, []) // Empty dependency array to run only once

  const createWorkExperience = async (input: Database['public']['Tables']['work_experience']['Insert']) => {
    const created = await WorkExperienceService.create(input)
    // Note: Work experience will be added via realtime subscription, no need for optimistic update
    return created
  }

  const updateWorkExperience = async (id: string, updates: Database['public']['Tables']['work_experience']['Update']) => {
    const updated = await WorkExperienceService.update(id, updates)
    // Note: Work experience will be updated via realtime subscription, no need for optimistic update
    return updated
  }

  const deleteWorkExperience = async (id: string) => {
    await WorkExperienceService.delete(id)
    // Note: Work experience will be removed via realtime subscription, no need for optimistic update
  }

  return { 
    workExperiences, 
    loading, 
    error, 
    createWorkExperience, 
    updateWorkExperience, 
    deleteWorkExperience, 
    refetch: async () => {
      isWorkExperiencesLoading = false
      hasLoadedRef.current = false
      setLoading(true)
      try {
        const data = await WorkExperienceService.getAll()
        setWorkExperiences(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load work experiences')
      } finally {
        setLoading(false)
      }
    }
  }
}
