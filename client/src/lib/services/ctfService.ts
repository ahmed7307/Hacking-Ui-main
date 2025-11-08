import { supabase } from '../supabase';
import type { Database } from '../supabase';

type CTF = Database['public']['Tables']['ctfs']['Row'];
type CTFInsert = Database['public']['Tables']['ctfs']['Insert'];
type CTFUpdate = Database['public']['Tables']['ctfs']['Update'];

export const ctfService = {
  // Get all CTFs
  async getAll(): Promise<CTF[]> {
    const { data, error } = await supabase
      .from('ctfs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get CTF by ID
  async getById(id: string): Promise<CTF | null> {
    const { data, error } = await supabase
      .from('ctfs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  // Create CTF
  async create(ctf: CTFInsert): Promise<CTF> {
    const { data, error } = await supabase
      .from('ctfs')
      .insert(ctf)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update CTF
  async update(id: string, updates: CTFUpdate): Promise<CTF> {
    const { data, error } = await supabase
      .from('ctfs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete CTF
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('ctfs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get CTFs by category
  async getByCategory(category: string): Promise<CTF[]> {
    const { data, error } = await supabase
      .from('ctfs')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get CTFs by difficulty
  async getByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): Promise<CTF[]> {
    const { data, error } = await supabase
      .from('ctfs')
      .select('*')
      .eq('difficulty', difficulty)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Search CTFs
  async search(query: string): Promise<CTF[]> {
    const { data, error } = await supabase
      .from('ctfs')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Increment player count
  async incrementPlayers(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_ctf_players', { ctf_id: id });
    if (error) {
      // Fallback to manual update if RPC doesn't exist
      const ctf = await this.getById(id);
      if (ctf) {
        await this.update(id, { players: (ctf.players || 0) + 1 });
      }
    }
  },
};

