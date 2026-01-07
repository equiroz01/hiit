import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/spacing';
import { RootStackParamList, Preset, TimerConfig } from '../types';
import { usePresets, useLastConfig, useSessions } from '../hooks/useStorage';
import { TimePicker, RoundPicker } from '../components/TimePicker';
import { PresetChip } from '../components/PresetChip';
import { Button } from '../components/Button';
import { getTotalWorkoutTime, formatTimeShort } from '../utils/time';
import { useTranslations } from '../i18n';
import { useResponsive } from '../hooks/useResponsive';
import { usePremium } from '../hooks/usePremium';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { presets, savePreset, canAddPreset, getPresetLimitInfo } = usePresets();
  const { lastConfig, saveLastConfig } = useLastConfig();
  const { getStats } = useSessions();
  const { isPremium } = usePremium();
  const { t, interpolate } = useTranslations();
  const { isTablet, containerPadding, cardPadding } = useResponsive();

  const [workSeconds, setWorkSeconds] = useState(lastConfig.workSeconds);
  const [restSeconds, setRestSeconds] = useState(lastConfig.restSeconds);
  const [rounds, setRounds] = useState(lastConfig.rounds);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);

  const stats = getStats();
  const presetLimitInfo = getPresetLimitInfo(isPremium);

  useEffect(() => {
    setWorkSeconds(lastConfig.workSeconds);
    setRestSeconds(lastConfig.restSeconds);
    setRounds(lastConfig.rounds);
  }, [lastConfig]);

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    setWorkSeconds(preset.workSeconds);
    setRestSeconds(preset.restSeconds);
    setRounds(preset.rounds);
  };

  const handleConfigChange = () => {
    setSelectedPreset(null);
  };

  const handleStart = () => {
    const config: TimerConfig = {
      workSeconds,
      restSeconds,
      rounds,
    };
    saveLastConfig({ workSeconds, restSeconds, rounds });
    navigation.navigate('Timer', {
      config,
      presetName: selectedPreset?.name,
    });
  };

  const handleSavePreset = () => {
    // Check if user can add more presets
    if (!canAddPreset(isPremium)) {
      // Show paywall
      Alert.alert(
        t.presetLimitReached,
        interpolate(t.presetLimitMessage, { limit: presetLimitInfo.limit || 3 }),
        [
          { text: t.cancel, style: 'cancel' },
          {
            text: t.upgradeToPremium,
            onPress: () => navigation.navigate('Paywall', { source: 'custom_presets' }),
          },
        ]
      );
      return;
    }

    // Prompt for preset name
    Alert.prompt(
      t.createPreset,
      'Enter a name for your custom preset:',
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.save,
          onPress: async (presetName: string | undefined) => {
            if (presetName && presetName.trim()) {
              await savePreset({
                name: presetName.trim(),
                workSeconds,
                restSeconds,
                rounds,
                isFavorite: false,
              });
              Alert.alert('Success!', `Preset "${presetName}" saved successfully.`);
            }
          },
        },
      ],
      'plain-text',
      '',
      'default'
    );
  };

  const totalTime = getTotalWorkoutTime(workSeconds, restSeconds, rounds);
  const favoritePresets = presets.filter(p => p.isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
          { padding: containerPadding }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.appName}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.headerButtonIcon}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statsButton}
              onPress={() => navigation.navigate('Stats')}
            >
              <Text style={styles.statsButtonText}>
                {stats.streak > 0 ? `${stats.streak} ${t.days}` : t.stats}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats Card */}
        {stats.weekWorkouts > 0 && (
          <View style={styles.statsCard}>
            <Text style={styles.statsCardText}>
              {t.thisWeek}: {stats.weekWorkouts} {t.workouts} · {stats.weekWorkMinutes} {t.min}
            </Text>
          </View>
        )}

        {/* Quick Presets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.quickWorkout}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Presets')}>
              <Text style={styles.seeAllText}>{t.seeAll}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.presetsContainer}
          >
            {favoritePresets.map(preset => (
              <PresetChip
                key={preset.id}
                preset={preset}
                onPress={() => handlePresetSelect(preset)}
                selected={selectedPreset?.id === preset.id}
              />
            ))}
          </ScrollView>
        </View>

        {/* Training Programs Button */}
        <TouchableOpacity
          style={styles.programsButton}
          onPress={() => navigation.navigate('Programs')}
          activeOpacity={0.8}
        >
          <View style={styles.programsButtonContent}>
            <Text style={styles.programsButtonIcon}>📋</Text>
            <View style={styles.programsButtonText}>
              <Text style={styles.programsButtonTitle}>{t.trainingPrograms}</Text>
              <Text style={styles.programsButtonSubtitle}>{t.browsePrograms}</Text>
            </View>
          </View>
          <Text style={styles.programsButtonArrow}>→</Text>
        </TouchableOpacity>

        {/* Custom Config */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.custom}</Text>
          <View style={[styles.configCard, { padding: cardPadding }]}>
            <TimePicker
              label={t.work}
              value={workSeconds}
              onChange={(v) => {
                setWorkSeconds(v);
                handleConfigChange();
              }}
            />
            <TimePicker
              label={t.rest}
              value={restSeconds}
              onChange={(v) => {
                setRestSeconds(v);
                handleConfigChange();
              }}
            />
            <RoundPicker
              label={t.rounds}
              value={rounds}
              onChange={(v) => {
                setRounds(v);
                handleConfigChange();
              }}
            />
          </View>
        </View>

        {/* Save Preset Button */}
        <TouchableOpacity
          style={styles.savePresetButton}
          onPress={handleSavePreset}
          activeOpacity={0.7}
        >
          <Text style={styles.savePresetText}>💾 {t.createPreset}</Text>
          <Text style={styles.savePresetHint}>
            {presetLimitInfo.isUnlimited
              ? t.unlimited
              : interpolate(t.presetsUsed, {
                  current: presetLimitInfo.current,
                  limit: presetLimitInfo.limit || 3,
                })}
          </Text>
        </TouchableOpacity>

        {/* Total Time */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{t.totalTime}</Text>
          <Text style={styles.totalValue}>{formatTimeShort(totalTime)}</Text>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={[styles.footer, isTablet && styles.footerTablet]}>
        <Button
          title={t.start}
          onPress={handleStart}
          size="large"
          style={styles.startButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  scrollContentTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  headerButtonIcon: {
    fontSize: 20,
  },
  statsButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: borderRadius.full,
    ...shadows.primary,
  },
  statsButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
  statsCard: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: borderRadius.lg,
    marginBottom: 28,
    ...shadows.primary,
  },
  statsCardText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '700',
  },
  presetsContainer: {
    paddingVertical: 6,
  },
  programsButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.xl,
    padding: 20,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  programsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  programsButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  programsButtonText: {
    flex: 1,
  },
  programsButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 4,
  },
  programsButtonSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.9,
  },
  programsButtonArrow: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: '700',
    marginLeft: 12,
  },
  configCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  savePresetButton: {
    backgroundColor: colors.cardBackground,
    padding: 18,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  savePresetText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  savePresetHint: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: colors.background,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  startButton: {
    width: '100%',
  },
  footerTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
});
