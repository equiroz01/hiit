import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';
import { useTimer } from '../hooks/useTimer';
import { useSessions } from '../hooks/useStorage';
import { Button } from '../components/Button';
import { ProgressDots } from '../components/ProgressDots';
import { formatTime } from '../utils/time';
import { t, interpolate, getMotivationalPhrase } from '../i18n';

type TimerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Timer'>;
  route: RouteProp<RootStackParamList, 'Timer'>;
};

export const TimerScreen: React.FC<TimerScreenProps> = ({ navigation, route }) => {
  const { config, presetName } = route.params;
  const { saveSession } = useSessions();
  const [motivationalText, setMotivationalText] = useState('');

  const handleComplete = useCallback(
    async (completedRounds: number, totalWorkTime: number) => {
      await saveSession({
        preset: presetName,
        workSeconds: config.workSeconds,
        restSeconds: config.restSeconds,
        rounds: config.rounds,
        completedRounds,
        totalWorkTime,
        completed: completedRounds >= config.rounds,
      });
    },
    [config, presetName, saveSession]
  );

  const { state, start, pause, resume, reset, stop } = useTimer({
    config,
    onComplete: handleComplete,
  });

  // Keep screen awake during workout
  useEffect(() => {
    activateKeepAwakeAsync();
    return () => {
      deactivateKeepAwake();
    };
  }, []);

  // Auto-start on mount
  useEffect(() => {
    start();
  }, [start]);

  // Update motivational text based on phase and progress
  useEffect(() => {
    if (state.phase === 'prepare') {
      setMotivationalText('');
      return;
    }

    if (state.phase === 'finished') {
      setMotivationalText(getMotivationalPhrase('completed'));
      return;
    }

    // Last round
    if (state.currentRound === config.rounds && state.phase === 'work') {
      setMotivationalText(getMotivationalPhrase('lastRound'));
      return;
    }

    // Halfway
    if (state.currentRound === Math.ceil(config.rounds / 2) && state.secondsLeft === config.workSeconds) {
      setMotivationalText(getMotivationalPhrase('halfway'));
      return;
    }

    // Regular phase change
    if (state.secondsLeft === (state.phase === 'work' ? config.workSeconds : config.restSeconds)) {
      setMotivationalText(getMotivationalPhrase(state.phase === 'work' ? 'work' : 'rest'));
    }

    // Almost done countdown
    if (state.secondsLeft <= 3 && state.secondsLeft > 0) {
      setMotivationalText(getMotivationalPhrase('almostDone'));
    }
  }, [state.phase, state.currentRound, state.secondsLeft, config]);

  // Handle back button
  useEffect(() => {
    const backAction = () => {
      if (state.isRunning && !state.isPaused) {
        pause();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [state.isRunning, state.isPaused, pause]);

  const handleExit = () => {
    if (state.phase !== 'finished' && state.currentRound > 0) {
      stop();
    }
    navigation.goBack();
  };

  const getPhaseLabel = (): string => {
    switch (state.phase) {
      case 'prepare':
        return t.prepare;
      case 'work':
        return t.working;
      case 'rest':
        return t.resting;
      case 'finished':
        return t.completed;
      default:
        return '';
    }
  };

  const getBackgroundColor = (): string => {
    switch (state.phase) {
      case 'prepare':
        return colors.background;
      case 'work':
        return colors.workTint;
      case 'rest':
        return colors.restTint;
      case 'finished':
        return colors.background;
      default:
        return colors.background;
    }
  };

  const getAccentColor = (): string => {
    switch (state.phase) {
      case 'work':
        return colors.work;
      case 'rest':
        return colors.rest;
      default:
        return colors.primary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={getBackgroundColor()}
      />

      {/* Header */}
      <View style={styles.header}>
        {state.phase !== 'finished' && (
          <Text style={styles.roundText}>
            {interpolate(t.roundOf, { current: state.currentRound, total: config.rounds })}
          </Text>
        )}
        <Text style={[styles.phaseText, { color: getAccentColor() }]}>
          {getPhaseLabel()}
        </Text>
      </View>

      {/* Motivational Text */}
      {motivationalText && state.phase !== 'prepare' && (
        <View style={styles.motivationalContainer}>
          <Text style={[styles.motivationalText, { color: getAccentColor() }]}>
            {motivationalText}
          </Text>
        </View>
      )}

      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={[styles.timer, state.phase === 'finished' && styles.timerFinished]}>
          {state.phase === 'finished' ? '00:00' : formatTime(state.secondsLeft)}
        </Text>
        {state.secondsLeft <= 3 && state.secondsLeft > 0 && state.phase !== 'prepare' && (
          <View style={[styles.countdownIndicator, { backgroundColor: getAccentColor() }]} />
        )}
      </View>

      {/* Progress */}
      {state.phase !== 'finished' && (
        <ProgressDots
          total={config.rounds}
          current={state.currentRound}
          phase={state.phase}
        />
      )}

      {/* Finished Message */}
      {state.phase === 'finished' && (
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedTitle}>{t.excellent}</Text>
          <Text style={styles.finishedSubtitle}>
            {interpolate(t.roundsCompleted, { rounds: config.rounds })}
          </Text>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        {state.phase === 'finished' ? (
          <Button
            title={t.back}
            onPress={handleExit}
            size="large"
            style={styles.mainButton}
          />
        ) : (
          <>
            {state.isPaused ? (
              <Button
                title={t.resume}
                onPress={resume}
                size="large"
                style={styles.mainButton}
              />
            ) : (
              <Button
                title={t.pause}
                onPress={pause}
                variant="outline"
                size="large"
                style={styles.mainButton}
              />
            )}
            <View style={styles.secondaryControls}>
              <Button
                title={t.reset}
                onPress={reset}
                variant="ghost"
              />
              <Button
                title={t.finish}
                onPress={handleExit}
                variant="ghost"
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  roundText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  phaseText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  motivationalContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  motivationalText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 120,
    fontWeight: '200',
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  timerFinished: {
    color: colors.primary,
  },
  countdownIndicator: {
    width: 60,
    height: 4,
    borderRadius: 2,
    marginTop: 20,
  },
  finishedContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  finishedTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  finishedSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  controls: {
    padding: 20,
    paddingBottom: 40,
  },
  mainButton: {
    width: '100%',
    marginBottom: 16,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
});
