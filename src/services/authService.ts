import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserSession {
  email: string;
  userId: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const authService = {
  /**
   * Verify if a user ID is an authorized admin in the admin_users table
   */
  async checkAdminStatus(userId: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase || !userId) {
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error verifying admin authorization:', error);
        return false;
      }

      return !!data;
    } catch (err) {
      console.error('Admin verification exception:', err);
      return false;
    }
  },

  /**
   * Check currently active Supabase Auth session and verify admin authorization
   */
  async getSession(): Promise<UserSession | null> {
    if (!isSupabaseConfigured() || !supabase) {
      return null;
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session || !session.user) {
        return null;
      }

      const isAdmin = await this.checkAdminStatus(session.user.id);

      return {
        email: session.user.email || '',
        userId: session.user.id,
        isAuthenticated: true,
        isAdmin
      };
    } catch (err) {
      console.error('Error checking session:', err);
      return null;
    }
  },

  /**
   * Authenticate admin via Supabase Auth
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; session?: UserSession }> {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        error:
          'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your environment.'
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.session || !data.user) {
        return { success: false, error: 'Authentication failed. No session created.' };
      }

      // Verify admin authorization in database
      const isAdmin = await this.checkAdminStatus(data.user.id);
      if (!isAdmin) {
        // Authenticated user is not in the admin_users table
        await supabase.auth.signOut();
        return {
          success: false,
          error:
            'Access Denied: Your account is not authorized as a portfolio administrator.'
        };
      }

      return {
        success: true,
        session: {
          email: data.user.email || email,
          userId: data.user.id,
          isAuthenticated: true,
          isAdmin: true
        }
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An unexpected error occurred during login.'
      };
    }
  },

  /**
   * Sign out from Supabase Auth
   */
  async logout(): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error during sign out:', err);
      }
    }
  }
};
