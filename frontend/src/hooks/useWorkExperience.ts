import { useState, useEffect } from 'react';
import { Database } from '@/types/database';

type WorkExperience = Database['public']['Tables']['work_experience']['Row'];
type WorkExperienceInsert = Database['public']['Tables']['work_experience']['Insert'];
type WorkExperienceUpdate = Database['public']['Tables']['work_experience']['Update'];

// Global state to prevent multiple API calls
let globalWorkExperiences: WorkExperience[] = [];
let globalLoading = true;
let globalError: string | null = null;
let hasFetched = false;
let isFetching = false;
let fetchPromise: Promise<void> | null = null;
let isInitialized = false;

// Listeners for state changes
const stateChangeListeners: (() => void)[] = [];

// Function to notify all listeners
const notifyStateChange = () => {
  stateChangeListeners.forEach(listener => listener());
};

// Global fetch function
const globalFetchWorkExperiences = async (): Promise<void> => {
  if (hasFetched) {
    return;
  }

  if (isFetching && fetchPromise) {
    await fetchPromise;
    return;
  }

  // Prevent multiple initializations
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  isFetching = true;
  fetchPromise = (async () => {
    try {
      const response = await fetch('/api/work-experience');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      globalWorkExperiences = data;
      globalLoading = false;
      globalError = null;
      hasFetched = true;
      
      // Notify all listeners about state change
      notifyStateChange();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch work experiences";
      globalError = errorMessage;
      globalLoading = false;
      
      // Notify all listeners about state change
      notifyStateChange();
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
  })();

  await fetchPromise;
};

// Don't auto-initialize, let the first component trigger it

export function useWorkExperience() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(globalWorkExperiences);
  const [loading, setLoading] = useState(globalLoading);
  const [error, setError] = useState<string | null>(globalError);

  // Function to update local state from global state
  const updateLocalState = () => {
    setWorkExperiences(globalWorkExperiences);
    setLoading(globalLoading);
    setError(globalError);
  };

  // Fetch all work experiences
  const fetchWorkExperiences = async () => {
    await globalFetchWorkExperiences();
    setWorkExperiences(globalWorkExperiences);
    setLoading(globalLoading);
    setError(globalError);
  };

  // Create new work experience
  const createWorkExperience = async (work: WorkExperienceInsert) => {
    try {
      setError(null);
      
      const response = await fetch('/api/work-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(work),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create work experience');
      }

      const newWork = await response.json();
      const updatedWorkExperiences = [newWork, ...globalWorkExperiences];
      globalWorkExperiences = updatedWorkExperiences;
      setWorkExperiences(updatedWorkExperiences);
      
      // Notify all listeners
      notifyStateChange();
      return newWork;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create work experience";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Update work experience
  const updateWorkExperience = async (id: string, updates: WorkExperienceUpdate) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/work-experience/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update work experience');
      }

      const updatedWork = await response.json();
      const updatedWorkExperiences = globalWorkExperiences.map(work => 
        work.id === id ? updatedWork : work
      );
      globalWorkExperiences = updatedWorkExperiences;
      setWorkExperiences(updatedWorkExperiences);
      
      // Notify all listeners
      notifyStateChange();
      return updatedWork;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update work experience";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Delete work experience
  const deleteWorkExperience = async (id: string) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/work-experience/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete work experience');
      }

      const updatedWorkExperiences = globalWorkExperiences.filter(work => work.id !== id);
      globalWorkExperiences = updatedWorkExperiences;
      setWorkExperiences(updatedWorkExperiences);
      
      // Notify all listeners
      notifyStateChange();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete work experience";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Load work experiences on mount
  useEffect(() => {
    // Add listener for state changes
    stateChangeListeners.push(updateLocalState);
    
    // Trigger global fetch if not already done
    if (!hasFetched && !isFetching) {
      fetchWorkExperiences();
    } else {
      // Just update local state
      updateLocalState();
    }

    // Cleanup listener on unmount
    return () => {
      const index = stateChangeListeners.indexOf(updateLocalState);
      if (index > -1) {
        stateChangeListeners.splice(index, 1);
      }
    };
  }, []);

  return {
    workExperiences,
    loading,
    error,
    fetchWorkExperiences,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
  };
}
