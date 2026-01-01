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
}

export interface Stats {
  todayWorkouts: number;
  weekWorkouts: number;
  weekWorkMinutes: number;
  streak: number;
  lastWorkoutDate: string | null;
}

export type RootStackParamList = {
  Home: undefined;
  Timer: { config: TimerConfig; presetName?: string };
  Presets: undefined;
  Stats: undefined;
  Settings: undefined;
};
