import { supabase } from '../supabase';
import type { Database } from '../supabase';

type Writeup = Database['public']['Tables']['writeups']['Row'];
type WriteupInsert = Database['public']['Tables']['writeups']['Insert'];
type WriteupUpdate = Database['public']['Tables']['writeups']['Update'];

export const writeupService = {
  // Get all writeups
  async getAll(): Promise<Writeup[]> {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get writeup by ID
  async getById(id: string): Promise<Writeup | null> {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  // Create writeup
  async create(writeup: WriteupInsert): Promise<Writeup> {
    const { data, error } = await supabase
      .from('writeups')
      .insert(writeup)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update writeup
  async update(id: string, updates: WriteupUpdate): Promise<Writeup> {
    const { data, error } = await supabase
      .from('writeups')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete writeup
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('writeups')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get writeups by author
  async getByAuthor(authorId: string): Promise<Writeup[]> {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get writeups by category
  async getByCategory(category: string): Promise<Writeup[]> {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get writeups by CTF
  async getByCTF(ctfId: string): Promise<Writeup[]> {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .eq('ctf_id', ctfId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Search writeups
  async search(query: string): Promise<Writeup[]> {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

