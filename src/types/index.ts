export type Phase = 'work' | 'rest' | 'prepare' | 'finished';

export interface TimerConfig {
  workSeconds: number;
  restSeconds: number;
  rounds: number;
  prepareSeconds?: number;
}

export interface TimerState {
  phase: Phase;
  currentRound: number;
  secondsLeft: number;
  isRunning: boolean;
  isPaused: boolean;
}

export interface Preset {
  id: string;
  name: string;
  workSeconds: number;
  restSeconds: number;
  rounds: number;
  isFavorite: boolean;
  isDefault?: boolean;
}

export interface WorkoutSession {
  id: string;
  date: string;
  preset?: string;
  workSeconds: number;
  restSeconds: number;
  rounds: number;
  completedRounds: number;
  totalWorkTime: number;
  completed: boolean;
  caloriesBurned?: number;
}

export interface Stats {
  todayWorkouts: number;
  weekWorkouts: number;
  weekWorkMinutes: number;
  streak: number;
  lastWorkoutDate: string | null;
}

export interface UserProfile {
  weight?: number; // kg
  height?: number; // cm
  age?: number;
  sex?: 'male' | 'female' | 'other';
}

// Training Program Types
export type ProgramDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ProgramGoal = 'weight_loss' | 'endurance' | 'strength' | 'muscle_gain' | 'general_fitness';

export interface ProgramWorkout {
  day: number;
  name: string;
  workSeconds: number;
  restSeconds: number;
  rounds: number;
  description?: string;
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  goal: ProgramGoal;
  difficulty: ProgramDifficulty;
  durationWeeks: number;
  workoutsPerWeek: number;
  workouts: ProgramWorkout[];
  isPremium: boolean;
}

export interface ProgramProgress {
  programId: string;
  startDate: string;
  completedWorkouts: number[];
  currentWeek: number;
  isActive: boolean;
}

// Premium / IAP Types
export type SubscriptionTier = 'free' | 'premium' | 'premium_plus';

export interface PremiumProduct {
  productId: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  type: 'subscription' | 'one_time';
  subscriptionPeriod?: 'monthly' | 'annual' | 'lifetime';
}

export interface PremiumState {
  isPremium: boolean;
  tier: SubscriptionTier;
  expirationDate: string | null;
  productId: string | null;
  isLifetime: boolean;
}

export type PaywallSource =
  | 'custom_presets'
  | 'stats_history'
  | 'export_data'
  | 'training_programs'
  | 'ai_coach'
  | 'themes'
  | 'settings';

export type RootStackParamList = {
  Home: undefined;
  Timer: { config: TimerConfig; presetName?: string; fromProgram?: { programId: string; day: number } };
  Presets: undefined;
  Stats: undefined;
  AdvancedStats: undefined;
  Programs: undefined;
  ProgramDetail: { programId: string };
  Settings: undefined;
  Profile: undefined;
  Paywall: { source: PaywallSource };
  Auth: undefined;
};
