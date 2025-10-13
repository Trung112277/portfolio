import { useEffect, useState, useRef } from 'react'
import { AuthorNameService } from '@/services/author-name.service'
import { Database } from '@/types/database'
import { useAuthorDbStore } from '@/stores/author-db-store'
import { supabase } from '@/lib/supabase-client'

type AuthorName = Database['public']['Tables']['author_name']['Row']

// Global flag to prevent multiple API calls
let isAuthorNameLoading = false
let authorNameRealtimeSetup = false

// Function to reset global flags
export function resetAuthorNameFlags() {
  isAuthorNameLoading = false
  authorNameRealtimeSetup = false
}

export function useAuthorName() {
  // Use selector to ensure re-renders when authorName changes
  const authorName = useAuthorDbStore((state) => state.authorName)
  const setAuthorName = useAuthorDbStore((state) => state.setAuthorName)
  const updateAuthorName = useAuthorDbStore((state) => state.updateAuthorName)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)
  const hasLoadedRef = useRef(false)
  const setAuthorNameRef = useRef(setAuthorName)
  setAuthorNameRef.current = setAuthorName


  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    // Prevent duplicate API calls
    if (isAuthorNameLoading || hasLoadedRef.current) {
      return
    }

    isAuthorNameLoading = true
    hasLoadedRef.current = true
    
    ;(async () => {
      try {
        if (isMountedRef.current) {
          setLoading(true)
          setError(null)
        }
        
        const data = await AuthorNameService.get()
        
        if (isMountedRef.current) {
          setAuthorNameRef.current(data)
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to load author name')
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
        isAuthorNameLoading = false
      }
    })()
  }, []) // Empty dependency array - only run once on mount

  // Realtime (enable bảng `author_name` trong Realtime trên Supabase)
  useEffect(() => {
    // Prevent duplicate realtime setup
    if (authorNameRealtimeSetup) {
      return
    }

    authorNameRealtimeSetup = true
    
    const channel = supabase
      .channel('author-name-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'author_name' }, (payload) => {
        // Get fresh store functions inside the callback
        const { setAuthorName: setAuthorNameFresh } = useAuthorDbStore.getState()
        setAuthorNameFresh(payload.new as AuthorName)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'author_name' }, (payload) => {
        // Get fresh store functions inside the callback
        const { updateAuthorName: updateAuthorNameFresh } = useAuthorDbStore.getState()
        updateAuthorNameFresh(payload.new as Partial<AuthorName>)
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'author_name' }, () => {
        // Get fresh store functions inside the callback
        const { setAuthorName: setAuthorNameFresh } = useAuthorDbStore.getState()
        setAuthorNameFresh(null)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
      authorNameRealtimeSetup = false
    }
  }, []) // Empty dependency array to run only once

  const updateAuthorNameAsync = async (updates: Database['public']['Tables']['author_name']['Update']) => {
    const updated = await AuthorNameService.update(updates)
    updateAuthorName(updated)
    return updated
  }

  // Use a separate state to ensure re-renders
  const [displayName, setDisplayName] = useState('')
  
  useEffect(() => {
    const newName = authorName?.name || ''
    setDisplayName(newName)
  }, [authorName])

  return { 
    authorName: displayName, 
    loading, 
    error, 
    updateAuthorName: updateAuthorNameAsync, 
    refetch: async () => {
      isAuthorNameLoading = false
      hasLoadedRef.current = false
      setLoading(true)
      try {
        const data = await AuthorNameService.get()
        setAuthorName(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load author name')
      } finally {
        setLoading(false)
      }
    }
  }
}

/**
 * Hook to get author name with loading state
 * Useful for components that need to wait for author name to load
 */
export function useAuthorNameWithLoading() {
  const { authorName, loading } = useAuthorName();
  return { authorName, isLoading: loading };
}
