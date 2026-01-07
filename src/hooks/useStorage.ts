import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Preset, WorkoutSession, Stats } from '../types';
import { defaultPresets } from '../data/presets';
import { getWeekStart, isSameDay, isYesterday } from '../utils/time';

const KEYS = {
  PRESETS: '@pulse_hiit_presets',
  SESSIONS: '@pulse_hiit_sessions',
  LAST_CONFIG: '@pulse_hiit_last_config',
};

// Free tier preset limit
const FREE_PRESET_LIMIT = 3;

export const usePresets = () => {
  const [presets, setPresets] = useState<Preset[]>(defaultPresets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      const stored = await AsyncStorage.getItem(KEYS.PRESETS);
      if (stored) {
        const customPresets = JSON.parse(stored) as Preset[];
        setPresets([...defaultPresets, ...customPresets]);
      }
    } catch (error) {
      console.error('Error loading presets:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreset = async (preset: Omit<Preset, 'id' | 'isDefault'>) => {
    try {
      const newPreset: Preset = {
        ...preset,
        id: `custom-${Date.now()}`,
        isDefault: false,
      };
      const stored = await AsyncStorage.getItem(KEYS.PRESETS);
      const customPresets = stored ? JSON.parse(stored) : [];
      customPresets.push(newPreset);
      await AsyncStorage.setItem(KEYS.PRESETS, JSON.stringify(customPresets));
      setPresets([...defaultPresets, ...customPresets]);
      return newPreset;
    } catch (error) {
      console.error('Error saving preset:', error);
      return null;
    }
  };

  const deletePreset = async (id: string) => {
    try {
      const stored = await AsyncStorage.getItem(KEYS.PRESETS);
      if (stored) {
        const customPresets = JSON.parse(stored).filter((p: Preset) => p.id !== id);
        await AsyncStorage.setItem(KEYS.PRESETS, JSON.stringify(customPresets));
        setPresets([...defaultPresets, ...customPresets]);
      }
    } catch (error) {
      console.error('Error deleting preset:', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const updatedPresets = presets.map(p =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      );
      const customPresets = updatedPresets.filter(p => !p.isDefault);
      await AsyncStorage.setItem(KEYS.PRESETS, JSON.stringify(customPresets));
      setPresets(updatedPresets);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Helper functions for premium limits
  const getCustomPresetsCount = () => {
    return presets.filter(p => !p.isDefault).length;
  };

  const canAddPreset = (isPremium: boolean) => {
    const customCount = getCustomPresetsCount();
    return isPremium || customCount < FREE_PRESET_LIMIT;
  };

  const getPresetLimitInfo = (isPremium: boolean) => {
    const customCount = getCustomPresetsCount();
    return {
      current: customCount,
      limit: isPremium ? null : FREE_PRESET_LIMIT,
      canAdd: canAddPreset(isPremium),
      isUnlimited: isPremium,
    };
  };

  return {
    presets,
    loading,
    savePreset,
    deletePreset,
    toggleFavorite,
    // Premium limit helpers
    canAddPreset,
    getCustomPresetsCount,
    getPresetLimitInfo,
    FREE_PRESET_LIMIT,
  };
};

// Free tier stats limit (days)
const FREE_STATS_DAYS_LIMIT = 7;

export const useSessions = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const stored = await AsyncStorage.getItem(KEYS.SESSIONS);
      if (stored) {
        setSessions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const saveSession = async (session: Omit<WorkoutSession, 'id' | 'date'>) => {
    try {
      const newSession: WorkoutSession = {
        ...session,
        id: `session-${Date.now()}`,
        date: new Date().toISOString(),
      };
      const stored = await AsyncStorage.getItem(KEYS.SESSIONS);
      const allSessions = stored ? JSON.parse(stored) : [];
      allSessions.push(newSession);
      // Keep only last 100 sessions
      const trimmed = allSessions.slice(-100);
      await AsyncStorage.setItem(KEYS.SESSIONS, JSON.stringify(trimmed));
      setSessions(trimmed);
      return newSession;
    } catch (error) {
      console.error('Error saving session:', error);
      return null;
    }
  };

  const getStats = useCallback((): Stats => {
    const now = new Date();
    const weekStart = getWeekStart(now);

    const todayWorkouts = sessions.filter(s =>
      isSameDay(new Date(s.date), now) && s.completed
    ).length;

    const weekSessions = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= weekStart && s.completed;
    });

    const weekWorkouts = weekSessions.length;
    const weekWorkMinutes = Math.round(
      weekSessions.reduce((acc, s) => acc + s.totalWorkTime, 0) / 60
    );

    // Calculate streak
    let streak = 0;
    const sortedSessions = [...sessions]
      .filter(s => s.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedSessions.length > 0) {
      const lastSession = new Date(sortedSessions[0].date);
      if (isSameDay(lastSession, now) || isYesterday(lastSession)) {
        streak = 1;
        let checkDate = new Date(lastSession);
        checkDate.setDate(checkDate.getDate() - 1);

        for (let i = 1; i < sortedSessions.length; i++) {
          const sessionDate = new Date(sortedSessions[i].date);
          if (isSameDay(sessionDate, checkDate)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else if (sessionDate < checkDate) {
            break;
          }
        }
      }
    }

    return {
      todayWorkouts,
      weekWorkouts,
      weekWorkMinutes,
      streak,
      lastWorkoutDate: sortedSessions[0]?.date || null,
    };
  }, [sessions]);

  // Filter sessions based on premium status
  const getFilteredSessions = useCallback((isPremium: boolean): WorkoutSession[] => {
    if (isPremium) {
      return sessions;
    }

    // Free users only see last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - FREE_STATS_DAYS_LIMIT);

    return sessions.filter(s => new Date(s.date) >= sevenDaysAgo);
  }, [sessions]);

  // Get info about stats limit
  const getStatsLimitInfo = useCallback((isPremium: boolean) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - FREE_STATS_DAYS_LIMIT);

    const recentSessions = sessions.filter(s => new Date(s.date) >= sevenDaysAgo);
    const olderSessions = sessions.filter(s => new Date(s.date) < sevenDaysAgo);

    return {
      totalSessions: sessions.length,
      visibleSessions: isPremium ? sessions.length : recentSessions.length,
      hiddenSessions: isPremium ? 0 : olderSessions.length,
      isLimited: !isPremium && olderSessions.length > 0,
      daysLimit: FREE_STATS_DAYS_LIMIT,
    };
  }, [sessions]);

  return {
    sessions,
    saveSession,
    getStats,
    // Premium limit helpers
    getFilteredSessions,
    getStatsLimitInfo,
    FREE_STATS_DAYS_LIMIT,
  };
};

export const useLastConfig = () => {
  const [lastConfig, setLastConfig] = useState({
    workSeconds: 30,
    restSeconds: 30,
    rounds: 10,
  });

  useEffect(() => {
    loadLastConfig();
  }, []);

  const loadLastConfig = async () => {
    try {
      const stored = await AsyncStorage.getItem(KEYS.LAST_CONFIG);
      if (stored) {
        setLastConfig(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading last config:', error);
    }
  };

  const saveLastConfig = async (config: typeof lastConfig) => {
    try {
      await AsyncStorage.setItem(KEYS.LAST_CONFIG, JSON.stringify(config));
      setLastConfig(config);
    } catch (error) {
      console.error('Error saving last config:', error);
    }
  };

  return { lastConfig, saveLastConfig };
};
