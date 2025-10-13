// frontend/src/services/image-upload.service.ts
import { supabase } from '@/lib/supabase-client';

export interface UploadResult {
  url: string;
  path: string;
  size: number;
}

export interface UploadOptions {
  folder?: string;
  compress?: boolean;
  maxWidth?: number;
  quality?: number;
  bucket?: string;
}

export class ImageUploadService {
  private static readonly BUCKET_NAME = 'tech-images';
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  private static readonly DEFAULT_COMPRESSION = {
    maxWidth: 800,
    quality: 0.8
  };

  /**
   * Upload image to Supabase Storage with enhanced options
   */
  static async uploadImage(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    try {
      const { folder = 'tech-stack', compress = true, maxWidth, quality, bucket = 'tech-images' } = options;
      
      // Validate file
      this.validateFile(file);

      let fileToUpload = file;
      
      // Compress image if requested
      if (compress) {
        fileToUpload = await this.compressImage(
          file, 
          maxWidth || this.DEFAULT_COMPRESSION.maxWidth, 
          quality || this.DEFAULT_COMPRESSION.quality
        );
      }

      console.log('Uploading image via API route...');

      // Upload via API route (bypasses RLS)
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('folder', folder);
      formData.append('bucket', bucket);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      console.log('Image uploaded successfully via API:', result.url);

      return {
        url: result.url,
        path: result.path,
        size: result.size
      };
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  /**
   * Upload image to Supabase Storage (legacy method for backward compatibility)
   */
  static async uploadImageLegacy(file: File, folder: string = 'tech-stack'): Promise<string> {
    const result = await this.uploadImage(file, { folder, compress: true });
    return result.url;
  }

  /**
   * Delete image from Supabase Storage
   */
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.findIndex(part => part === this.BUCKET_NAME);
      
      if (bucketIndex === -1) {
        throw new Error('Invalid image URL');
      }

      const filePath = pathParts.slice(bucketIndex + 1).join('/');

      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Image delete error:', error);
      throw error;
    }
  }

  /**
   * Compress image before upload
   */
  static async compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Compression failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Image load failed'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Validate file before upload
   */
  private static validateFile(file: File): void {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`File too large. Maximum size is ${this.MAX_FILE_SIZE / 1024 / 1024}MB.`);
    }
  }

  /**
   * Get optimized image URL with transformations
   */
  static getOptimizedImageUrl(imageUrl: string, _width?: number, _height?: number): string {
    if (!imageUrl || imageUrl.startsWith('data:')) {
      return imageUrl; // Return as-is for base64 or invalid URLs
    }

    // For Supabase Storage URLs, we can add transformation parameters
    // This is a placeholder - actual implementation depends on your Supabase setup
    // Parameters _width and _height are reserved for future use
    return imageUrl;
  }

  /**
   * Check if bucket exists and is accessible
   */
  static async checkBucketAccess(): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .list('', { limit: 1 });
      
      return !error;
    } catch (error) {
      console.error('Bucket access check failed:', error);
      return false;
    }
  }

  /**
   * Get file size in human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Validate file type and size with detailed error messages
   */
  static validateFileDetailed(file: File): { isValid: boolean; error?: string } {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: `Invalid file type. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `File too large. Maximum size is ${this.formatFileSize(this.MAX_FILE_SIZE)}`
      };
    }

    return { isValid: true };
  }

  /**
   * Upload multiple images at once
   */
  static async uploadMultipleImages(
    files: File[], 
    options: UploadOptions = {}
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, options));
    return Promise.all(uploadPromises);
  }

  /**
   * Get image dimensions from file
   */
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }
}
