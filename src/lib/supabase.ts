import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://usuhfanhujjqsjdoyouq.supabase.co';

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_Grc8FjIDpMYLcWg828FsqA_I_xYhkjt';

// Verify if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseKey) return false;
  try {
    const url = new URL(supabaseUrl);
    return (
      (url.hostname.includes('supabase.co') || url.hostname.length > 0) &&
      supabaseKey.length > 20
    );
  } catch {
    return false;
  }
};

let client: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } catch (err) {
    console.warn('Supabase client initialization failed:', err);
  }
}

export const supabase = client;
