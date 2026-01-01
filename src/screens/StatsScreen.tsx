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
import { t } from '../i18n';

type StatsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Stats'>;
};

export const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
  const { sessions, getStats } = useSessions();
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
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>{t.streakDays}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statCardPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  sessionDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sessionDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
