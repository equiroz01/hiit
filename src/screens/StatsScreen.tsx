import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/spacing';
import { RootStackParamList } from '../types';
import { useSessions } from '../hooks/useStorage';
import { usePremium } from '../hooks/usePremium';
import { useTranslations } from '../i18n';

type StatsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Stats'>;
};

export const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
  const { sessions, getStats, getFilteredSessions, getStatsLimitInfo } = useSessions();
  const { isPremium } = usePremium();
  const { t, interpolate } = useTranslations();

  const stats = getStats();
  const statsLimitInfo = getStatsLimitInfo(isPremium);
  const visibleSessions = getFilteredSessions(isPremium);

  const recentSessions = visibleSessions
    .filter(s => s.completed)
    .slice(-5)
    .reverse();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return t.today;
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return t.yesterday;
    }
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t.statistics}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Limit Banner - FREE USERS */}
        {statsLimitInfo.isLimited && (
          <TouchableOpacity
            style={styles.limitBanner}
            onPress={() => navigation.navigate('Paywall', { source: 'stats_history' })}
            activeOpacity={0.7}
          >
            <View style={styles.limitBannerContent}>
              <Text style={styles.limitBannerText}>{t.unlockFullHistory}</Text>
              <Text style={styles.limitBannerSubtext}>
                {interpolate(t.workoutsHidden, { count: statsLimitInfo.hiddenSessions })} · {t.upgradeForFullHistory}
              </Text>
            </View>
            <Text style={styles.limitBannerArrow}>→</Text>
          </TouchableOpacity>
        )}

        {/* Premium Badge - PREMIUM USERS */}
        {isPremium && sessions.length > 7 && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>
              ⭐ {t.completeHistory} · {sessions.filter(s => s.completed).length} {t.workouts}
            </Text>
          </View>
        )}

        {/* Advanced Stats Button */}
        {sessions.length > 0 && (
          <TouchableOpacity
            style={styles.advancedStatsButton}
            onPress={() => {
              if (isPremium) {
                navigation.navigate('AdvancedStats');
              } else {
                navigation.navigate('Paywall', { source: 'stats_history' });
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.advancedStatsText}>{t.viewAdvancedStats}</Text>
            <Text style={styles.advancedStatsArrow}>→</Text>
          </TouchableOpacity>
        )}

        {/* Main Stats */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Text style={[styles.statValue, styles.statValueLight]}>{stats.streak}</Text>
            <Text style={[styles.statLabel, styles.statLabelLight]}>{t.streakDays}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.todayWorkouts}</Text>
            <Text style={styles.statLabel}>{t.todayWorkouts}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.weekWorkouts}</Text>
            <Text style={styles.statLabel}>{t.thisWeekLabel}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.weekWorkMinutes}</Text>
            <Text style={styles.statLabel}>{t.workMinutes}</Text>
          </View>
        </View>

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.recentWorkouts}</Text>
            {recentSessions.map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionName}>
                    {session.preset || t.custom}
                  </Text>
                  <Text style={styles.sessionDetails}>
                    {session.completedRounds} {t.roundsLabel} · {Math.round(session.totalWorkTime / 60)} {t.min}
                  </Text>
                </View>
                <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
              </View>
            ))}
          </View>
        )}

        {sessions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t.noWorkoutsYet}</Text>
            <Text style={styles.emptySubtitle}>{t.completeFirst}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 24,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.sm,
  },
  statCardPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.primary,
  },
  statValue: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  statValueLight: {
    color: colors.textLight,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statLabelLight: {
    color: colors.textLight,
    opacity: 0.9,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 18,
    borderRadius: borderRadius.lg,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sessionDetails: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  sessionDate: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 70,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  limitBanner: {
    backgroundColor: colors.accent,
    marginBottom: 20,
    padding: 18,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.md,
  },
  limitBannerContent: {
    flex: 1,
  },
  limitBannerText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textLight,
    marginBottom: 4,
  },
  limitBannerSubtext: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
    opacity: 0.9,
  },
  limitBannerArrow: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: '700',
  },
  premiumBadge: {
    backgroundColor: colors.primary,
    marginBottom: 20,
    padding: 14,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.primary,
  },
  premiumBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
  advancedStatsButton: {
    backgroundColor: colors.primary,
    marginBottom: 20,
    padding: 18,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.primary,
  },
  advancedStatsText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
  advancedStatsArrow: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: '700',
  },
});
