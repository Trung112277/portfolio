// frontend/src/services/projects.service.ts
import { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export class ProjectsService {
  static async getAll(): Promise<Project[]> {
    const response = await fetch('/api/projects')
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch projects')
    }
    
    return data.projects
  }

  static async getById(id: number): Promise<Project | null> {
    const response = await fetch(`/api/projects/${id}`)
    const data = await response.json()
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(data.error || 'Failed to fetch project')
    }
    
    return data.project
  }

  static async create(project: ProjectInsert): Promise<Project> {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create project')
    }
    
    return data.project
  }

  static async update(id: number, updates: ProjectUpdate): Promise<Project> {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update project')
    }
    
    return data.project
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to delete project')
    }
  }
}