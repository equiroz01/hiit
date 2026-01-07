import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutSession, Preset, ProgramProgress } from '../types';

/**
 * Sync Service
 * Implements offline-first sync strategy with conflict resolution
 *
 * Strategy:
 * 1. All data writes go to local AsyncStorage first (instant UI updates)
 * 2. Background sync pushes local changes to Supabase
 * 3. Pull remote changes and merge with local data
 * 4. Conflict resolution: last-write-wins with updated_at timestamps
 */

const SYNC_KEYS = {
  SESSIONS_LAST_SYNC: '@pulse_sessions_last_sync',
  PRESETS_LAST_SYNC: '@pulse_presets_last_sync',
  PROGRAMS_LAST_SYNC: '@pulse_programs_last_sync',
  PENDING_SESSIONS: '@pulse_pending_sessions',
  PENDING_PRESETS: '@pulse_pending_presets',
  PENDING_PROGRAMS: '@pulse_pending_programs',
};

export interface SyncStatus {
  isSyncing: boolean;
  lastSync: Date | null;
  pendingChanges: number;
  error: string | null;
}

/**
 * Workout Sessions Sync
 */
export class SessionsSyncService {
  /**
   * Push local sessions to Supabase
   */
  static async pushSessions(userId: string, sessions: WorkoutSession[]): Promise<void> {
    try {
      // Get pending sessions (not yet synced)
      const pendingJson = await AsyncStorage.getItem(SYNC_KEYS.PENDING_SESSIONS);
      const pendingIds: string[] = pendingJson ? JSON.parse(pendingJson) : [];

      const sessionsToSync = sessions.filter((s) => pendingIds.includes(s.id));

      if (sessionsToSync.length === 0) return;

      // Map to Supabase schema
      const supabaseSessions = sessionsToSync.map((session) => ({
        id: session.id,
        user_id: userId,
        date: session.date,
        preset: session.preset || null,
        work_seconds: session.workSeconds,
        rest_seconds: session.restSeconds,
        rounds: session.rounds,
        completed_rounds: session.completedRounds,
        total_work_time: session.totalWorkTime,
        completed: session.completed,
        calories_burned: session.caloriesBurned || null,
      }));

      // Upsert to Supabase (insert or update)
      const { error } = await supabase.from('workout_sessions').upsert(supabaseSessions);

      if (error) throw error;

      // Remove from pending list
      const newPending = pendingIds.filter(
        (id) => !sessionsToSync.some((s) => s.id === id)
      );
      await AsyncStorage.setItem(SYNC_KEYS.PENDING_SESSIONS, JSON.stringify(newPending));

      // Update last sync time
      await AsyncStorage.setItem(SYNC_KEYS.SESSIONS_LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Error pushing sessions:', error);
      throw error;
    }
  }

  /**
   * Pull sessions from Supabase
   */
  static async pullSessions(userId: string, lastSync: Date | null): Promise<WorkoutSession[]> {
    try {
      let query = supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      // Only pull sessions updated since last sync
      if (lastSync) {
        query = query.gt('updated_at', lastSync.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Map from Supabase schema to local schema
      const sessions: WorkoutSession[] = (data || []).map((row) => ({
        id: row.id,
        date: row.date,
        preset: row.preset,
        workSeconds: row.work_seconds,
        restSeconds: row.rest_seconds,
        rounds: row.rounds,
        completedRounds: row.completed_rounds,
        totalWorkTime: row.total_work_time,
        completed: row.completed,
        caloriesBurned: row.calories_burned,
      }));

      return sessions;
    } catch (error) {
      console.error('Error pulling sessions:', error);
      throw error;
    }
  }

  /**
   * Mark session as pending sync
   */
  static async markSessionPending(sessionId: string): Promise<void> {
    const pendingJson = await AsyncStorage.getItem(SYNC_KEYS.PENDING_SESSIONS);
    const pending: string[] = pendingJson ? JSON.parse(pendingJson) : [];

    if (!pending.includes(sessionId)) {
      pending.push(sessionId);
      await AsyncStorage.setItem(SYNC_KEYS.PENDING_SESSIONS, JSON.stringify(pending));
    }
  }
}

/**
 * Presets Sync
 */
export class PresetsSyncService {
  /**
   * Push local presets to Supabase
   */
  static async pushPresets(userId: string, presets: Preset[]): Promise<void> {
    try {
      const pendingJson = await AsyncStorage.getItem(SYNC_KEYS.PENDING_PRESETS);
      const pendingIds: string[] = pendingJson ? JSON.parse(pendingJson) : [];

      // Only sync non-default custom presets
      const presetsToSync = presets.filter(
        (p) => !p.isDefault && pendingIds.includes(p.id)
      );

      if (presetsToSync.length === 0) return;

      const supabasePresets = presetsToSync.map((preset) => ({
        id: preset.id,
        user_id: userId,
        name: preset.name,
        work_seconds: preset.workSeconds,
        rest_seconds: preset.restSeconds,
        rounds: preset.rounds,
        is_favorite: preset.isFavorite,
        is_default: preset.isDefault || false,
      }));

      const { error } = await supabase.from('presets').upsert(supabasePresets);

      if (error) throw error;

      // Remove from pending list
      const newPending = pendingIds.filter((id) => !presetsToSync.some((p) => p.id === id));
      await AsyncStorage.setItem(SYNC_KEYS.PENDING_PRESETS, JSON.stringify(newPending));

      await AsyncStorage.setItem(SYNC_KEYS.PRESETS_LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Error pushing presets:', error);
      throw error;
    }
  }

  /**
   * Pull presets from Supabase
   */
  static async pullPresets(userId: string, lastSync: Date | null): Promise<Preset[]> {
    try {
      let query = supabase.from('presets').select('*').eq('user_id', userId);

      if (lastSync) {
        query = query.gt('updated_at', lastSync.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      const presets: Preset[] = (data || []).map((row) => ({
        id: row.id,
        name: row.name,
        workSeconds: row.work_seconds,
        restSeconds: row.rest_seconds,
        rounds: row.rounds,
        isFavorite: row.is_favorite,
        isDefault: row.is_default,
      }));

      return presets;
    } catch (error) {
      console.error('Error pulling presets:', error);
      throw error;
    }
  }

  /**
   * Delete preset from Supabase
   */
  static async deletePreset(presetId: string): Promise<void> {
    try {
      const { error } = await supabase.from('presets').delete().eq('id', presetId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting preset:', error);
      throw error;
    }
  }

  /**
   * Mark preset as pending sync
   */
  static async markPresetPending(presetId: string): Promise<void> {
    const pendingJson = await AsyncStorage.getItem(SYNC_KEYS.PENDING_PRESETS);
    const pending: string[] = pendingJson ? JSON.parse(pendingJson) : [];

    if (!pending.includes(presetId)) {
      pending.push(presetId);
      await AsyncStorage.setItem(SYNC_KEYS.PENDING_PRESETS, JSON.stringify(pending));
    }
  }
}

/**
 * Program Progress Sync
 */
export class ProgramProgressSyncService {
  /**
   * Push program progress to Supabase
   */
  static async pushProgress(userId: string, progress: ProgramProgress[]): Promise<void> {
    try {
      const pendingJson = await AsyncStorage.getItem(SYNC_KEYS.PENDING_PROGRAMS);
      const pendingIds: string[] = pendingJson ? JSON.parse(pendingJson) : [];

      const progressToSync = progress.filter((p) => pendingIds.includes(p.programId));

      if (progressToSync.length === 0) return;

      const supabaseProgress = progressToSync.map((prog) => ({
        user_id: userId,
        program_id: prog.programId,
        start_date: prog.startDate,
        completed_workouts: prog.completedWorkouts,
        current_week: prog.currentWeek,
        is_active: prog.isActive,
      }));

      const { error } = await supabase.from('program_progress').upsert(supabaseProgress);

      if (error) throw error;

      const newPending = pendingIds.filter(
        (id) => !progressToSync.some((p) => p.programId === id)
      );
      await AsyncStorage.setItem(SYNC_KEYS.PENDING_PROGRAMS, JSON.stringify(newPending));

      await AsyncStorage.setItem(SYNC_KEYS.PROGRAMS_LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Error pushing program progress:', error);
      throw error;
    }
  }

  /**
   * Pull program progress from Supabase
   */
  static async pullProgress(
    userId: string,
    lastSync: Date | null
  ): Promise<ProgramProgress[]> {
    try {
      let query = supabase.from('program_progress').select('*').eq('user_id', userId);

      if (lastSync) {
        query = query.gt('updated_at', lastSync.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      const progress: ProgramProgress[] = (data || []).map((row) => ({
        programId: row.program_id,
        startDate: row.start_date,
        completedWorkouts: row.completed_workouts,
        currentWeek: row.current_week,
        isActive: row.is_active,
      }));

      return progress;
    } catch (error) {
      console.error('Error pulling program progress:', error);
      throw error;
    }
  }

  /**
   * Mark progress as pending sync
   */
  static async markProgressPending(programId: string): Promise<void> {
    const pendingJson = await AsyncStorage.getItem(SYNC_KEYS.PENDING_PROGRAMS);
    const pending: string[] = pendingJson ? JSON.parse(pendingJson) : [];

    if (!pending.includes(programId)) {
      pending.push(programId);
      await AsyncStorage.setItem(SYNC_KEYS.PENDING_PROGRAMS, JSON.stringify(pending));
    }
  }
}

/**
 * Get sync status for UI
 */
export async function getSyncStatus(): Promise<SyncStatus> {
  const [sessionsSync, presetsSync, programsSync, pendingSessions, pendingPresets, pendingPrograms] =
    await Promise.all([
      AsyncStorage.getItem(SYNC_KEYS.SESSIONS_LAST_SYNC),
      AsyncStorage.getItem(SYNC_KEYS.PRESETS_LAST_SYNC),
      AsyncStorage.getItem(SYNC_KEYS.PROGRAMS_LAST_SYNC),
      AsyncStorage.getItem(SYNC_KEYS.PENDING_SESSIONS),
      AsyncStorage.getItem(SYNC_KEYS.PENDING_PRESETS),
      AsyncStorage.getItem(SYNC_KEYS.PENDING_PROGRAMS),
    ]);

  const lastSyncDates = [sessionsSync, presetsSync, programsSync]
    .filter(Boolean)
    .map((s) => new Date(s!));

  const lastSync = lastSyncDates.length > 0 ? new Date(Math.max(...lastSyncDates.map((d) => d.getTime()))) : null;

  const pendingCount =
    (pendingSessions ? JSON.parse(pendingSessions).length : 0) +
    (pendingPresets ? JSON.parse(pendingPresets).length : 0) +
    (pendingPrograms ? JSON.parse(pendingPrograms).length : 0);

  return {
    isSyncing: false,
    lastSync,
    pendingChanges: pendingCount,
    error: null,
  };
}
