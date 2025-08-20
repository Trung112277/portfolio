import { useEffect } from 'react';
import { useProjectsStore, useTechStore } from '@/stores';
import { PROJECTS_DATA } from '@/data/projects';
import { FRONTEND_TECH_STACK } from '@/constant/frontend-tech';

export function useInitializeStores() {
  const { setProjects } = useProjectsStore();
  const { setFrontendTech } = useTechStore();

  useEffect(() => {
    // Initialize projects store
    setProjects(PROJECTS_DATA);
    
    // Initialize tech store
    setFrontendTech(FRONTEND_TECH_STACK);
  }, [setProjects, setFrontendTech]);
}
