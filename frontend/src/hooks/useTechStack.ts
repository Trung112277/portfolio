// frontend/src/hooks/useTechStack.ts
import { useEffect, useCallback, useRef } from "react";
import { TechStackService } from "@/services/tech-stack.service";
import { Database } from "@/types/database";
import { useTechDbStore } from "@/stores/tech-db-store";

// Global flags to prevent duplicate API calls
let isTechLoading = false

// Function to reset global flags
export function resetTechFlags() {
  isTechLoading = false
}

export function useTechStack(category?: string) {
  const isMountedRef = useRef(true);
  const hasLoadedRef = useRef(false);
  
  const {
    frontendTech,
    backendTech,
    databaseTech,
    devopsTech,
    allTech,
    loading,
    error,
    addTech,
    updateTech: updateTechInStore,
    deleteTech: deleteTechFromStore,
    setTechByCategory,
    setAllTech,
    setLoading,
    setError,
  } = useTechDbStore();

  // Get tech stack based on category
  const techStack = category 
    ? (category === 'frontend' ? frontendTech :
       category === 'backend' ? backendTech :
       category === 'database' ? databaseTech :
       category === 'devops' ? devopsTech : [])
    : allTech;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadTechStack = useCallback(async () => {
    // Prevent duplicate API calls
    if (isTechLoading || hasLoadedRef.current) {
      return;
    }

    isTechLoading = true;
    hasLoadedRef.current = true;

    try {
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }
      
      const data = category
        ? await TechStackService.getByCategory(category)
        : await TechStackService.getAll();
      
      if (isMountedRef.current) {
        if (category) {
          setTechByCategory(category, data);
        } else {
          setAllTech(data);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load tech stack";
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
      isTechLoading = false;
    }
  }, [category, setTechByCategory, setAllTech, setLoading, setError]);

  useEffect(() => {
    loadTechStack();
  }, [loadTechStack]);

  const createTech = async (
    tech: Database["public"]["Tables"]["tech_stack"]["Insert"]
  ) => {
    try {
      const newTech = await TechStackService.create(tech);
      addTech(newTech);
      return newTech;
    } catch (err) {
      throw err;
    }
  };

  const updateTech = async (
    id: number,
    updates: Database["public"]["Tables"]["tech_stack"]["Update"]
  ) => {
    try {
      const updatedTech = await TechStackService.update(id, updates);
      updateTechInStore(id, updatedTech);
      return updatedTech;
    } catch (err) {
      throw err;
    }
  };

  const deleteTech = async (id: number) => {
    try {
      await TechStackService.delete(id);
      deleteTechFromStore(id);
    } catch (err) {
      throw err;
    }
  };

  return {
    techStack,
    loading,
    error,
    createTech,
    updateTech,
    deleteTech,
    refetch: loadTechStack,
  };
}