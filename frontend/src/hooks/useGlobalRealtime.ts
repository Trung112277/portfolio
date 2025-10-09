import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useTechDbStore } from '@/stores/tech-db-store';
import { Database } from '@/types/database';

export function useGlobalRealtime() {
  useEffect(() => {
    const channel = supabase
      .channel('tech-stack-global')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'tech_stack' 
      }, (payload) => {
        // Get fresh store functions inside the callback
        const { addTech, updateTech: updateTechInStore, deleteTech: deleteTechFromStore } = useTechDbStore.getState();
        
        if (payload.eventType === 'INSERT') {
          const newTech = payload.new as Database['public']['Tables']['tech_stack']['Row'];
          addTech(newTech);
        } else if (payload.eventType === 'UPDATE') {
          const updatedTech = payload.new as Database['public']['Tables']['tech_stack']['Row'];
          updateTechInStore(updatedTech.id, updatedTech);
        } else if (payload.eventType === 'DELETE') {
          const deletedTech = payload.old as Database['public']['Tables']['tech_stack']['Row'];
          deleteTechFromStore(deletedTech.id);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array to run only once
}
