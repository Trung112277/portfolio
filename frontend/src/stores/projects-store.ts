import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/types/project';
import { validateProject } from '@/lib/validation';

export interface ProjectsState {
  // Projects data
  projects: Project[];
  filteredProjects: Project[];
  
  // UI state
  activeProject: string | null;
  hoveredProject: string | null;
  selectedCategory: string | 'all';
  
  // Filters
  searchQuery: string;
  categoryFilter: string[];
  
  // Actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  setActiveProject: (id: string | null) => void;
  setHoveredProject: (id: string | null) => void;
  setSelectedCategory: (category: string | 'all') => void;
  
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (categories: string[]) => void;
  
  // Computed actions
  filterProjects: () => void;
  getProjectById: (id: string) => Project | undefined;
  getActiveProjects: () => Project[];
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      // Initial state
      projects: [],
      filteredProjects: [],
      activeProject: null,
      hoveredProject: null,
      selectedCategory: 'all',
      searchQuery: '',
      categoryFilter: [],
      
      // Actions
      setProjects: (projects) => {
        set({ projects, filteredProjects: projects });
        get().filterProjects();
      },
      
      addProject: (project) => {
        const validation = validateProject(project);
        if (!validation.isValid) {
          console.error('Invalid project data:', validation.error);
          return;
        }
        
        const { projects } = get();
        const newProjects = [...projects, project];
        set({ projects: newProjects });
        get().filterProjects();
      },
      
      updateProject: (id, updates) => {
        const { projects } = get();
        const updatedProjects = projects.map(project =>
          project.id === id ? { ...project, ...updates } : project
        );
        set({ projects: updatedProjects });
        get().filterProjects();
      },
      
      deleteProject: (id) => {
        const { projects } = get();
        const filteredProjects = projects.filter(project => project.id !== id);
        set({ projects: filteredProjects });
        get().filterProjects();
      },
      
      setActiveProject: (id) => set({ activeProject: id }),
      setHoveredProject: (id) => set({ hoveredProject: id }),
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().filterProjects();
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterProjects();
      },
      
      setCategoryFilter: (categories) => {
        set({ categoryFilter: categories });
        get().filterProjects();
      },
      
      // Computed actions
      filterProjects: () => {
        const { projects, searchQuery, selectedCategory, categoryFilter } = get();
        
        let filtered = projects;
        
        // Search filter
        if (searchQuery) {
          filtered = filtered.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Category filter
        if (selectedCategory !== 'all') {
          filtered = filtered.filter(project => 
            project.category === selectedCategory
          );
        }
        
        // Multiple category filter
        if (categoryFilter.length > 0) {
          filtered = filtered.filter(project =>
            categoryFilter.some(cat => project.category === cat)
          );
        }
        
        set({ filteredProjects: filtered });
      },
      
      getProjectById: (id) => {
        const { projects } = get();
        return projects.find(project => project.id === id);
      },
      
      getActiveProjects: () => {
        const { projects } = get();
        return projects.filter(project => project.isActive);
      },
    }),
    {
      name: 'projects-storage',
      partialize: (state) => ({
        projects: state.projects,
        selectedCategory: state.selectedCategory,
        categoryFilter: state.categoryFilter,
      }),
    }
  )
);
