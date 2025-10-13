import { useState, useEffect, useRef, useCallback } from 'react';
import { useSocialMediaDbStore } from '@/stores/social-media-db-store';
import { SocialMediaService } from '@/services/social-media.service';
import { Database } from '@/types/database';

// Global loading flag to prevent duplicate API calls
let isSocialMediaLoading = false;

export function resetSocialMediaFlags() {
  isSocialMediaLoading = false;
}

export function useSocialMedia() {
  const { socialMedia, setSocialMedia } = useSocialMediaDbStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);
  const hasLoadedRef = useRef(false);
  const setSocialMediaRef = useRef(setSocialMedia);
  setSocialMediaRef.current = setSocialMedia;

  useEffect(() => {
    isMountedRef.current = true;
    // Always show loading when component mounts
    setLoading(true);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // If we already have data, show it immediately but still show loading briefly
    if (socialMedia.length > 0 && !isSocialMediaLoading) {
      // Show loading for a brief moment to indicate component is mounting
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }, 100); // Brief loading state
      return () => clearTimeout(timer);
    }

    // Prevent duplicate API calls only if already loading
    if (isSocialMediaLoading) {
      return;
    }

    isSocialMediaLoading = true;
    hasLoadedRef.current = true;
    
    (async () => {
      try {
        if (isMountedRef.current) {
          setLoading(true);
          setError(null);
        }
        
        const data = await SocialMediaService.getAll();
        
        if (isMountedRef.current) {
          setSocialMediaRef.current(data);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to load social media');
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
        isSocialMediaLoading = false;
      }
    })();
  }, [socialMedia.length]);

  // Realtime subscription is handled globally in useGlobalRealtime hook

  const createSocialMedia = async (social: Database['public']['Tables']['social_media']['Insert']) => {
    const created = await SocialMediaService.create(social);
    // Note: Social media will be added via realtime subscription, no need for optimistic update
    return created;
  };

  const updateSocialMedia = async (id: number, updates: Database['public']['Tables']['social_media']['Update']) => {
    const updated = await SocialMediaService.update(id, updates);
    // Note: Social media will be updated via realtime subscription, no need for optimistic update
    return updated;
  };

  const deleteSocialMedia = async (id: number) => {
    await SocialMediaService.delete(id);
    // Note: Social media will be removed via realtime subscription, no need for optimistic update
  };

  return { 
    socialMedia, 
    loading, 
    error, 
    createSocialMedia, 
    updateSocialMedia, 
    deleteSocialMedia, 
    refetch: async () => {
      isSocialMediaLoading = false;
      hasLoadedRef.current = false;
      setLoading(true);
      try {
        const data = await SocialMediaService.getAll();
        setSocialMedia(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load social media');
      } finally {
        setLoading(false);
      }
    }
  };
}
