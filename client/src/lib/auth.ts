// Supabase Auth integration
import { supabase } from './supabase';
import type { Database } from './supabase';

type User = Database['public']['Tables']['users']['Row'];
type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string | null;
};

// Get current authenticated user
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      return null;
    }

    // Get user profile from users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError || !userProfile) {
      return null;
    }

    return {
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email,
      role: userProfile.role,
      avatar: userProfile.avatar,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Sign up with email and password
export const register = async (
  username: string,
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return { user: null, error: 'Username already exists' };
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        },
      },
    });

    if (authError) {
      return { user: null, error: authError.message };
    }

    if (!authData.user) {
      return { user: null, error: 'Failed to create user' };
    }

    // Wait a bit for the trigger to create the user profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the created user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !userProfile) {
      return { user: null, error: 'Failed to create user profile' };
    }

    const user: AuthUser = {
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email,
      role: userProfile.role,
      avatar: userProfile.avatar,
    };

    return { user, error: null };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { user: null, error: error.message || 'Registration failed' };
  }
};

// Sign in with email and password
export const login = async (
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { user: null, error: authError.message };
    }

    if (!authData.user) {
      return { user: null, error: 'Failed to sign in' };
    }

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !userProfile) {
      return { user: null, error: 'User profile not found' };
    }

    // Check if user is banned
    if (userProfile.status === 'banned') {
      await supabase.auth.signOut();
      return { user: null, error: 'Your account has been banned' };
    }

    const user: AuthUser = {
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email,
      role: userProfile.role,
      avatar: userProfile.avatar,
    };

    return { user, error: null };
  } catch (error: any) {
    console.error('Login error:', error);
    return { user: null, error: error.message || 'Login failed' };
  }
};

// Admin login (same as regular login but checks for admin role)
export const adminLogin = async (
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: string | null }> => {
  const result = await login(email, password);
  
  if (result.user && result.user.role !== 'admin') {
    await supabase.auth.signOut();
    return { user: null, error: 'Admin access required' };
  }

  return result;
};

// Sign out
export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === 'admin' ?? false;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error getting user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message || 'Update failed' };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user = await getCurrentUser();
      callback(user);
    } else {
      callback(null);
    }
  });
};
