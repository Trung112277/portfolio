import { useEffect, useState } from 'react'
import { ProjectsService } from '@/services/projects.service'
import { Database } from '@/types/database'
import { useProjectsDbStore } from '@/stores/projects-db-store'
import { supabase } from '@/lib/supabase-client'

type Project = Database['public']['Tables']['projects']['Row']

export function useProjects() {
  const { projects, setProjects, addProject, updateProject: applyUpdate, removeProject } = useProjectsDbStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await ProjectsService.getAll()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    })()
  }, [setProjects])

  // Realtime (enable bảng `projects` trong Realtime trên Supabase)
  useEffect(() => {
    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'projects' }, (payload) => {
        addProject(payload.new as Project)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'projects' }, (payload) => {
        applyUpdate((payload.new as Project).id, payload.new as Partial<Project>)
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'projects' }, (payload) => {
        removeProject((payload.old as Project).id)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [addProject, applyUpdate, removeProject])

  const createProject = async (input: Database['public']['Tables']['projects']['Insert']) => {
    const created = await ProjectsService.create(input)
    addProject(created) // optimistic: đã có SELECT trả record nên thêm ngay
    return created
  }

  const updateProject = async (id: number, updates: Database['public']['Tables']['projects']['Update']) => {
    const updated = await ProjectsService.update(id, updates)
    applyUpdate(id, updated)
    return updated
  }

  const deleteProject = async (id: number) => {
    await ProjectsService.delete(id)
    removeProject(id)
  }

  return { projects, loading, error, createProject, updateProject, deleteProject, refetch: async () => {
    const data = await ProjectsService.getAll()
    setProjects(data)
  }}
}