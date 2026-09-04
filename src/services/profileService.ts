import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { storageService } from './storageService';

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  image_url: string;
  avatar_url: string;
  operator_id: string;
  status: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
}

export const DEFAULT_PROFILE: ProfileData = {
  name: 'Samuvel Prakash F',
  title: 'Aspiring Robotics Engineer • Hardware × Software',
  tagline: 'Mechatronics • Robotics • Automation • Embedded & AI',
  image_url: '',
  avatar_url: '',
  operator_id: 'OP-SAM-01',
  status: 'ONLINE // READY',
  bio: 'Building practical mechatronics systems by combining embedded systems, sensors, automation logic, IoT, and computer vision for real-world engineering applications.',
  github_url: 'https://github.com/samkiller07',
  linkedin_url: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5'
};

export const profileService = {
  /**
   * Default safe profile configuration (bundled fallback)
   */
  getDefaultProfile(): ProfileData {
    return { ...DEFAULT_PROFILE };
  },

  /**
   * Alias for synchronous fallback initial state
   */
  getLocalProfile(): ProfileData {
    return this.getDefaultProfile();
  },

  /**
   * Fetch profile from Supabase PostgreSQL table `profile_settings`
   */
  async getProfile(): Promise<ProfileData> {
    if (!isSupabaseConfigured() || !supabase) {
      return this.getDefaultProfile();
    }

    try {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (error || !data) {
        return this.getDefaultProfile();
      }

      const imageUrl = data.image_url || data.avatar_url || '';

      return {
        name: data.name || DEFAULT_PROFILE.name,
        title: data.title || DEFAULT_PROFILE.title,
        tagline: data.tagline || DEFAULT_PROFILE.tagline,
        image_url: imageUrl,
        avatar_url: imageUrl,
        operator_id: data.operator_id || DEFAULT_PROFILE.operator_id,
        status: data.status || DEFAULT_PROFILE.status,
        bio: data.bio || DEFAULT_PROFILE.bio,
        github_url: data.github_url || DEFAULT_PROFILE.github_url,
        linkedin_url: data.linkedin_url || DEFAULT_PROFILE.linkedin_url
      };
    } catch (err) {
      console.warn('Could not fetch remote profile from Supabase:', err);
      return this.getDefaultProfile();
    }
  },

  /**
   * Upload an actual File object to Supabase Storage and persist the public URL into profile_settings table
   */
  async uploadAndSaveAvatar(
    file: File,
    additionalMetadata?: Partial<ProfileData>
  ): Promise<{ success: boolean; data?: ProfileData; url?: string; error?: string }> {
    // 1. Upload file to Supabase Storage
    const uploadRes = await storageService.uploadProjectImage(file, 'avatar', 'profile-media');
    if (!uploadRes.success || !uploadRes.url) {
      return {
        success: false,
        error: uploadRes.error || 'Failed to upload photo to Supabase Storage.'
      };
    }

    const publicUrl = uploadRes.url;

    // 2. Persist to Supabase Database
    const current = await this.getProfile();
    const updated: ProfileData = {
      ...current,
      ...(additionalMetadata || {}),
      image_url: publicUrl,
      avatar_url: publicUrl
    };

    const dbRes = await this.updateProfile(updated);
    if (!dbRes.success) {
      return {
        success: false,
        url: publicUrl,
        error: dbRes.error || 'Photo uploaded but failed to update database table.'
      };
    }

    return {
      success: true,
      url: publicUrl,
      data: updated
    };
  },

  /**
   * Save updated profile metadata to Supabase PostgreSQL table `profile_settings`
   */
  async updateProfile(profile: Partial<ProfileData>): Promise<{ success: boolean; data?: ProfileData; error?: string }> {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        error: 'Supabase is not configured. Unable to save profile to database.'
      };
    }

    try {
      const current = await this.getProfile();
      const imageUrl = profile.image_url || profile.avatar_url || current.image_url;

      const payload = {
        id: 'default',
        name: profile.name ?? current.name,
        title: profile.title ?? current.title,
        tagline: profile.tagline ?? current.tagline,
        image_url: imageUrl,
        avatar_url: imageUrl,
        operator_id: profile.operator_id ?? current.operator_id,
        status: profile.status ?? current.status,
        bio: profile.bio ?? current.bio,
        github_url: profile.github_url ?? current.github_url,
        linkedin_url: profile.linkedin_url ?? current.linkedin_url,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('profile_settings')
        .upsert(payload)
        .select()
        .single();

      if (error) {
        console.error('Database profile update error:', error);
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          ...payload,
          image_url: data?.image_url || payload.image_url,
          avatar_url: data?.avatar_url || payload.avatar_url
        }
      };
    } catch (err: any) {
      console.error('Profile update exception:', err);
      return { success: false, error: err.message || 'Database transaction error.' };
    }
  }
};
