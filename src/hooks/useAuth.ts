import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { Session, User, AuthError } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

/**
 * Authentication Hook for Supabase
 * Handles sign up, sign in, sign out, and session management
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
  });

  // Initialize auth state on mount
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        isAuthenticated: !!session,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        isAuthenticated: !!session,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Sign up with email and password
   */
  const signUp = useCallback(
    async (email: string, password: string): Promise<{ error: AuthError | null }> => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        return { error };
      } catch (error) {
        return { error: error as AuthError };
      }
    },
    []
  );

  /**
   * Sign in with email and password
   */
  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: AuthError | null }> => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error };
      } catch (error) {
        return { error: error as AuthError };
      }
    },
    []
  );

  /**
   * Sign in anonymously (for offline-first approach)
   * This allows users to use the app without an account
   * They can later convert to a full account
   */
  const signInAnonymously = useCallback(async (): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase.auth.signInAnonymously();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);

  /**
   * Sign out
   */
  const signOut = useCallback(async (): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);

  /**
   * Reset password
   */
  const resetPassword = useCallback(
    async (email: string): Promise<{ error: AuthError | null }> => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return { error };
      } catch (error) {
        return { error: error as AuthError };
      }
    },
    []
  );

  /**
   * Update password
   */
  const updatePassword = useCallback(
    async (newPassword: string): Promise<{ error: AuthError | null }> => {
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        return { error };
      } catch (error) {
        return { error: error as AuthError };
      }
    },
    []
  );

  /**
   * Update user metadata
   */
  const updateUserMetadata = useCallback(
    async (metadata: Record<string, any>): Promise<{ error: AuthError | null }> => {
      try {
        const { error } = await supabase.auth.updateUser({
          data: metadata,
        });
        return { error };
      } catch (error) {
        return { error: error as AuthError };
      }
    },
    []
  );

  return {
    ...authState,
    signUp,
    signIn,
    signInAnonymously,
    signOut,
    resetPassword,
    updatePassword,
    updateUserMetadata,
  };
};
