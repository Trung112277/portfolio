import { Database } from '@/types/database'

type AuthorName = Database['public']['Tables']['author_name']['Row']
type AuthorNameInsert = Database['public']['Tables']['author_name']['Insert']
type AuthorNameUpdate = Database['public']['Tables']['author_name']['Update']

// Cache for API calls to prevent duplicate requests
let authorNameCache: Promise<AuthorName | null> | null = null;

export class AuthorNameService {
  static async get(): Promise<AuthorName | null> {
    // If there's already a pending request, return the same promise
    if (authorNameCache) {
      return authorNameCache;
    }

    authorNameCache = fetch('/api/author-name', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch author name')
      }
      
      const data = await response.json()
      return data.authorName;
    })
    .finally(() => {
      // Clear cache after request completes (success or error)
      authorNameCache = null;
    });

    return authorNameCache;
  }

  static async create(authorName: AuthorNameInsert): Promise<AuthorName> {
    const response = await fetch('/api/author-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorName),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create author name')
    }
    
    const data = await response.json()
    return data.authorName
  }

  static async update(updates: AuthorNameUpdate): Promise<AuthorName> {
    const response = await fetch('/api/author-name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update author name')
    }
    
    const data = await response.json()
    return data.authorName
  }
}