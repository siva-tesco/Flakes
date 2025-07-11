import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and refresh if needed
    const initializeAuth = async () => {
      let authInitializationError: any = null;
      try {
        // First, try to refresh the session
        const { data: { session }, error } = await supabase.auth.refreshSession();
        
        if (error) {
          authInitializationError = error;
          // If refresh fails, get current session
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          setUser(currentSession?.user ?? null);
        } else {
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authInitializationError = error;
        setUser(null);
      } finally {
        setLoading(false);
      
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Store session info in localStorage for persistence
        if (session) {
          localStorage.setItem('supabase.auth.token', session.access_token);
          localStorage.setItem('supabase.auth.refreshToken', session.refresh_token);
        } else {
          localStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('supabase.auth.refreshToken');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auto-refresh session every 50 minutes (tokens expire after 1 hour)
  useEffect(() => {
    if (user) {
      const interval = setInterval(async () => {
        try {
          await supabase.auth.refreshSession();
        } catch (error) {
          console.error('Session refresh error:', error);
        }
      }, 50 * 60 * 1000); // 50 minutes

      return () => clearInterval(interval);
    }
  }, [user]);
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.auth.refreshToken');
    await supabase.auth.signOut();
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Manual session refresh error:', error);
      setUser(null);
    }
  };
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}