// frontend/src/services/tech-stack.service.ts
import { Database } from '@/types/database'

type TechStack = Database['public']['Tables']['tech_stack']['Row']
type TechStackInsert = Database['public']['Tables']['tech_stack']['Insert']
type TechStackUpdate = Database['public']['Tables']['tech_stack']['Update']

export class TechStackService {
  static async getAll(): Promise<TechStack[]> {
    const response = await fetch('/api/tech-stack')
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch tech stack')
    }
    
    return data.techStack
  }

  static async getByCategory(category: string): Promise<TechStack[]> {
    const response = await fetch(`/api/tech-stack/category/${category}`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || `Failed to fetch ${category} tech stack`)
    }
    
    return data.techStack
  }

  static async create(tech: TechStackInsert): Promise<TechStack> {
    // Validate required fields
    if (!tech.name || !tech.category) {
      throw new Error('Name and category are required')
    }

    const response = await fetch('/api/tech-stack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tech),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create tech stack')
    }
    
    return data.tech
  }

  static async update(id: number, updates: TechStackUpdate): Promise<TechStack> {
    const response = await fetch(`/api/tech-stack/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update tech stack')
    }
    
    return data.tech
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`/api/tech-stack/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to delete tech stack')
    }
  }
}