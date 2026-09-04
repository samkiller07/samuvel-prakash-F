import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface CommentItem {
  id: string;
  name: string;
  comment: string;
  parent_id: string | null;
  is_admin: boolean;
  created_at: string;
  replies?: CommentItem[];
}

export const commentService = {
  /**
   * Fetch all comments and organize them into top-level comments with nested admin replies
   */
  async getComments(): Promise<{ success: boolean; data: CommentItem[]; error?: string }> {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        data: [],
        error: 'Comments are temporarily unavailable (Database uplink offline).'
      };
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments from Supabase:', error);
        return {
          success: false,
          data: [],
          error: error.message || 'Failed to fetch comments from database.'
        };
      }

      if (!data) {
        return { success: true, data: [] };
      }

      // Group replies under parent comments
      const topLevel: CommentItem[] = [];
      const replyMap = new Map<string, CommentItem[]>();

      data.forEach((item: any) => {
        const comment: CommentItem = {
          id: item.id,
          name: item.name,
          comment: item.comment,
          parent_id: item.parent_id,
          is_admin: Boolean(item.is_admin),
          created_at: item.created_at,
          replies: []
        };

        if (!comment.parent_id) {
          topLevel.push(comment);
        } else {
          const list = replyMap.get(comment.parent_id) || [];
          list.push(comment);
          replyMap.set(comment.parent_id, list);
        }
      });

      // Attach replies to top-level comments (sorted chronologically)
      topLevel.forEach((top) => {
        const replies = replyMap.get(top.id) || [];
        // Sort replies ascending so conversation flows naturally
        replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        top.replies = replies;
      });

      return { success: true, data: topLevel };
    } catch (err: any) {
      console.error('Comments fetch exception:', err);
      return {
        success: false,
        data: [],
        error: err.message || 'Comments are temporarily unavailable.'
      };
    }
  },

  /**
   * Submit a top-level visitor comment
   */
  async postComment(name: string, commentText: string): Promise<{ success: boolean; data?: CommentItem; error?: string }> {
    const trimmedName = name.trim();
    const trimmedComment = commentText.trim();

    if (!trimmedName || !trimmedComment) {
      return { success: false, error: 'Name and comment text cannot be empty.' };
    }

    if (trimmedName.length > 100) {
      return { success: false, error: 'Name must be under 100 characters.' };
    }

    if (trimmedComment.length > 2000) {
      return { success: false, error: 'Comment must be under 2000 characters.' };
    }

    if (!isSupabaseConfigured() || !supabase) {
      return { success: false, error: 'Comments are temporarily unavailable.' };
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          name: trimmedName,
          comment: trimmedComment,
          parent_id: null,
          is_admin: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting comment into Supabase:', error);
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          comment: data.comment,
          parent_id: null,
          is_admin: false,
          created_at: data.created_at,
          replies: []
        }
      };
    } catch (err: any) {
      console.error('Comment insertion exception:', err);
      return { success: false, error: err.message || 'Failed to submit comment.' };
    }
  },

  /**
   * Post an authorized Admin / Operator reply to a visitor comment
   */
  async postAdminReply(
    parentId: string,
    replyText: string,
    adminName: string = 'SAMUVEL PRAKASH F'
  ): Promise<{ success: boolean; data?: CommentItem; error?: string }> {
    const trimmedReply = replyText.trim();

    if (!trimmedReply) {
      return { success: false, error: 'Reply text cannot be empty.' };
    }

    if (!parentId) {
      return { success: false, error: 'Original comment ID is required for a reply.' };
    }

    if (!isSupabaseConfigured() || !supabase) {
      return { success: false, error: 'Database uplink offline. Cannot post reply.' };
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          name: adminName,
          comment: trimmedReply,
          parent_id: parentId,
          is_admin: true
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting admin reply into Supabase:', error);
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          comment: data.comment,
          parent_id: data.parent_id,
          is_admin: true,
          created_at: data.created_at
        }
      };
    } catch (err: any) {
      console.error('Admin reply exception:', err);
      return { success: false, error: err.message || 'Failed to post admin reply.' };
    }
  },

  /**
   * Delete a comment (Admin only)
   */
  async deleteComment(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured() || !supabase) {
      return { success: false, error: 'Database uplink offline.' };
    }

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting comment from Supabase:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Delete comment exception:', err);
      return { success: false, error: err.message };
    }
  }
};
