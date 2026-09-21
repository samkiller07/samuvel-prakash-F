import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  service_type?: string;
  budget?: string;
  deadline?: string;
  admin_reply?: string | null;
  replied_at?: string | null;
  created_at: string;
}

const LOCAL_INQUIRIES_KEY = 'samuvel_inquiries_queue';

export const messageService = {
  /**
   * Submit a new private contact or freelance project inquiry
   */
  async submitInquiry(formData: {
    name: string;
    email: string;
    subject?: string;
    service_type?: string;
    message: string;
    budget?: string;
    deadline?: string;
  }): Promise<{ success: boolean; data?: ProjectInquiry; error?: string }> {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return { success: false, error: 'Name, email address, and project requirements are required.' };
    }

    const newInquiry: ProjectInquiry = {
      id: `inq-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      subject: formData.subject?.trim() || `Engineering Inquiry: ${formData.service_type || 'General'}`,
      service_type: formData.service_type || 'General Engineering',
      message: trimmedMessage,
      budget: formData.budget?.trim() || 'Flexible / Discussion',
      deadline: formData.deadline?.trim() || 'Flexible',
      created_at: new Date().toISOString()
    };

    // 1. If Supabase is configured, store directly in public.contact_messages
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert({
            name: newInquiry.name,
            email: newInquiry.email,
            subject: newInquiry.subject,
            service_type: newInquiry.service_type,
            message: newInquiry.message,
            budget: newInquiry.budget,
            deadline: newInquiry.deadline
          })
          .select()
          .single();

        if (error) {
          console.warn('[Inquiry] Supabase direct insert error (caching locally):', error.message);
          this.cacheLocalInquiry(newInquiry);
          return { success: true, data: newInquiry };
        }

        return { success: true, data: data || newInquiry };
      } catch (err: any) {
        console.warn('[Inquiry] Network exception (caching locally):', err);
        this.cacheLocalInquiry(newInquiry);
        return { success: true, data: newInquiry };
      }
    }

    // Fallback: Cache locally
    this.cacheLocalInquiry(newInquiry);
    return { success: true, data: newInquiry };
  },

  /**
   * Internal helper to cache inquiries locally
   */
  cacheLocalInquiry(inquiry: ProjectInquiry) {
    try {
      const stored = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      const list: ProjectInquiry[] = stored ? JSON.parse(stored) : [];
      list.unshift(inquiry);
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(list));
    } catch {
      // Ignore localStorage issues
    }
  },

  /**
   * Admin: Fetch private contact inquiries (Requires public.is_admin())
   */
  async getInquiries(): Promise<{ success: boolean; data: ProjectInquiry[]; error?: string }> {
    if (!isSupabaseConfigured() || !supabase) {
      try {
        const stored = localStorage.getItem(LOCAL_INQUIRIES_KEY);
        const list: ProjectInquiry[] = stored ? JSON.parse(stored) : [];
        return { success: true, data: list };
      } catch {
        return { success: true, data: [] };
      }
    }

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, data: [], error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (err: any) {
      return { success: false, data: [], error: err.message };
    }
  },

  /**
   * Admin: Delete inquiry
   */
  async deleteInquiry(id: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id);

        if (error) {
          return { success: false, error: error.message };
        }
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    try {
      const stored = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      if (stored) {
        const list: ProjectInquiry[] = JSON.parse(stored);
        const filtered = list.filter((i) => i.id !== id);
        localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(filtered));
      }
    } catch {
      // Ignore
    }

    return { success: true };
  }
};
