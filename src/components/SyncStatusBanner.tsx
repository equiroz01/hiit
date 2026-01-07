import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useSync } from '../hooks/useSync';
import { useTranslations } from '../i18n';

/**
 * Sync Status Banner
 * Shows at the top of screens to indicate sync status
 */
export const SyncStatusBanner: React.FC = () => {
  const { isSyncing, lastSync, pendingChanges, syncError, triggerSync } = useSync();
  const { t } = useTranslations();

  // Don't show if nothing to display
  if (!isSyncing && !syncError && pendingChanges === 0) {
    return null;
  }

  const getStatusText = () => {
    if (isSyncing) return 'Syncing...';
    if (syncError) return `Sync error: ${syncError}`;
    if (pendingChanges > 0) return `${pendingChanges} changes pending`;
    return 'Synced';
  };

  const getStatusColor = () => {
    if (syncError) return '#F44336'; // Red
    if (pendingChanges > 0) return '#FF9800'; // Orange
    return '#4CAF50'; // Green
  };

  const formatLastSync = () => {
    if (!lastSync) return '';

    const now = new Date();
    const diff = now.getTime() - new Date(lastSync).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(lastSync).toLocaleDateString();
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getStatusColor() }]}
      onPress={triggerSync}
      activeOpacity={0.8}
      disabled={isSyncing}
    >
      <View style={styles.content}>
        {isSyncing ? (
          <ActivityIndicator size="small" color={colors.textLight} style={styles.icon} />
        ) : (
          <Text style={styles.icon}>☁️</Text>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
          {lastSync && !isSyncing && (
            <Text style={styles.lastSyncText}>{formatLastSync()}</Text>
          )}
        </View>
        {!isSyncing && (
          <Text style={styles.arrow}>↻</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  lastSyncText: {
    fontSize: 11,
    color: colors.textLight,
    opacity: 0.8,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: colors.textLight,
    fontWeight: '700',
  },
});
