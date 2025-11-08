import { supabase } from '../supabase';
import type { Database } from '../supabase';

type HallOfFameEntry = Database['public']['Tables']['hall_of_fame']['Row'];
type HallOfFameInsert = Database['public']['Tables']['hall_of_fame']['Insert'];
type HallOfFameUpdate = Database['public']['Tables']['hall_of_fame']['Update'];

export const hallOfFameService = {
  // Get all hall of fame entries
  async getAll(): Promise<HallOfFameEntry[]> {
    const { data, error } = await supabase
      .from('hall_of_fame')
      .select(`
        *,
        user:users(id, username, avatar)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get entry by ID
  async getById(id: string): Promise<HallOfFameEntry | null> {
    const { data, error } = await supabase
      .from('hall_of_fame')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  // Create entry
  async create(entry: HallOfFameInsert): Promise<HallOfFameEntry> {
    const { data, error } = await supabase
      .from('hall_of_fame')
      .insert(entry)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update entry
  async update(id: string, updates: HallOfFameUpdate): Promise<HallOfFameEntry> {
    const { data, error } = await supabase
      .from('hall_of_fame')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete entry
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('hall_of_fame')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get entries by user
  async getByUser(userId: string): Promise<HallOfFameEntry[]> {
    const { data, error } = await supabase
      .from('hall_of_fame')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

