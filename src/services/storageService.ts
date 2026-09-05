import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const DEFAULT_PROFILE_BUCKET = 'profile-media';
export const DEFAULT_PROJECT_BUCKET = 'portfolio-media';
export const DEFAULT_BUCKET = DEFAULT_PROJECT_BUCKET;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

export const storageService = {
  /**
   * Resolves any stored value (full URL, relative storage path, or bucket path) into a valid public URL.
   */
  resolveStorageUrl(
    pathOrUrl: string | null | undefined,
    defaultBucket: string = DEFAULT_PROJECT_BUCKET
  ): string | null {
    if (!pathOrUrl || typeof pathOrUrl !== 'string') return null;
    const trimmed = pathOrUrl.trim();
    if (!trimmed) return null;

    // Already a full HTTP/HTTPS URL, data URL, or blob URL
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:')
    ) {
      return trimmed;
    }

    if (!isSupabaseConfigured() || !supabase) {
      return trimmed;
    }

    try {
      // Check if the path includes the bucket name at the start
      let bucket = defaultBucket;
      let cleanPath = trimmed;

      if (cleanPath.startsWith('portfolio-media/')) {
        bucket = 'portfolio-media';
        cleanPath = cleanPath.replace(/^portfolio-media\//, '');
      } else if (cleanPath.startsWith('profile-media/')) {
        bucket = 'profile-media';
        cleanPath = cleanPath.replace(/^profile-media\//, '');
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);
      return data.publicUrl || trimmed;
    } catch {
      return trimmed;
    }
  },

  /**
   * Upload an image file to Supabase Storage bucket.
   */
  async uploadProjectImage(
    file: File,
    folder: string = 'thumbnails',
    bucket: string = DEFAULT_PROJECT_BUCKET
  ): Promise<UploadResult> {
    // 1. Validation: File size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a smaller image.`
      };
    }

    // 2. Validation: MIME Type
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return {
        success: false,
        error: `Invalid file format (${file.type}). Supported formats: JPG, JPEG, PNG, WEBP.`
      };
    }

    // 3. Supabase Upload
    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        error: 'Supabase Storage is not configured. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your environment.'
      };
    }

    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const filePath = `${folder}/${Date.now()}_${cleanName}`;

      // Try designated bucket, fallback to alternative media bucket if needed
      let uploadBucket = bucket;
      let { data, error } = await supabase.storage
        .from(uploadBucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error && uploadBucket === 'portfolio-media') {
        uploadBucket = 'profile-media';
        const retry = await supabase.storage
          .from(uploadBucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });
        data = retry.data;
        error = retry.error;
      } else if (error && uploadBucket === 'profile-media') {
        uploadBucket = 'portfolio-media';
        const retry = await supabase.storage
          .from(uploadBucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });
        data = retry.data;
        error = retry.error;
      }

      if (error || !data) {
        console.error('Supabase storage upload error:', error);
        return {
          success: false,
          error: error?.message || 'Failed to upload image to Supabase Storage.'
        };
      }

      const { data: publicData } = supabase.storage
        .from(uploadBucket)
        .getPublicUrl(data.path);

      return {
        success: true,
        url: publicData.publicUrl,
        path: data.path
      };
    } catch (err: any) {
      console.error('Storage upload exception:', err);
      return {
        success: false,
        error: err.message || 'Unexpected error during image upload.'
      };
    }
  },

  /**
   * Delete an image from Supabase Storage by path
   */
  async deleteImage(path: string, bucket: string = DEFAULT_PROJECT_BUCKET): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase && path) {
      try {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
    return { success: true };
  }
};

