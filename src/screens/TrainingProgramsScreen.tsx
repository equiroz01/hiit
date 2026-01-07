import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList, TrainingProgram } from '../types';
import { useTranslations } from '../i18n';
import { usePremium } from '../hooks/usePremium';
import { TRAINING_PROGRAMS } from '../data/trainingPrograms';

type TrainingProgramsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Programs'>;
};

export const TrainingProgramsScreen: React.FC<TrainingProgramsScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslations();
  const { isPremium } = usePremium();

  const freePrograms = TRAINING_PROGRAMS.filter(p => !p.isPremium);
  const premiumPrograms = TRAINING_PROGRAMS.filter(p => p.isPremium);

  const handleProgramPress = (program: TrainingProgram) => {
    if (program.isPremium && !isPremium) {
      // Navigate to paywall
      navigation.navigate('Paywall', { source: 'training_programs' });
    } else {
      // Navigate to program details
      navigation.navigate('ProgramDetail', { programId: program.id });
    }
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

  const renderProgramCard = (program: TrainingProgram) => {
    const isLocked = program.isPremium && !isPremium;

    return (
      <TouchableOpacity
        key={program.id}
        style={[styles.programCard, isLocked && styles.programCardLocked]}
        onPress={() => handleProgramPress(program)}
        activeOpacity={0.7}
      >
        {/* Premium Badge */}
        {program.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>{t.premiumProgram}</Text>
          </View>
        )}

        {/* Lock Overlay */}
        {isLocked && (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}

        <View style={styles.programHeader}>
          <Text style={styles.programName}>{program.name}</Text>
          <View style={styles.programMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t.goal}:</Text>
              <Text style={styles.metaValue}>{getGoalText(program.goal)}</Text>
            </View>
            <View style={[styles.metaItem, styles.metaItemRight]}>
              <Text style={styles.metaLabel}>{t.difficulty}:</Text>
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
        </View>

        <Text style={styles.programDescription}>{program.description}</Text>

        <View style={styles.programStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{program.durationWeeks}</Text>
            <Text style={styles.statLabel}>{t.weeks}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{program.workoutsPerWeek}</Text>
            <Text style={styles.statLabel}>{t.workoutsPerWeekShort}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{program.workouts.length}</Text>
            <Text style={styles.statLabel}>{t.workouts}</Text>
          </View>
        </View>

        <View style={styles.programFooter}>
          <TouchableOpacity
            style={[styles.startButton, isLocked && styles.startButtonLocked]}
            onPress={() => handleProgramPress(program)}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>
              {isLocked ? t.unlockProgram : t.startProgram}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.programs}</Text>
        <Text style={styles.subtitle}>{t.browsePrograms}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Free Programs Section */}
        {freePrograms.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t.freeProgram}</Text>
              <Text style={styles.sectionSubtitle}>
                {freePrograms.length} {t.programs.toLowerCase()}
              </Text>
            </View>
            {freePrograms.map(renderProgramCard)}
          </View>
        )}

        {/* Premium Programs Section */}
        {premiumPrograms.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>{t.premiumProgram}</Text>
                {!isPremium && (
                  <TouchableOpacity
                    style={styles.upgradeButton}
                    onPress={() => navigation.navigate('Paywall', { source: 'training_programs' })}
                  >
                    <Text style={styles.upgradeButtonText}>⭐ {t.upgradeToPremium}</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.sectionSubtitle}>
                {premiumPrograms.length} {t.programs.toLowerCase()}
              </Text>
            </View>
            {premiumPrograms.map(renderProgramCard)}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  upgradeButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textLight,
  },
  programCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  programCardLocked: {
    opacity: 0.7,
  },
  premiumBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },
  premiumBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
  },
  lockOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  lockIcon: {
    fontSize: 28,
  },
  programHeader: {
    marginBottom: 12,
  },
  programName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  programMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaItemRight: {
    justifyContent: 'flex-end',
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginRight: 4,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  programDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  programStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  programFooter: {
    marginTop: 4,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  startButtonLocked: {
    backgroundColor: colors.textSecondary,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
});
