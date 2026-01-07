import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { RootStackParamList, ProgramWorkout } from '../types';
import { useTranslations, interpolate } from '../i18n';
import { usePremium } from '../hooks/usePremium';
import { getProgramById } from '../data/trainingPrograms';
import { useProgramProgress } from '../hooks/useProgramProgress';

type ProgramDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProgramDetail'>;
  route: RouteProp<RootStackParamList, 'ProgramDetail'>;
};

export const ProgramDetailScreen: React.FC<ProgramDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { programId } = route.params;
  const { t } = useTranslations();
  const { isPremium } = usePremium();
  const { isWorkoutCompleted, getCompletionPercentage, getNextWorkoutDay } = useProgramProgress();

  const program = getProgramById(programId);
  const [expandedWeek, setExpandedWeek] = useState<number>(1);

  if (!program) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Program not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{t.back}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Check if locked
  const isLocked = program.isPremium && !isPremium;

  // Get completion percentage
  const completionPercentage = getCompletionPercentage(program.id, program.workouts.length);

  // Group workouts by week
  const workoutsByWeek: { [week: number]: ProgramWorkout[] } = {};
  const workoutsPerWeek = program.workoutsPerWeek;

  program.workouts.forEach((workout, index) => {
    const week = Math.floor(index / workoutsPerWeek) + 1;
    if (!workoutsByWeek[week]) {
      workoutsByWeek[week] = [];
    }
    workoutsByWeek[week].push(workout);
  });

  const handleStartWorkout = (workout: ProgramWorkout) => {
    if (isLocked) {
      navigation.navigate('Paywall', { source: 'training_programs' });
      return;
    }

    navigation.navigate('Timer', {
      config: {
        workSeconds: workout.workSeconds,
        restSeconds: workout.restSeconds,
        rounds: workout.rounds,
      },
      presetName: workout.name,
      fromProgram: {
        programId: program.id,
        day: workout.day,
      },
    });
  };

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? -1 : week);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return colors.textSecondary;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return t.beginner;
      case 'intermediate':
        return t.intermediate;
      case 'advanced':
        return t.advanced;
      default:
        return difficulty;
    }
  };

  const getGoalText = (goal: string) => {
    switch (goal) {
      case 'weight_loss':
        return t.weightLoss;
      case 'endurance':
        return t.endurance;
      case 'strength':
        return t.strength;
      case 'muscle_gain':
        return t.muscleGain;
      case 'general_fitness':
        return t.generalFitness;
      default:
        return goal;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateWorkoutDuration = (workout: ProgramWorkout) => {
    const totalSeconds = (workout.workSeconds + workout.restSeconds) * workout.rounds;
    return Math.ceil(totalSeconds / 60);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonTop}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{program.name}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lock Overlay for Premium Programs */}
        {isLocked && (
          <View style={styles.lockBanner}>
            <Text style={styles.lockIcon}>🔒</Text>
            <View style={styles.lockContent}>
              <Text style={styles.lockTitle}>{t.programLocked}</Text>
              <Text style={styles.lockSubtitle}>{t.upgradeForPrograms}</Text>
            </View>
            <TouchableOpacity
              style={styles.unlockButton}
              onPress={() => navigation.navigate('Paywall', { source: 'training_programs' })}
            >
              <Text style={styles.unlockButtonText}>{t.upgradeToPremium}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Progress Bar */}
        {completionPercentage > 0 && !isLocked && (
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>{t.programProgress}</Text>
              <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${completionPercentage}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Program Info */}
        <View style={styles.infoCard}>
          <Text style={styles.description}>{program.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t.goal}</Text>
              <Text style={styles.metaValue}>{getGoalText(program.goal)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t.difficulty}</Text>
              <Text
                style={[
                  styles.metaValue,
                  { color: getDifficultyColor(program.difficulty) },
                ]}
              >
                {getDifficultyText(program.difficulty)}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{program.durationWeeks}</Text>
              <Text style={styles.statLabel}>{t.weeks}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{program.workoutsPerWeek}</Text>
              <Text style={styles.statLabel}>{t.workoutsPerWeekShort}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{program.workouts.length}</Text>
              <Text style={styles.statLabel}>{t.workouts}</Text>
            </View>
          </View>
        </View>

        {/* Workouts by Week */}
        {Object.keys(workoutsByWeek).map((weekStr) => {
          const week = parseInt(weekStr);
          const weekWorkouts = workoutsByWeek[week];
          const isExpanded = expandedWeek === week;

          return (
            <View key={week} style={styles.weekSection}>
              <TouchableOpacity
                style={styles.weekHeader}
                onPress={() => toggleWeek(week)}
                activeOpacity={0.7}
              >
                <View style={styles.weekHeaderLeft}>
                  <Text style={styles.weekTitle}>Week {week}</Text>
                  <Text style={styles.weekSubtitle}>
                    {weekWorkouts.length} {t.workouts}
                  </Text>
                </View>
                <Text style={styles.weekArrow}>{isExpanded ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.weekWorkouts}>
                  {weekWorkouts.map((workout, index) => {
                    const completed = isWorkoutCompleted(program.id, workout.day);
                    return (
                    <View key={workout.day} style={[
                      styles.workoutCard,
                      completed && styles.workoutCardCompleted
                    ]}>
                      {/* Completion Badge */}
                      {completed && (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedBadgeText}>✓</Text>
                        </View>
                      )}
                      <View style={styles.workoutHeader}>
                        <View style={styles.workoutHeaderLeft}>
                          <Text style={styles.workoutDay}>
                            {t.days} {((week - 1) * workoutsPerWeek) + index + 1}
                          </Text>
                          <Text style={styles.workoutName}>{workout.name}</Text>
                        </View>
                        <View style={styles.durationBadge}>
                          <Text style={styles.durationText}>
                            {calculateWorkoutDuration(workout)} {t.min}
                          </Text>
                        </View>
                      </View>

                      {workout.description && (
                        <Text style={styles.workoutDescription}>
                          {workout.description}
                        </Text>
                      )}

                      <View style={styles.workoutDetails}>
                        <View style={styles.workoutDetailItem}>
                          <Text style={styles.workoutDetailLabel}>{t.work}</Text>
                          <Text style={styles.workoutDetailValue}>
                            {formatTime(workout.workSeconds)}
                          </Text>
                        </View>
                        <View style={styles.workoutDetailItem}>
                          <Text style={styles.workoutDetailLabel}>{t.rest}</Text>
                          <Text style={styles.workoutDetailValue}>
                            {formatTime(workout.restSeconds)}
                          </Text>
                        </View>
                        <View style={styles.workoutDetailItem}>
                          <Text style={styles.workoutDetailLabel}>{t.rounds}</Text>
                          <Text style={styles.workoutDetailValue}>
                            {workout.rounds}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.startWorkoutButton,
                          isLocked && styles.startWorkoutButtonLocked,
                          completed && styles.startWorkoutButtonCompleted
                        ]}
                        onPress={() => handleStartWorkout(workout)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.startWorkoutText}>
                          {isLocked
                            ? '🔒 ' + t.unlockProgram
                            : completed
                            ? '✓ ' + t.workoutCompleted + ' · ' + t.startThisWorkout
                            : t.startThisWorkout
                          }
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )})}
                </View>
              )}
            </View>
          );
        })}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButtonTop: {
    marginRight: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: colors.text,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  lockBanner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  lockContent: {
    flex: 1,
  },
  lockTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 4,
  },
  lockSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.9,
  },
  unlockButton: {
    backgroundColor: colors.textLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 12,
  },
  unlockButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  progressCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  weekSection: {
    marginBottom: 16,
  },
  weekHeader: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekHeaderLeft: {
    flex: 1,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  weekSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  weekArrow: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  weekWorkouts: {
    marginTop: 8,
    paddingLeft: 12,
  },
  workoutCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    position: 'relative',
  },
  workoutCardCompleted: {
    borderLeftColor: '#4CAF50',
    opacity: 0.8,
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  completedBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workoutHeaderLeft: {
    flex: 1,
  },
  workoutDay: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: '600',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  durationBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  workoutDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  workoutDetails: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  workoutDetailItem: {
    flex: 1,
    alignItems: 'center',
  },
  workoutDetailLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  workoutDetailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  startWorkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startWorkoutButtonLocked: {
    backgroundColor: colors.textSecondary,
  },
  startWorkoutButtonCompleted: {
    backgroundColor: '#4CAF50',
  },
  startWorkoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
});
