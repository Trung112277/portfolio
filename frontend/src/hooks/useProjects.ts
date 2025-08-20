import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { PROJECTS_DATA } from '@/data/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error loading projects from localStorage:', error);
      }
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(p => p.id === projectId ? { ...p, ...updates } : p)
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === projectId ? { ...p, isActive: false } : p
      )
    );
  };

  const toggleProjectActive = (projectId: string) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === projectId ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  const resetToDefault = () => {
    setProjects(PROJECTS_DATA);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectActive,
    resetToDefault
  };
}
