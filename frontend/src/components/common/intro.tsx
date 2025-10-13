"use client";

import { useIntroductionStore } from "@/stores/introduction-store";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

export default function Intro() {
  const { introduction, loadIntroduction, isLoading, syncWithRealtime } = useIntroductionStore();

  useEffect(() => {
    // Always load introduction data
    loadIntroduction();

    // Set up realtime subscription
    const channel = supabase
      .channel('introduction-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'introduction'
        },
        (payload) => {
          console.log('Introduction changed:', payload);
          
          // Handle different event types
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const newData = payload.new as { content: string };
            if (newData?.content) {
              syncWithRealtime(newData.content);
            }
          } else if (payload.eventType === 'DELETE') {
            // If introduction is deleted, reload to get current state
            loadIntroduction();
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadIntroduction, syncWithRealtime]);

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="text-center text-xl py-5 md:py-10 px-5 md:px-15 bg-primary/10 rounded-lg flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-muted-foreground">Loading introduction...</div>
        </div>
      </div>
    );
  }

  // Split the introduction text into paragraphs for better formatting
  const paragraphs = introduction.split('\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="text-center text-xl py-5 md:py-10 px-5 md:px-15 bg-primary/10 rounded-lg flex flex-col gap-3">
      {paragraphs.map((paragraph, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
      ))}
    </div>
  );
}
