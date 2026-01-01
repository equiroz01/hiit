import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList, Preset, TimerConfig } from '../types';
import { usePresets, useLastConfig, useSessions } from '../hooks/useStorage';
import { TimePicker, RoundPicker } from '../components/TimePicker';
import { PresetChip } from '../components/PresetChip';
import { Button } from '../components/Button';
import { getTotalWorkoutTime, formatTimeShort } from '../utils/time';
import { t } from '../i18n';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { presets } = usePresets();
  const { lastConfig, saveLastConfig } = useLastConfig();
  const { getStats } = useSessions();

  const [workSeconds, setWorkSeconds] = useState(lastConfig.workSeconds);
  const [restSeconds, setRestSeconds] = useState(lastConfig.restSeconds);
  const [rounds, setRounds] = useState(lastConfig.rounds);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);

  const stats = getStats();

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

  const totalTime = getTotalWorkoutTime(workSeconds, restSeconds, rounds);
  const favoritePresets = presets.filter(p => p.isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.appName}</Text>
          <TouchableOpacity
            style={styles.statsButton}
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.statsButtonText}>
              {stats.streak > 0 ? `${stats.streak} ${t.days}` : t.stats}
            </Text>
          </TouchableOpacity>
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

        {/* Custom Config */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.custom}</Text>
          <View style={styles.configCard}>
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

        {/* Total Time */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{t.totalTime}</Text>
          <Text style={styles.totalValue}>{formatTimeShort(totalTime)}</Text>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
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
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  statsButton: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statsCard: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statsCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
  },
  presetsContainer: {
    paddingVertical: 4,
  },
  configCard: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 34,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    width: '100%',
  },
});
