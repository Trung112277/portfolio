import { useEffect } from 'react';
import { useWorkExperienceStore } from '@/stores/work-experience-store';

export function useWorkExperience() {
  const {
    workExperiences,
    loading,
    error,
    hasLoaded,
    fetchWorkExperiences: storeFetchWorkExperiences,
    createWorkExperience,
    updateWorkExperienceById,
    deleteWorkExperienceById,
  } = useWorkExperienceStore();

  // Load work experiences on mount only if not already loaded
  useEffect(() => {
    if (!hasLoaded && !loading) {
      storeFetchWorkExperiences();
    }
  }, [hasLoaded, loading, storeFetchWorkExperiences]);

  return {
    workExperiences,
    loading,
    error,
    fetchWorkExperiences: storeFetchWorkExperiences,
    createWorkExperience,
    updateWorkExperience: updateWorkExperienceById,
    deleteWorkExperience: deleteWorkExperienceById,
  };
}
