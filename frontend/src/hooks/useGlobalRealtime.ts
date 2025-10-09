import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useTechDbStore } from '@/stores/tech-db-store';
import { Database } from '@/types/database';

export function useGlobalRealtime() {
  useEffect(() => {
    console.log('Setting up global realtime subscription');
    
    const channel = supabase
      .channel('tech-stack-global')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'tech_stack' 
      }, (payload) => {
        console.log('Global realtime event:', payload);
        
        // Get fresh store functions inside the callback
        const { addTech, updateTech: updateTechInStore, deleteTech: deleteTechFromStore } = useTechDbStore.getState();
        
        if (payload.eventType === 'INSERT') {
          const newTech = payload.new as Database['public']['Tables']['tech_stack']['Row'];
          console.log('Adding tech globally:', newTech);
          addTech(newTech);
        } else if (payload.eventType === 'UPDATE') {
          const updatedTech = payload.new as Database['public']['Tables']['tech_stack']['Row'];
          console.log('Updating tech globally:', updatedTech);
          updateTechInStore(updatedTech.id, updatedTech);
        } else if (payload.eventType === 'DELETE') {
          const deletedTech = payload.old as Database['public']['Tables']['tech_stack']['Row'];
          console.log('Deleting tech globally:', deletedTech);
          deleteTechFromStore(deletedTech.id);
        }
      })
      .subscribe((status, err) => {
        console.log('Global realtime status:', status);
        if (err) {
          console.error('Global realtime error:', err);
        }
      });

    return () => {
      console.log('Cleaning up global realtime');
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array to run only once
}
