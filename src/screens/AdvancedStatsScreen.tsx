import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';
import { useSessions } from '../hooks/useStorage';
import { usePremium } from '../hooks/usePremium';
import { useTranslations } from '../i18n';

type AdvancedStatsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdvancedStats'>;
};

export const AdvancedStatsScreen: React.FC<AdvancedStatsScreenProps> = ({ navigation }) => {
  const { sessions } = useSessions();
  const { isPremium } = usePremium();
  const { t } = useTranslations();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  const screenWidth = Dimensions.get('window').width;

  // Calculate stats
  const completedSessions = sessions.filter(s => s.completed);

  const totalWorkouts = completedSessions.length;
  const totalCalories = completedSessions.reduce((acc, s) => acc + (s.caloriesBurned || 0), 0);
  const totalMinutes = Math.round(completedSessions.reduce((acc, s) => acc + s.totalWorkTime, 0) / 60);
  const avgWorkoutTime = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  // Calculate longest streak
  const calculateLongestStreak = () => {
    if (completedSessions.length === 0) return 0;

    const sortedSessions = [...completedSessions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedSessions.length; i++) {
      const prevDate = new Date(sortedSessions[i - 1].date);
      const currDate = new Date(sortedSessions[i].date);
      prevDate.setHours(0, 0, 0, 0);
      currDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (dayDiff > 1) {
        currentStreak = 1;
      }
    }

    return longestStreak;
  };

  // Get data for charts
  const getChartData = () => {
    const now = new Date();
    let daysBack = 7;
    let labels: string[] = [];

    if (period === 'month') {
      daysBack = 30;
    } else if (period === 'year') {
      daysBack = 365;
    }

    const dataPoints = new Array(period === 'week' ? 7 : period === 'month' ? 4 : 12).fill(0);

    if (period === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en', { weekday: 'short' }));

        const dayWorkouts = completedSessions.filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate.toDateString() === date.toDateString();
        });

        dataPoints[6 - i] = dayWorkouts.length;
      }
    } else if (period === 'month') {
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7 + 6));
        labels.push(`W${4 - i}`);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const weekWorkouts = completedSessions.filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= weekStart && sessionDate <= weekEnd;
        });

        dataPoints[3 - i] = weekWorkouts.length;
      }
    } else {
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const month = new Date(now);
        month.setMonth(month.getMonth() - i);
        labels.push(month.toLocaleDateString('en', { month: 'short' }));

        const monthWorkouts = completedSessions.filter(s => {
          const sessionDate = new Date(s.date);
          return (
            sessionDate.getMonth() === month.getMonth() &&
            sessionDate.getFullYear() === month.getFullYear()
          );
        });

        dataPoints[11 - i] = monthWorkouts.length;
      }
    }

    return { labels, data: dataPoints };
  };

  const chartData = getChartData();

  // Export to CSV
  const exportToCSV = () => {
    if (!isPremium) {
      navigation.navigate('Paywall', { source: 'export_data' });
      return;
    }

    const csvHeader = 'Date,Work Time (s),Rest Time (s),Rounds,Total Work Time (s),Calories Burned\n';
    const csvRows = completedSessions.map(s => {
      const date = new Date(s.date).toLocaleDateString();
      return `${date},${s.workSeconds},${s.restSeconds},${s.rounds},${s.totalWorkTime},${s.caloriesBurned || 0}`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    Share.share({
      message: csvContent,
      title: 'Pulse HIIT - Workout Data',
    }).catch(error => {
      Alert.alert('Error', 'Failed to export data');
    });
  };

  if (!isPremium) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← {t.back}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{t.advancedStats}</Text>
          <View style={{ width: 80 }} />
        </View>

        <View style={styles.lockedContainer}>
          <Text style={styles.lockedIcon}>🔒</Text>
          <Text style={styles.lockedTitle}>{t.advancedStats}</Text>
          <Text style={styles.lockedSubtitle}>{t.upgradeForFullHistory}</Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => navigation.navigate('Paywall', { source: 'stats_history' })}
          >
            <Text style={styles.upgradeButtonText}>{t.upgradeToPremium}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t.advancedStats}</Text>
        <TouchableOpacity onPress={exportToCSV}>
          <Text style={styles.exportButton}>⬆️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* All-Time Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.allTime}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalWorkouts}</Text>
              <Text style={styles.statLabel}>{t.totalWorkouts}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalCalories}</Text>
              <Text style={styles.statLabel}>{t.calories}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{avgWorkoutTime} min</Text>
              <Text style={styles.statLabel}>{t.averageWorkoutTime}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{calculateLongestStreak()} {t.days}</Text>
              <Text style={styles.statLabel}>{t.longestStreak}</Text>
            </View>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, period === 'week' && styles.periodButtonActive]}
            onPress={() => setPeriod('week')}
          >
            <Text style={[styles.periodButtonText, period === 'week' && styles.periodButtonTextActive]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, period === 'month' && styles.periodButtonActive]}
            onPress={() => setPeriod('month')}
          >
            <Text style={[styles.periodButtonText, period === 'month' && styles.periodButtonTextActive]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, period === 'year' && styles.periodButtonActive]}
            onPress={() => setPeriod('year')}
          >
            <Text style={[styles.periodButtonText, period === 'year' && styles.periodButtonTextActive]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        {completedSessions.length > 0 ? (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{t.workoutsPerWeek}</Text>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [{ data: chartData.data.map(v => v || 0.1) }],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: colors.cardBackground,
                backgroundGradientFrom: colors.cardBackground,
                backgroundGradientTo: colors.cardBackground,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(${hexToRgb(colors.primary)}, ${opacity})`,
                labelColor: () => colors.text,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: colors.primary,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        ) : (
          <View style={styles.emptyChart}>
            <Text style={styles.emptyChartText}>{t.noDataAvailable}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
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
  exportButton: {
    fontSize: 24,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  periodButtonTextActive: {
    color: colors.textLight,
  },
  chartContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  chart: {
    borderRadius: 16,
  },
  emptyChart: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 40,
    alignItems: 'center',
  },
  emptyChartText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  lockedIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  lockedTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  lockedSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  upgradeButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  upgradeButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textLight,
  },
});
