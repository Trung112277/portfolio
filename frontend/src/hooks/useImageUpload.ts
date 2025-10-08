// frontend/src/hooks/useImageUpload.ts
import { useState, useCallback } from 'react';
import { ImageUploadService, UploadResult, UploadOptions } from '@/services/image-upload.service';

export interface UseImageUploadReturn {
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  uploadImage: (file: File, options?: UploadOptions) => Promise<UploadResult | null>;
  uploadMultipleImages: (files: File[], options?: UploadOptions) => Promise<UploadResult[]>;
  clearError: () => void;
  checkStorageConnection: () => Promise<boolean>;
}

export function useImageUpload(): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkStorageConnection = useCallback(async (): Promise<boolean> => {
    try {
      const isAccessible = await ImageUploadService.checkBucketAccess();
      if (!isAccessible) {
        setError('Storage bucket is not accessible. Please check your configuration.');
      }
      return isAccessible;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Storage connection failed: ${errorMessage}`);
      return false;
    }
  }, []);

  const uploadImage = useCallback(async (
    file: File, 
    options: UploadOptions = {}
  ): Promise<UploadResult | null> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Validate file
      const validation = ImageUploadService.validateFileDetailed(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Simulate progress (since Supabase doesn't provide progress callbacks)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const result = await ImageUploadService.uploadImage(file, options);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
      // Reset progress after a short delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, []);

  const uploadMultipleImages = useCallback(async (
    files: File[], 
    options: UploadOptions = {}
  ): Promise<UploadResult[]> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Validate all files first
      for (const file of files) {
        const validation = ImageUploadService.validateFileDetailed(file);
        if (!validation.isValid) {
          throw new Error(`File ${file.name}: ${validation.error}`);
        }
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 90));
      }, 200);

      const results = await ImageUploadService.uploadMultipleImages(files, options);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return [];
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, []);

  return {
    isUploading,
    uploadProgress,
    error,
    uploadImage,
    uploadMultipleImages,
    clearError,
    checkStorageConnection,
  };
}
