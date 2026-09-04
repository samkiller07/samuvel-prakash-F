import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  subject: string;
  message: string;
  admin_reply?: string | null;
  replied_at?: string | null;
  created_at: string;
  is_public?: boolean;
}

const STORAGE_KEY = 'samuvel_portfolio_messages';

const INITIAL_PUBLIC_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-init-01',
    name: 'AutoBot Hackathon Jury Lead',
    subject: 'First Prize Recognition - AI Air Quality Automation',
    message: 'Outstanding sensor integration and automated control architecture demonstrated during the hackathon. High-caliber mechatronics engineering execution.',
    admin_reply: 'Thank you! The embedded closed-loop PID control and real-time sensor processing were core focus areas.',
    replied_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    is_public: true
  },
  {
    id: 'msg-init-02',
    name: 'Industrial Automation Evaluator',
    subject: 'HyperMesh Tcl/Tk Automation Scripting',
    message: 'Impressive workflow automation reducing repetitive engineering modeling tasks. Great synthesis of software and mechanical engineering.',
    admin_reply: 'Appreciate the feedback! Automating manual engineering workflows via custom scripting delivers immense efficiency gains.',
    replied_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    is_public: true
  }
];

export const messageService = {
  /**
   * Get cached local messages
   */
  getLocalMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
    return INITIAL_PUBLIC_MESSAGES;
  },

  /**
   * Fetch public messages from Supabase (or local fallback)
   */
  async getPublicMessages(): Promise<ContactMessage[]> {
    const local = this.getLocalMessages();

    if (!isSupabaseConfigured() || !supabase) {
      return local;
    }

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return local;
      }

      const formatted: ContactMessage[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        subject: item.subject,
        message: item.message,
        admin_reply: item.admin_reply,
        replied_at: item.replied_at,
        created_at: item.created_at,
        is_public: item.is_public !== false
      }));

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
      } catch {
        // Storage full
      }

      return formatted;
    } catch (err) {
      console.warn('Using local messages fallback:', err);
      return local;
    }
  },

  /**
   * Submit a new transmission/message from the public contact form
   */
  async submitMessage(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; data?: ContactMessage; error?: string }> {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'General Engineering Inquiry',
      message: formData.message.trim(),
      created_at: new Date().toISOString(),
      is_public: true
    };

    // Update local cache
    const current = this.getLocalMessages();
    const updated = [newMessage, ...current];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (!isSupabaseConfigured() || !supabase) {
      return { success: true, data: newMessage };
    }

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          name: newMessage.name,
          email: formData.email,
          subject: newMessage.subject,
          message: newMessage.message
        })
        .select()
        .single();

      if (error) {
        console.warn('Supabase message insert note (saved locally):', error.message);
        return { success: true, data: newMessage };
      }

      return { success: true, data: data || newMessage };
    } catch (err: any) {
      console.warn('Message send exception (saved locally):', err);
      return { success: true, data: newMessage };
    }
  },

  /**
   * Admin reply to a transmission
   */
  async replyToMessage(id: string, reply: string): Promise<{ success: boolean; error?: string }> {
    const current = this.getLocalMessages();
    const updated = current.map((msg) =>
      msg.id === id
        ? { ...msg, admin_reply: reply.trim(), replied_at: new Date().toISOString() }
        : msg
    );

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (!isSupabaseConfigured() || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({
          admin_reply: reply.trim(),
          replied_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.warn('Supabase reply update note (saved locally):', error.message);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Admin delete a message
   */
  async deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
    const current = this.getLocalMessages();
    const updated = current.filter((msg) => msg.id !== id);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (!isSupabaseConfigured() || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase message delete note (deleted locally):', error.message);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
};
