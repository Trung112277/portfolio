// frontend/src/hooks/useProjects.ts
import { useEffect, useState, useRef } from 'react'
import { ProjectsService } from '@/services/projects.service'
import { Database } from '@/types/database'
import { useProjectsDbStore } from '@/stores/projects-db-store'
import { supabase } from '@/lib/supabase-client'

type Project = Database['public']['Tables']['projects']['Row']

// Global flag to prevent multiple API calls
let isProjectsLoading = false
let projectsRealtimeSetup = false

// Function to reset global flags
export function resetProjectsFlags() {
  isProjectsLoading = false
  projectsRealtimeSetup = false
}

export function useProjects() {
  const { projects, setProjects, addProject, updateProject: applyUpdate, removeProject } = useProjectsDbStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)
  const hasLoadedRef = useRef(false)
  const setProjectsRef = useRef(setProjects)
  setProjectsRef.current = setProjects

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    // Prevent duplicate API calls
    if (isProjectsLoading || hasLoadedRef.current) {
      // If we already have data, set loading to false
      if (projects.length > 0) {
        setLoading(false)
      }
      return
    }

    isProjectsLoading = true
    hasLoadedRef.current = true
    
    ;(async () => {
      try {
        if (isMountedRef.current) {
          setLoading(true)
          setError(null)
        }
        
        const data = await ProjectsService.getAll()
        
        if (isMountedRef.current) {
          setProjectsRef.current(data)
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to load projects')
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
        isProjectsLoading = false
      }
    })()
  }, [projects.length])

  // Realtime (enable bảng `projects` trong Realtime trên Supabase)
  useEffect(() => {
    // Prevent duplicate realtime setup
    if (projectsRealtimeSetup) {
      return
    }

    projectsRealtimeSetup = true
    
    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'projects' }, (payload) => {
        // Get fresh store functions inside the callback
        const { addProject: addProjectFresh } = useProjectsDbStore.getState()
        addProjectFresh(payload.new as Project)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'projects' }, (payload) => {
        // Get fresh store functions inside the callback
        const { updateProject: updateProjectFresh } = useProjectsDbStore.getState()
        updateProjectFresh((payload.new as Project).id, payload.new as Partial<Project>)
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'projects' }, (payload) => {
        // Get fresh store functions inside the callback
        const { removeProject: removeProjectFresh } = useProjectsDbStore.getState()
        removeProjectFresh((payload.old as Project).id)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
      projectsRealtimeSetup = false
    }
  }, []) // Empty dependency array to run only once

  const createProject = async (input: Database['public']['Tables']['projects']['Insert']) => {
    const created = await ProjectsService.create(input)
    // Note: Project will be added via realtime subscription, no need for optimistic update
    return created
  }

  const updateProject = async (id: number, updates: Database['public']['Tables']['projects']['Update']) => {
    const updated = await ProjectsService.update(id, updates)
    // Note: Project will be updated via realtime subscription, no need for optimistic update
    return updated
  }

  const deleteProject = async (id: number) => {
    await ProjectsService.delete(id)
    // Note: Project will be removed via realtime subscription, no need for optimistic update
  }

  return { 
    projects, 
    loading, 
    error, 
    createProject, 
    updateProject, 
    deleteProject, 
    refetch: async () => {
      isProjectsLoading = false
      hasLoadedRef.current = false
      setLoading(true)
      try {
        const data = await ProjectsService.getAll()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
  }
}