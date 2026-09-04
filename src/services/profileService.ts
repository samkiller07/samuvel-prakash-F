import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { storageService } from './storageService';

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  avatar_url: string;
  operator_id: string;
  status: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
}

const STORAGE_KEY = 'samuvel_portfolio_profile';

export const DEFAULT_PROFILE: ProfileData = {
  name: 'Samuvel Prakash F',
  title: 'Aspiring Robotics Engineer • Hardware × Software',
  tagline: 'Mechatronics • Robotics • Automation • Embedded & AI',
  avatar_url: '',
  operator_id: 'OP-SAM-01',
  status: 'ONLINE // READY',
  bio: 'Building practical mechatronics systems by combining embedded systems, sensors, automation logic, IoT, and computer vision for real-world engineering applications.',
  github_url: 'https://github.com/samkiller07',
  linkedin_url: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5'
};

export const profileService = {
  /**
   * Get cached or fallback profile data instantly
   */
  getLocalProfile(): ProfileData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch {
      // Ignore localStorage read errors
    }
    return DEFAULT_PROFILE;
  },

  /**
   * Fetch profile from Supabase with fallback to local storage
   */
  async getProfile(): Promise<ProfileData> {
    const local = this.getLocalProfile();

    if (!isSupabaseConfigured() || !supabase) {
      return local;
    }

    try {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (error || !data) {
        return local;
      }

      const merged: ProfileData = {
        name: data.name || local.name,
        title: data.title || local.title,
        tagline: data.tagline || local.tagline,
        avatar_url: data.avatar_url || local.avatar_url,
        operator_id: data.operator_id || local.operator_id,
        status: data.status || local.status,
        bio: data.bio || local.bio,
        github_url: data.github_url || local.github_url,
        linkedin_url: data.linkedin_url || local.linkedin_url
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // Storage full/disabled
      }

      return merged;
    } catch (err) {
      console.warn('Could not fetch remote profile:', err);
      return local;
    }
  },

  /**
   * Save updated profile to Supabase and cache locally
   */
  async updateProfile(profile: Partial<ProfileData>): Promise<{ success: boolean; data?: ProfileData; error?: string }> {
    const current = await this.getProfile();
    const updated: ProfileData = { ...current, ...profile };

    // Update local cache immediately
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (!isSupabaseConfigured() || !supabase) {
      return { success: true, data: updated };
    }

    try {
      const { error } = await supabase
        .from('profile_settings')
        .upsert({
          id: 'default',
          ...updated,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Remote profile update warning (persisted locally):', error.message);
        return { success: true, data: updated, error: error.message };
      }

      return { success: true, data: updated };
    } catch (err: any) {
      console.warn('Profile update exception (persisted locally):', err);
      return { success: true, data: updated, error: err.message };
    }
  },

  /**
   * Upload avatar image file to Supabase Storage and update profile
   */
  async uploadAvatar(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    const uploadRes = await storageService.uploadProjectImage(file, 'avatar');

    if (!uploadRes.success || !uploadRes.url) {
      // If Supabase Storage fails, convert to data URL as local fallback
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const dataUrl = reader.result as string;
          await this.updateProfile({ avatar_url: dataUrl });
          resolve({ success: true, url: dataUrl });
        };
        reader.onerror = () => {
          resolve({ success: false, error: uploadRes.error || 'Failed to read image file.' });
        };
        reader.readAsDataURL(file);
      });
    }

    await this.updateProfile({ avatar_url: uploadRes.url });
    return { success: true, url: uploadRes.url };
  }
};
