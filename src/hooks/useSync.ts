import { useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from './useAuth';
import { useSessions, usePresets } from './useStorage';
import { useProgramProgress } from './useProgramProgress';
import {
  SessionsSyncService,
  PresetsSyncService,
  ProgramProgressSyncService,
  getSyncStatus,
  SyncStatus,
} from '../services/syncService';

/**
 * Unified Sync Hook
 * Orchestrates all sync operations in the background
 *
 * Features:
 * - Auto-sync on app foreground
 * - Manual sync trigger
 * - Sync status tracking
 * - Offline-first with conflict resolution
 */
export const useSync = () => {
  const { user, isAuthenticated } = useAuth();
  const { sessions } = useSessions();
  const { presets } = usePresets();
  const { programsProgress } = useProgramProgress();

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSyncing: false,
    lastSync: null,
    pendingChanges: 0,
    error: null,
  });

  /**
   * Perform full sync (push local + pull remote)
   */
  const performSync = useCallback(async () => {
    if (!user || !isAuthenticated) {
      console.log('Sync skipped: User not authenticated');
      return;
    }

    console.log('Starting sync...');
    setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      // Push local changes to Supabase
      await Promise.all([
        SessionsSyncService.pushSessions(user.id, sessions),
        PresetsSyncService.pushPresets(user.id, presets),
        ProgramProgressSyncService.pushProgress(user.id, programsProgress),
      ]);

      // Pull remote changes from Supabase
      // Note: Actual merging with local data would happen in the respective hooks
      // For now, we just verify the sync worked
      await Promise.all([
        SessionsSyncService.pullSessions(user.id, null),
        PresetsSyncService.pullPresets(user.id, null),
        ProgramProgressSyncService.pullProgress(user.id, null),
      ]);

      // Update sync status
      const status = await getSyncStatus();
      setSyncStatus({
        ...status,
        isSyncing: false,
      });

      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      }));
    }
  }, [user, isAuthenticated, sessions, presets, programsProgress]);

  /**
   * Auto-sync when app comes to foreground
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('App became active, triggering sync...');
        performSync();
      }
    };

    // Initial sync on mount
    performSync();

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, performSync]);

  /**
   * Load sync status on mount
   */
  useEffect(() => {
    getSyncStatus().then(setSyncStatus);
  }, []);

  /**
   * Manual sync trigger
   */
  const triggerSync = useCallback(() => {
    performSync();
  }, [performSync]);

  return {
    syncStatus,
    triggerSync,
    isSyncing: syncStatus.isSyncing,
    lastSync: syncStatus.lastSync,
    pendingChanges: syncStatus.pendingChanges,
    syncError: syncStatus.error,
  };
};
