import { UserProfile } from '../types';

/**
 * Calculate calories burned during HIIT workout
 *
 * Formula based on:
 * - MET (Metabolic Equivalent of Task) for HIIT: ~8.0 (vigorous intensity)
 * - Calories = MET × weight(kg) × duration(hours)
 *
 * For more accuracy, we use different METs for work and rest phases:
 * - Work phase (high intensity): MET = 12.0
 * - Rest phase (active recovery): MET = 3.5
 *
 * References:
 * - Compendium of Physical Activities: https://sites.google.com/site/compendiumofphysicalactivities/
 * - ACSM's Guidelines for Exercise Testing and Prescription
 */

const MET_HIIT_WORK = 12.0;    // High intensity interval
const MET_HIIT_REST = 3.5;     // Active recovery / light activity
const MET_HIIT_AVERAGE = 8.0;  // Average HIIT session

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * More accurate than Harris-Benedict for modern populations
 */
export const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, sex } = profile;

  if (!weight || !height || !age || !sex) {
    return 0;
  }

  // Mifflin-St Jeor Equation:
  // Men: BMR = 10W + 6.25H - 5A + 5
  // Women: BMR = 10W + 6.25H - 5A - 161
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;

  if (sex === 'male') {
    return baseBMR + 5;
  } else if (sex === 'female') {
    return baseBMR - 161;
  } else {
    // For 'other', use average
    return baseBMR - 78;
  }
};

/**
 * Calculate calories burned during workout
 *
 * @param profile User profile with weight, height, age, sex
 * @param workSeconds Total work time in seconds
 * @param restSeconds Total rest time in seconds (optional for more accuracy)
 * @returns Calories burned (kcal)
 */
export const calculateCaloriesBurned = (
  profile: UserProfile,
  workSeconds: number,
  restSeconds?: number
): number => {
  const { weight } = profile;

  if (!weight || weight <= 0) {
    return 0;
  }

  // If we have separate work/rest times, calculate more accurately
  if (restSeconds !== undefined && restSeconds > 0) {
    const workHours = workSeconds / 3600;
    const restHours = restSeconds / 3600;

    const workCalories = MET_HIIT_WORK * weight * workHours;
    const restCalories = MET_HIIT_REST * weight * restHours;

    return Math.round(workCalories + restCalories);
  }

  // Otherwise use average MET for total workout time
  const totalHours = workSeconds / 3600;
  const calories = MET_HIIT_AVERAGE * weight * totalHours;

  return Math.round(calories);
};

/**
 * Calculate calories burned with detailed breakdown
 * Includes work phase, rest phase, and total
 */
export const calculateDetailedCalories = (
  profile: UserProfile,
  workSeconds: number,
  restSeconds: number
): {
  workCalories: number;
  restCalories: number;
  totalCalories: number;
  caloriesPerMinute: number;
} => {
  const { weight } = profile;

  if (!weight || weight <= 0) {
    return {
      workCalories: 0,
      restCalories: 0,
      totalCalories: 0,
      caloriesPerMinute: 0,
    };
  }

  const workHours = workSeconds / 3600;
  const restHours = restSeconds / 3600;
  const totalMinutes = (workSeconds + restSeconds) / 60;

  const workCalories = Math.round(MET_HIIT_WORK * weight * workHours);
  const restCalories = Math.round(MET_HIIT_REST * weight * restHours);
  const totalCalories = workCalories + restCalories;
  const caloriesPerMinute = totalMinutes > 0 ? Math.round(totalCalories / totalMinutes) : 0;

  return {
    workCalories,
    restCalories,
    totalCalories,
    caloriesPerMinute,
  };
};

/**
 * Estimate calories for a workout session based on config
 * Useful for showing estimated calories before starting workout
 */
export const estimateCalories = (
  profile: UserProfile,
  workSecondsPerRound: number,
  restSecondsPerRound: number,
  rounds: number
): number => {
  const totalWorkSeconds = workSecondsPerRound * rounds;
  const totalRestSeconds = restSecondsPerRound * (rounds - 1); // Last round has no rest

  return calculateCaloriesBurned(profile, totalWorkSeconds, totalRestSeconds);
};

/**
 * Get calorie burn rate description
 */
export const getCalorieBurnRate = (caloriesPerMinute: number): string => {
  if (caloriesPerMinute >= 15) return 'Very High';
  if (caloriesPerMinute >= 10) return 'High';
  if (caloriesPerMinute >= 7) return 'Moderate';
  if (caloriesPerMinute >= 5) return 'Light';
  return 'Very Light';
};

/**
 * Format calories for display
 */
export const formatCalories = (calories: number): string => {
  if (calories === 0) return '0 kcal';
  if (calories < 1000) return `${calories} kcal`;
  return `${(calories / 1000).toFixed(1)}k kcal`;
};
