import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgramProgress } from '../types';

const PROGRAM_PROGRESS_KEY = '@pulse_program_progress';

/**
 * Hook to manage training program progress
 * Tracks which workouts have been completed in each program
 */
export const useProgramProgress = () => {
  const [programsProgress, setProgramsProgress] = useState<ProgramProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Load progress from storage
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const stored = await AsyncStorage.getItem(PROGRAM_PROGRESS_KEY);
        if (stored) {
          setProgramsProgress(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading program progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Save progress to storage
  const saveProgress = useCallback(async (progress: ProgramProgress[]) => {
    try {
      await AsyncStorage.setItem(PROGRAM_PROGRESS_KEY, JSON.stringify(progress));
      setProgramsProgress(progress);
    } catch (error) {
      console.error('Error saving program progress:', error);
    }
  }, []);

  // Get progress for a specific program
  const getProgramProgress = useCallback(
    (programId: string): ProgramProgress | undefined => {
      return programsProgress.find(p => p.programId === programId);
    },
    [programsProgress]
  );

  // Start a new program
  const startProgram = useCallback(
    async (programId: string) => {
      const existing = programsProgress.find(p => p.programId === programId);

      if (existing) {
        // Restart program
        const updated = programsProgress.map(p =>
          p.programId === programId
            ? {
                ...p,
                startDate: new Date().toISOString(),
                completedWorkouts: [],
                currentWeek: 1,
                isActive: true,
              }
            : p
        );
        await saveProgress(updated);
      } else {
        // Start new program
        const newProgress: ProgramProgress = {
          programId,
          startDate: new Date().toISOString(),
          completedWorkouts: [],
          currentWeek: 1,
          isActive: true,
        };
        await saveProgress([...programsProgress, newProgress]);
      }
    },
    [programsProgress, saveProgress]
  );

  // Mark a workout as completed
  const completeWorkout = useCallback(
    async (programId: string, day: number) => {
      const progress = programsProgress.find(p => p.programId === programId);

      if (!progress) {
        // If program not started, start it and mark first workout
        await startProgram(programId);
        const updated = programsProgress.map(p =>
          p.programId === programId
            ? { ...p, completedWorkouts: [day] }
            : p
        );
        await saveProgress(updated);
        return;
      }

      // Add workout to completed list if not already there
      if (!progress.completedWorkouts.includes(day)) {
        const updated = programsProgress.map(p =>
          p.programId === programId
            ? {
                ...p,
                completedWorkouts: [...p.completedWorkouts, day].sort((a, b) => a - b),
              }
            : p
        );
        await saveProgress(updated);
      }
    },
    [programsProgress, saveProgress, startProgram]
  );

  // Check if a workout is completed
  const isWorkoutCompleted = useCallback(
    (programId: string, day: number): boolean => {
      const progress = programsProgress.find(p => p.programId === programId);
      return progress ? progress.completedWorkouts.includes(day) : false;
    },
    [programsProgress]
  );

  // Get completion percentage for a program
  const getCompletionPercentage = useCallback(
    (programId: string, totalWorkouts: number): number => {
      const progress = programsProgress.find(p => p.programId === programId);
      if (!progress || totalWorkouts === 0) return 0;
      return Math.round((progress.completedWorkouts.length / totalWorkouts) * 100);
    },
    [programsProgress]
  );

  // Get next workout day
  const getNextWorkoutDay = useCallback(
    (programId: string): number | null => {
      const progress = programsProgress.find(p => p.programId === programId);
      if (!progress) return 1; // Start from day 1

      // Find the first uncompleted day
      let day = 1;
      while (progress.completedWorkouts.includes(day)) {
        day++;
      }

      return day;
    },
    [programsProgress]
  );

  // Get all active programs
  const getActivePrograms = useCallback((): ProgramProgress[] => {
    return programsProgress.filter(p => p.isActive);
  }, [programsProgress]);

  // Pause/unpause a program
  const toggleProgramActive = useCallback(
    async (programId: string) => {
      const updated = programsProgress.map(p =>
        p.programId === programId
          ? { ...p, isActive: !p.isActive }
          : p
      );
      await saveProgress(updated);
    },
    [programsProgress, saveProgress]
  );

  // Reset program progress
  const resetProgram = useCallback(
    async (programId: string) => {
      const updated = programsProgress.map(p =>
        p.programId === programId
          ? {
              ...p,
              completedWorkouts: [],
              currentWeek: 1,
              startDate: new Date().toISOString(),
            }
          : p
      );
      await saveProgress(updated);
    },
    [programsProgress, saveProgress]
  );

  return {
    programsProgress,
    loading,
    getProgramProgress,
    startProgram,
    completeWorkout,
    isWorkoutCompleted,
    getCompletionPercentage,
    getNextWorkoutDay,
    getActivePrograms,
    toggleProgramActive,
    resetProgram,
  };
};
