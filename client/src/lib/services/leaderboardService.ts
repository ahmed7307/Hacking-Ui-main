import { supabase } from '../supabase';
import type { Database } from '../supabase';

type LeaderboardEntry = Database['public']['Tables']['leaderboard']['Row'];

export const leaderboardService = {
  // Get leaderboard (top users by XP)
  async getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select(`
        *,
        user:users(id, username, avatar, rank)
      `)
      .order('xp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get user's leaderboard position
  async getUserRank(userId: string): Promise<number | null> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('rank')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data?.rank || null;
  },

  // Update user XP
  async updateXP(userId: string, xp: number): Promise<void> {
    const { error } = await supabase
      .from('leaderboard')
      .update({ xp, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) throw error;

    // Recalculate ranks (this should be done via a database function in production)
    await this.recalculateRanks();
  },

  // Increment completed rooms
  async incrementCompletedRooms(userId: string): Promise<void> {
    const { data: current } = await supabase
      .from('leaderboard')
      .select('completed_rooms')
      .eq('user_id', userId)
      .single();

    if (current) {
      const { error } = await supabase
        .from('leaderboard')
        .update({ 
          completed_rooms: (current.completed_rooms || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
    }
  },

  // Recalculate ranks based on XP
  async recalculateRanks(): Promise<void> {
    // This should ideally be done via a database function
    // For now, we'll fetch all entries, sort by XP, and update ranks
    const { data: entries, error: fetchError } = await supabase
      .from('leaderboard')
      .select('user_id, xp')
      .order('xp', { ascending: false });

    if (fetchError) throw fetchError;

    if (entries) {
      const updates = entries.map((entry, index) => ({
        user_id: entry.user_id,
        rank: index + 1,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('leaderboard')
          .update({ rank: update.rank })
          .eq('user_id', update.user_id);

        if (error) {
          console.error('Error updating rank:', error);
        }
      }
    }
  },
};

