import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          role: 'user' | 'admin';
          avatar: string | null;
          bio: string | null;
          xp: number;
          rank: string | null;
          streak: number;
          completed_rooms: number;
          status: 'active' | 'banned';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          role?: 'user' | 'admin';
          avatar?: string | null;
          bio?: string | null;
          xp?: number;
          rank?: string | null;
          streak?: number;
          completed_rooms?: number;
          status?: 'active' | 'banned';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          role?: 'user' | 'admin';
          avatar?: string | null;
          bio?: string | null;
          xp?: number;
          rank?: string | null;
          streak?: number;
          completed_rooms?: number;
          status?: 'active' | 'banned';
          created_at?: string;
          updated_at?: string;
        };
      };
      ctfs: {
        Row: {
          id: string;
          title: string;
          description: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          category: string;
          creator_id: string;
          rating: number;
          players: number;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          category: string;
          creator_id: string;
          rating?: number;
          players?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          category?: string;
          creator_id?: string;
          rating?: number;
          players?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          author_id: string;
          date: string;
          content: string;
          excerpt: string;
          tags: string[];
          likes: number;
          comments: number;
          thumbnail: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author_id: string;
          date?: string;
          content: string;
          excerpt: string;
          tags?: string[];
          likes?: number;
          comments?: number;
          thumbnail?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author_id?: string;
          date?: string;
          content?: string;
          excerpt?: string;
          tags?: string[];
          likes?: number;
          comments?: number;
          thumbnail?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      writeups: {
        Row: {
          id: string;
          title: string;
          author_id: string;
          date: string;
          content: string;
          category: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          likes: number;
          ctf_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author_id: string;
          date?: string;
          content: string;
          category: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          likes?: number;
          ctf_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author_id?: string;
          date?: string;
          content?: string;
          category?: string;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          likes?: number;
          ctf_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string;
          bug_title: string;
          severity: 'Low' | 'Medium' | 'High' | 'Critical';
          status: 'pending' | 'approved' | 'rejected';
          description: string;
          summary: string;
          category: 'Web Security' | 'Network Security' | 'Mobile Security' | 'Cloud Security' | 'IoT Security' | 'Cryptography' | 'Malware Analysis' | 'Social Engineering';
          organization: string;
          year: number;
          submitted_date: string;
          cve_id: string | null;
          program: string | null;
          bounty: number | null;
          steps_to_reproduce: string[] | null;
          impact_analysis: string | null;
          proof_of_concept: string | null;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reporter_id: string;
          bug_title: string;
          severity: 'Low' | 'Medium' | 'High' | 'Critical';
          status?: 'pending' | 'approved' | 'rejected';
          description: string;
          summary: string;
          category: 'Web Security' | 'Network Security' | 'Mobile Security' | 'Cloud Security' | 'IoT Security' | 'Cryptography' | 'Malware Analysis' | 'Social Engineering';
          organization: string;
          year: number;
          submitted_date?: string;
          cve_id?: string | null;
          program?: string | null;
          bounty?: number | null;
          steps_to_reproduce?: string[] | null;
          impact_analysis?: string | null;
          proof_of_concept?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reporter_id?: string;
          bug_title?: string;
          severity?: 'Low' | 'Medium' | 'High' | 'Critical';
          status?: 'pending' | 'approved' | 'rejected';
          description?: string;
          summary?: string;
          category?: 'Web Security' | 'Network Security' | 'Mobile Security' | 'Cloud Security' | 'IoT Security' | 'Cryptography' | 'Malware Analysis' | 'Social Engineering';
          organization?: string;
          year?: number;
          submitted_date?: string;
          cve_id?: string | null;
          program?: string | null;
          bounty?: number | null;
          steps_to_reproduce?: string[] | null;
          impact_analysis?: string | null;
          proof_of_concept?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      hall_of_fame: {
        Row: {
          id: string;
          user_id: string;
          bug_title: string;
          reward: string;
          date: string;
          report_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          bug_title: string;
          reward: string;
          date?: string;
          report_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          bug_title?: string;
          reward?: string;
          date?: string;
          report_id?: string | null;
          created_at?: string;
        };
      };
      leaderboard: {
        Row: {
          id: string;
          user_id: string;
          xp: number;
          completed_rooms: number;
          rank: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          xp: number;
          completed_rooms: number;
          rank?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          xp?: number;
          completed_rooms?: number;
          rank?: number;
          updated_at?: string;
        };
      };
    };
  };
};

