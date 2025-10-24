// frontend/src/services/projects.service.ts
import { Database } from '@/types/database'
import { supabase } from '@/lib/supabase-client'

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
    // Get the current session token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('You do not have permission to create a new project. Only admin can perform this action.');
      }
      throw new Error(data.error || 'Failed to create project')
    }
    
    return data.project
  }

  static async update(id: number, updates: ProjectUpdate): Promise<Project> {
    // Get the current session token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    const response = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Bạn không có quyền chỉnh sửa dự án. Chỉ admin mới có thể thực hiện.');
      }
      throw new Error(data.error || 'Failed to update project')
    }
    
    return data.project
  }

  static async delete(id: number): Promise<void> {
    // Get the current session token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    })
    
    if (!response.ok) {
      const data = await response.json()
      if (response.status === 403) {
        throw new Error('Bạn không có quyền xóa dự án. Chỉ admin mới có thể thực hiện.');
      }
      throw new Error(data.error || 'Failed to delete project')
    }
  }
}