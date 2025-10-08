// frontend/src/hooks/useTechStack.ts
import { useState, useEffect, useCallback } from "react";
import { TechStackService } from "@/services/tech-stack.service";
import { Database } from "@/types/database";
import { useTechDbStore } from "@/stores/tech-db-store";
import { supabase } from "@/lib/supabase-client";

export function useTechStack(category?: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
    frontendTech,
    backendTech,
    databaseTech,
    devopsTech,
    allTech,
    addTech,
    updateTech: updateTechInStore,
    deleteTech: deleteTechFromStore,
    setTechByCategory,
    setAllTech,
  } = useTechDbStore();

  // Get tech stack based on category
  const techStack = category 
    ? (category === 'frontend' ? frontendTech :
       category === 'backend' ? backendTech :
       category === 'database' ? databaseTech :
       category === 'devops' ? devopsTech : [])
    : allTech;


  const loadTechStack = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = category
        ? await TechStackService.getByCategory(category)
        : await TechStackService.getAll();
      
      if (category) {
        setTechByCategory(category, data);
      } else {
        setAllTech(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load tech stack";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [category, setTechByCategory, setAllTech]);

  useEffect(() => {
    // Load data when component mounts or category changes
    loadTechStack();
  }, [category, loadTechStack]);

  // Realtime subscription (similar to projects pattern)
  // Realtime subscription is now handled by individual components
  // to avoid conflicts and ensure proper category filtering


  const createTech = async (
    tech: Database["public"]["Tables"]["tech_stack"]["Insert"]
  ) => {
    try {
      const newTech = await TechStackService.create(tech);
      // Optimistic update: add to store immediately for responsive UI
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
      // Optimistic update: update store immediately for responsive UI
      updateTechInStore(id, updatedTech);
      return updatedTech;
    } catch (err) {
      throw err;
    }
  };

  const deleteTech = async (id: number) => {
    try {
      await TechStackService.delete(id);
      // Optimistic update: delete from store immediately for responsive UI
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