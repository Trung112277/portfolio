// frontend/src/hooks/useProjects.ts
import { useState, useEffect } from 'react'
import { ProjectsService } from '@/services/projects.service'
import { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await ProjectsService.getAll()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (project: Database['public']['Tables']['projects']['Insert']) => {
    try {
      const newProject = await ProjectsService.create(project)
      setProjects(prev => [newProject, ...prev])
      return newProject
    } catch (err) {
      throw err
    }
  }

  const updateProject = async (id: number, updates: Database['public']['Tables']['projects']['Update']) => {
    try {
      const updatedProject = await ProjectsService.update(id, updates)
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p))
      return updatedProject
    } catch (err) {
      throw err
    }
  }

  const deleteProject = async (id: number) => {
    try {
      await ProjectsService.delete(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: loadProjects
  }
}