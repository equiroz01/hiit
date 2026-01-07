import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Supabase Configuration
 *
 * IMPORTANT: Replace these with your actual Supabase project credentials
 * To get these:
 * 1. Go to https://supabase.com
 * 2. Create a new project
 * 3. Go to Settings > API
 * 4. Copy the URL and anon/public key
 */

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

/**
 * Supabase Client
 * Configured with AsyncStorage for React Native
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Database Types
 * These match the Supabase schema defined in supabase/migrations
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          weight: number | null;
          height: number | null;
          age: number | null;
          sex: 'male' | 'female' | 'other' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight?: number | null;
          height?: number | null;
          age?: number | null;
          sex?: 'male' | 'female' | 'other' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          weight?: number | null;
          height?: number | null;
          age?: number | null;
          sex?: 'male' | 'female' | 'other' | null;
          updated_at?: string;
        };
      };
      workout_sessions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          preset: string | null;
          work_seconds: number;
          rest_seconds: number;
          rounds: number;
          completed_rounds: number;
          total_work_time: number;
          completed: boolean;
          calories_burned: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          preset?: string | null;
          work_seconds: number;
          rest_seconds: number;
          rounds: number;
          completed_rounds: number;
          total_work_time: number;
          completed: boolean;
          calories_burned?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          preset?: string | null;
          work_seconds?: number;
          rest_seconds?: number;
          rounds?: number;
          completed_rounds?: number;
          total_work_time?: number;
          completed?: boolean;
          calories_burned?: number | null;
          updated_at?: string;
        };
      };
      presets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          work_seconds: number;
          rest_seconds: number;
          rounds: number;
          is_favorite: boolean;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          work_seconds: number;
          rest_seconds: number;
          rounds: number;
          is_favorite?: boolean;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          work_seconds?: number;
          rest_seconds?: number;
          rounds?: number;
          is_favorite?: boolean;
          is_default?: boolean;
          updated_at?: string;
        };
      };
      program_progress: {
        Row: {
          id: string;
          user_id: string;
          program_id: string;
          start_date: string;
          completed_workouts: number[];
          current_week: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          program_id: string;
          start_date: string;
          completed_workouts?: number[];
          current_week?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          program_id?: string;
          start_date?: string;
          completed_workouts?: number[];
          current_week?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
