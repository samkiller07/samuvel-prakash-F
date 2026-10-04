import { Project, ProjectFormData } from '../types/project';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_PROJECTS, INITIAL_CLIENT_PROJECTS, ALL_INITIAL_PROJECTS } from '../data/initialProjects';
import { storageService } from './storageService';

export const projectService = {
  /**
   * Fetch all projects (sorted by sort_order).
   * Reads from Supabase if configured; falls back to verified ALL_INITIAL_PROJECTS.
   */
  async getAllProjects(): Promise<{ data: Project[]; source: 'supabase' | 'local'; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            media:project_media(*)
          `)
          .order('sort_order', { ascending: true });

        if (error) {
          console.warn('[Supabase API] Failed to fetch remote projects, using verified dataset:', error.message);
          return { data: ALL_INITIAL_PROJECTS, source: 'local', error: error.message };
        }

        if (data && data.length > 0) {
          const formatted: Project[] = data.map((p: any) => {
            const rawThumbnail = p.thumbnail_url || p.image_url || null;
            const resolvedThumbnail = storageService.resolveStorageUrl(rawThumbnail);
            
            const mediaList = (p.media || []).map((m: any) => ({
              ...m,
              url: storageService.resolveStorageUrl(m.url) || m.url
            })).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

            // If thumbnail_url is missing, fallback to first image in media if available
            const finalThumbnail = resolvedThumbnail || (mediaList.find((m: any) => m.type === 'image')?.url) || null;

            return {
              ...p,
              project_type: p.project_type || 'personal',
              is_published: p.is_published !== undefined ? p.is_published : true,
              thumbnail_url: finalThumbnail,
              media: mediaList
            };
          });
          return { data: formatted, source: 'supabase' };
        } else {
          return { data: ALL_INITIAL_PROJECTS, source: 'local' };
        }
      } catch (err: any) {
        console.warn('[Supabase API] Network exception, using verified dataset:', err.message);
        return { data: ALL_INITIAL_PROJECTS, source: 'local', error: err.message };
      }
    }

    return { data: ALL_INITIAL_PROJECTS, source: 'local' };
  },

  /**
   * Fetch published personal / engineering projects
   */
  async getPersonalProjects(): Promise<{ data: Project[]; source: 'supabase' | 'local'; error?: string }> {
    const res = await this.getAllProjects();
    const filtered = res.data.filter(
      (p) => (p.project_type === 'personal' || !p.project_type) && (p.is_published !== false)
    );
    return { data: filtered, source: res.source, error: res.error };
  },

  /**
   * Fetch published client delivery projects
   */
  async getClientProjects(): Promise<{ data: Project[]; source: 'supabase' | 'local'; error?: string }> {
    const res = await this.getAllProjects();
    const filtered = res.data.filter(
      (p) => p.project_type === 'client' && (p.is_published !== false)
    );
    return { data: filtered, source: res.source, error: res.error };
  },

  /**
   * Fetch project by slug
   */
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const { data } = await this.getAllProjects();
    return data.find((p) => p.slug === slug) || null;
  },

  /**
   * Quick toggle publish status (Requires authenticated authorized admin)
   */
  async togglePublishStatus(id: string, is_published: boolean): Promise<{ project: Project }> {
    return this.updateProject(id, { is_published });
  },

  /**
   * Create new project (Requires authenticated authorized admin)
   */
  async createProject(formData: ProjectFormData): Promise<{ project: Project }> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error(
        'Supabase is not configured. Project creation requires a connected Supabase backend.'
      );
    }

    const { media, ...dbPayload } = formData;
    const payloadToInsert = {
      ...dbPayload,
      project_type: dbPayload.project_type || 'personal',
      is_published: dbPayload.is_published !== undefined ? dbPayload.is_published : true
    };

    const { data: inserted, error } = await supabase
      .from('projects')
      .insert([payloadToInsert])
      .select()
      .single();

    if (error) {
      throw new Error(`Database error creating project: ${error.message}`);
    }

    // Insert media items if provided
    if (media && media.length > 0) {
      const mediaRows = media.map((m, idx) => ({
        project_id: inserted.id,
        type: m.type,
        url: m.url,
        caption: m.caption || '',
        sort_order: m.sort_order ?? idx + 1
      }));

      const { data: mediaData, error: mediaError } = await supabase
        .from('project_media')
        .insert(mediaRows)
        .select();

      if (!mediaError && mediaData) {
        inserted.media = mediaData;
      }
    }

    return { project: inserted };
  },

  /**
   * Update existing project (Requires authenticated authorized admin)
   */
  async updateProject(id: string, formData: Partial<ProjectFormData>): Promise<{ project: Project }> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error(
        'Supabase is not configured. Project updates require a connected Supabase backend.'
      );
    }

    const { media, ...dbPayload } = formData;
    const { data: updated, error } = await supabase
      .from('projects')
      .update({
        ...dbPayload,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Database error updating project: ${error.message}`);
    }

    // Replace media if provided
    if (formData.media) {
      await supabase.from('project_media').delete().eq('project_id', id);
      if (formData.media.length > 0) {
        const mediaRows = formData.media.map((m, idx) => ({
          project_id: id,
          type: m.type,
          url: m.url,
          caption: m.caption || '',
          sort_order: m.sort_order ?? idx + 1
        }));
        const { data: mediaData } = await supabase
          .from('project_media')
          .insert(mediaRows)
          .select();

        if (mediaData) {
          updated.media = mediaData;
        }
      }
    }

    return { project: updated };
  },

  /**
   * Delete project (Requires authenticated authorized admin)
   */
  async deleteProject(id: string): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error(
        'Supabase is not configured. Project deletion requires a connected Supabase backend.'
      );
    }

    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      throw new Error(`Database error deleting project: ${error.message}`);
    }

    return { success: true };
  },

  /**
   * Reset to verified default projects
   */
  resetToDefaults(): Project[] {
    return ALL_INITIAL_PROJECTS;
  }
};

