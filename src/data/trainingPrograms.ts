import { TrainingProgram } from '../types';

/**
 * Predefined Training Programs
 * FREE users get access to 2 programs (Fat Burner and Quick Start)
 * PREMIUM users get access to all programs
 */
export const TRAINING_PROGRAMS: TrainingProgram[] = [
  // FREE PROGRAM 1
  {
    id: 'quick-start',
    name: 'Quick Start',
    description: 'Perfect for beginners. Build your HIIT foundation with short, manageable workouts.',
    goal: 'general_fitness',
    difficulty: 'beginner',
    durationWeeks: 4,
    workoutsPerWeek: 3,
    isPremium: false,
    workouts: [
      // Week 1
      { day: 1, name: 'Day 1 - Easy Start', workSeconds: 20, restSeconds: 40, rounds: 6, description: 'Focus on form' },
      { day: 2, name: 'Day 2 - Build Endurance', workSeconds: 20, restSeconds: 40, rounds: 8 },
      { day: 3, name: 'Day 3 - Progress', workSeconds: 25, restSeconds: 35, rounds: 8 },
      // Week 2
      { day: 4, name: 'Day 4 - Increase Intensity', workSeconds: 25, restSeconds: 35, rounds: 10 },
      { day: 5, name: 'Day 5 - Steady Pace', workSeconds: 30, restSeconds: 30, rounds: 8 },
      { day: 6, name: 'Day 6 - Challenge', workSeconds: 30, restSeconds: 30, rounds: 10 },
      // Week 3
      { day: 7, name: 'Day 7 - Push Harder', workSeconds: 30, restSeconds: 30, rounds: 12 },
      { day: 8, name: 'Day 8 - Consistency', workSeconds: 35, restSeconds: 25, rounds: 10 },
      { day: 9, name: 'Day 9 - Peak Week', workSeconds: 35, restSeconds: 25, rounds: 12 },
      // Week 4
      { day: 10, name: 'Day 10 - Final Push', workSeconds: 40, restSeconds: 20, rounds: 10 },
      { day: 11, name: 'Day 11 - All Out', workSeconds: 40, restSeconds: 20, rounds: 12 },
      { day: 12, name: 'Day 12 - Graduation', workSeconds: 45, restSeconds: 15, rounds: 10 },
    ],
  },

  // FREE PROGRAM 2
  {
    id: 'fat-burner',
    name: 'Fat Burner',
    description: 'Maximize calorie burn with high-intensity intervals designed for weight loss.',
    goal: 'weight_loss',
    difficulty: 'intermediate',
    durationWeeks: 6,
    workoutsPerWeek: 4,
    isPremium: false,
    workouts: [
      // Week 1
      { day: 1, name: 'Metabolism Kickstart', workSeconds: 30, restSeconds: 30, rounds: 10 },
      { day: 2, name: 'Calorie Crusher', workSeconds: 40, restSeconds: 20, rounds: 8 },
      { day: 3, name: 'Fat Burn Zone', workSeconds: 35, restSeconds: 25, rounds: 12 },
      { day: 4, name: 'Weekend Warrior', workSeconds: 45, restSeconds: 15, rounds: 10 },
      // Week 2
      { day: 5, name: 'Intensity Boost', workSeconds: 40, restSeconds: 20, rounds: 12 },
      { day: 6, name: 'Power Hour', workSeconds: 50, restSeconds: 10, rounds: 8 },
      { day: 7, name: 'Endurance Build', workSeconds: 35, restSeconds: 25, rounds: 15 },
      { day: 8, name: 'Peak Performance', workSeconds: 45, restSeconds: 15, rounds: 12 },
      // Week 3-6 continue with progressive overload
      { day: 9, name: 'Advanced Burn', workSeconds: 45, restSeconds: 15, rounds: 14 },
      { day: 10, name: 'Max Effort', workSeconds: 50, restSeconds: 10, rounds: 12 },
      { day: 11, name: 'Strength & Cardio', workSeconds: 40, restSeconds: 20, rounds: 16 },
      { day: 12, name: 'Challenge Day', workSeconds: 60, restSeconds: 10, rounds: 10 },
      { day: 13, name: 'Steady State HIIT', workSeconds: 45, restSeconds: 15, rounds: 15 },
      { day: 14, name: 'Sprint Intervals', workSeconds: 50, restSeconds: 10, rounds: 14 },
      { day: 15, name: 'Full Body Blast', workSeconds: 40, restSeconds: 20, rounds: 18 },
      { day: 16, name: 'Final Burn', workSeconds: 45, restSeconds: 15, rounds: 16 },
      { day: 17, name: 'Advanced Power', workSeconds: 50, restSeconds: 10, rounds: 15 },
      { day: 18, name: 'Endurance Max', workSeconds: 40, restSeconds: 20, rounds: 20 },
      { day: 19, name: 'Peak Cardio', workSeconds: 55, restSeconds: 10, rounds: 12 },
      { day: 20, name: 'Ultimate Challenge', workSeconds: 45, restSeconds: 15, rounds: 18 },
      { day: 21, name: 'Metabolic Finisher', workSeconds: 50, restSeconds: 10, rounds: 16 },
      { day: 22, name: 'Fat Loss Pro', workSeconds: 40, restSeconds: 15, rounds: 20 },
      { day: 23, name: 'Final Sprint', workSeconds: 60, restSeconds: 10, rounds: 12 },
      { day: 24, name: 'Graduation Workout', workSeconds: 45, restSeconds: 15, rounds: 20 },
    ],
  },

  // PREMIUM PROGRAM 1
  {
    id: 'endurance-pro',
    name: 'Endurance Pro',
    description: 'Build incredible cardiovascular endurance with progressive HIIT training.',
    goal: 'endurance',
    difficulty: 'advanced',
    durationWeeks: 8,
    workoutsPerWeek: 5,
    isPremium: true,
    workouts: [
      { day: 1, name: 'Foundation Run', workSeconds: 45, restSeconds: 15, rounds: 12 },
      { day: 2, name: 'Tempo Training', workSeconds: 60, restSeconds: 20, rounds: 10 },
      { day: 3, name: 'Speed Work', workSeconds: 30, restSeconds: 30, rounds: 20 },
      { day: 4, name: 'Long Intervals', workSeconds: 90, restSeconds: 30, rounds: 8 },
      { day: 5, name: 'Recovery Pace', workSeconds: 40, restSeconds: 20, rounds: 15 },
      // Continues for 8 weeks (40 workouts total)
      { day: 6, name: 'Hill Sprints', workSeconds: 45, restSeconds: 15, rounds: 16 },
      { day: 7, name: 'Pyramid Power', workSeconds: 50, restSeconds: 10, rounds: 14 },
      { day: 8, name: 'Steady State', workSeconds: 60, restSeconds: 15, rounds: 12 },
      { day: 9, name: 'Max VO2', workSeconds: 40, restSeconds: 20, rounds: 18 },
      { day: 10, name: 'Active Recovery', workSeconds: 30, restSeconds: 30, rounds: 20 },
    ],
  },

  // PREMIUM PROGRAM 2
  {
    id: 'strength-power',
    name: 'Strength & Power',
    description: 'Develop explosive power and muscular strength with resistance-focused HIIT.',
    goal: 'strength',
    difficulty: 'advanced',
    durationWeeks: 6,
    workoutsPerWeek: 4,
    isPremium: true,
    workouts: [
      { day: 1, name: 'Power Development', workSeconds: 40, restSeconds: 40, rounds: 10 },
      { day: 2, name: 'Strength Endurance', workSeconds: 50, restSeconds: 30, rounds: 12 },
      { day: 3, name: 'Explosive Training', workSeconds: 30, restSeconds: 60, rounds: 8 },
      { day: 4, name: 'Max Effort', workSeconds: 45, restSeconds: 45, rounds: 12 },
      { day: 5, name: 'Compound Moves', workSeconds: 50, restSeconds: 40, rounds: 10 },
      { day: 6, name: 'Power Circuits', workSeconds: 40, restSeconds: 50, rounds: 14 },
    ],
  },

  // PREMIUM PROGRAM 3
  {
    id: 'muscle-builder',
    name: 'Muscle Builder',
    description: 'Hypertrophy-focused HIIT program to build lean muscle mass.',
    goal: 'muscle_gain',
    difficulty: 'intermediate',
    durationWeeks: 8,
    workoutsPerWeek: 4,
    isPremium: true,
    workouts: [
      { day: 1, name: 'Upper Body Blast', workSeconds: 45, restSeconds: 30, rounds: 12 },
      { day: 2, name: 'Lower Body Power', workSeconds: 50, restSeconds: 35, rounds: 10 },
      { day: 3, name: 'Full Body Pump', workSeconds: 40, restSeconds: 40, rounds: 14 },
      { day: 4, name: 'Core & Cardio', workSeconds: 35, restSeconds: 25, rounds: 16 },
      { day: 5, name: 'Push Day', workSeconds: 45, restSeconds: 35, rounds: 12 },
      { day: 6, name: 'Pull Day', workSeconds: 45, restSeconds: 35, rounds: 12 },
    ],
  },

  // PREMIUM PROGRAM 4
  {
    id: 'athletic-performance',
    name: 'Athletic Performance',
    description: 'Sport-specific conditioning for peak athletic performance.',
    goal: 'general_fitness',
    difficulty: 'advanced',
    durationWeeks: 10,
    workoutsPerWeek: 5,
    isPremium: true,
    workouts: [
      { day: 1, name: 'Agility Training', workSeconds: 30, restSeconds: 30, rounds: 15 },
      { day: 2, name: 'Power & Speed', workSeconds: 45, restSeconds: 30, rounds: 12 },
      { day: 3, name: 'Endurance Base', workSeconds: 60, restSeconds: 20, rounds: 10 },
      { day: 4, name: 'Strength Circuit', workSeconds: 50, restSeconds: 40, rounds: 10 },
      { day: 5, name: 'Recovery Session', workSeconds: 30, restSeconds: 45, rounds: 12 },
    ],
  },

  // PREMIUM PROGRAM 5
  {
    id: 'busy-professional',
    name: 'Busy Professional',
    description: 'Efficient 15-minute workouts for maximum results with minimal time.',
    goal: 'general_fitness',
    difficulty: 'intermediate',
    durationWeeks: 4,
    workoutsPerWeek: 5,
    isPremium: true,
    workouts: [
      { day: 1, name: 'Quick Morning Boost', workSeconds: 40, restSeconds: 20, rounds: 12 },
      { day: 2, name: 'Lunch Break Burn', workSeconds: 45, restSeconds: 15, rounds: 12 },
      { day: 3, name: 'Express Fat Loss', workSeconds: 50, restSeconds: 10, rounds: 12 },
      { day: 4, name: 'Power Quarter-Hour', workSeconds: 40, restSeconds: 20, rounds: 15 },
      { day: 5, name: 'Weekend Quick Hit', workSeconds: 45, restSeconds: 15, rounds: 14 },
    ],
  },

  // PREMIUM PROGRAM 6
  {
    id: 'transformation-12',
    name: '12-Week Transformation',
    description: 'Complete body transformation with progressive programming.',
    goal: 'weight_loss',
    difficulty: 'intermediate',
    durationWeeks: 12,
    workoutsPerWeek: 4,
    isPremium: true,
    workouts: [
      // Phase 1: Foundation (Weeks 1-4)
      { day: 1, name: 'Phase 1 - Baseline', workSeconds: 30, restSeconds: 30, rounds: 10 },
      { day: 2, name: 'Phase 1 - Build', workSeconds: 35, restSeconds: 25, rounds: 10 },
      { day: 3, name: 'Phase 1 - Progress', workSeconds: 40, restSeconds: 20, rounds: 10 },
      { day: 4, name: 'Phase 1 - Challenge', workSeconds: 45, restSeconds: 15, rounds: 10 },
      // Phase 2: Intensity (Weeks 5-8)
      { day: 5, name: 'Phase 2 - Ramp Up', workSeconds: 40, restSeconds: 20, rounds: 12 },
      { day: 6, name: 'Phase 2 - Peak', workSeconds: 45, restSeconds: 15, rounds: 12 },
      { day: 7, name: 'Phase 2 - Max', workSeconds: 50, restSeconds: 10, rounds: 12 },
      { day: 8, name: 'Phase 2 - Ultra', workSeconds: 50, restSeconds: 10, rounds: 14 },
      // Phase 3: Mastery (Weeks 9-12)
      { day: 9, name: 'Phase 3 - Elite', workSeconds: 45, restSeconds: 15, rounds: 16 },
      { day: 10, name: 'Phase 3 - Pro', workSeconds: 50, restSeconds: 10, rounds: 16 },
    ],
  },
];

// Helper function to get FREE programs
export const getFreePrograms = (): TrainingProgram[] => {
  return TRAINING_PROGRAMS.filter(p => !p.isPremium);
};

// Helper function to get PREMIUM programs
export const getPremiumPrograms = (): TrainingProgram[] => {
  return TRAINING_PROGRAMS.filter(p => p.isPremium);
};

// Helper function to get program by ID
export const getProgramById = (id: string): TrainingProgram | undefined => {
  return TRAINING_PROGRAMS.find(p => p.id === id);
};
