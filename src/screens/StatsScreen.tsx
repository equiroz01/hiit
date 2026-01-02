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
import { RootStackParamList } from '../types';
import { useSessions } from '../hooks/useStorage';
import { useTranslations } from '../i18n';

type StatsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Stats'>;
};

export const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
  const { sessions, getStats } = useSessions();
  const { t } = useTranslations();
  const stats = getStats();

  const recentSessions = sessions
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
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statCardPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.border,
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
});
