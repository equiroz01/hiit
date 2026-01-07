import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';
import { useTimer } from '../hooks/useTimer';
import { useSessions } from '../hooks/useStorage';
import { useHealthSync } from '../hooks/useHealthSync';
import { useUserProfile } from '../hooks/useUserProfile';
import { useProgramProgress } from '../hooks/useProgramProgress';
import { Button } from '../components/Button';
import { ProgressDots } from '../components/ProgressDots';
import { formatTime } from '../utils/time';
import { calculateCaloriesBurned } from '../utils/calories';
import { useTranslations } from '../i18n';
import { useResponsive } from '../hooks/useResponsive';

type TimerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Timer'>;
  route: RouteProp<RootStackParamList, 'Timer'>;
};

export const TimerScreen: React.FC<TimerScreenProps> = ({ navigation, route }) => {
  const { config, presetName, fromProgram } = route.params;
  const { saveSession } = useSessions();
  const { saveWorkout } = useHealthSync();
  const { profile } = useUserProfile();
  const { completeWorkout } = useProgramProgress();
  const { t, interpolate, getMotivationalPhrase } = useTranslations();
  const { isTablet, isLandscape, timerFontSize, containerPadding } = useResponsive();
  const [motivationalText, setMotivationalText] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);

  // Animaciones
  const motivationalScale = useRef(new Animated.Value(0)).current;
  const motivationalOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownScale = useRef(new Animated.Value(1)).current;

  const handleComplete = useCallback(
    async (completedRounds: number, totalWorkTime: number) => {
      // Calculate calories burned
      const totalRestTime = (completedRounds - 1) * config.restSeconds;
      const calories = calculateCaloriesBurned(profile, totalWorkTime, totalRestTime);
      setCaloriesBurned(calories);

      // Save to local storage
      const session = await saveSession({
        preset: presetName,
        workSeconds: config.workSeconds,
        restSeconds: config.restSeconds,
        rounds: config.rounds,
        completedRounds,
        totalWorkTime,
        completed: completedRounds >= config.rounds,
        caloriesBurned: calories,
      });

      // Sync to Health app if enabled and session was saved
      if (session) {
        const healthSaved = await saveWorkout(session);
        if (healthSaved) {
          console.log('Workout synced to Health app successfully');
        }
      }

      // Mark program workout as completed if this workout is from a program
      if (fromProgram && completedRounds >= config.rounds) {
        await completeWorkout(fromProgram.programId, fromProgram.day);
        console.log(`Program workout day ${fromProgram.day} marked as completed`);
      }
    },
    [config, presetName, fromProgram, saveSession, saveWorkout, profile, completeWorkout]
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

  // Animación de pulsación continua para el texto de fase
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, []);

  // Animación para texto motivacional (entrada con bounce)
  const animateMotivationalText = () => {
    // Reset
    motivationalScale.setValue(0);
    motivationalOpacity.setValue(0);

    // Animación de entrada con bounce
    Animated.parallel([
      Animated.spring(motivationalScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(motivationalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animación de countdown (3, 2, 1)
  useEffect(() => {
    if (state.secondsLeft <= 3 && state.secondsLeft > 0 && state.phase !== 'prepare') {
      // Animación de escala impactante
      Animated.sequence([
        Animated.timing(countdownScale, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(countdownScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state.secondsLeft, state.phase]);

  // Update motivational text based on phase and progress
  useEffect(() => {
    if (state.phase === 'prepare') {
      setMotivationalText('');
      return;
    }

    if (state.phase === 'finished') {
      setMotivationalText(getMotivationalPhrase('completed'));
      animateMotivationalText();
      return;
    }

    // Last round
    if (state.currentRound === config.rounds && state.phase === 'work') {
      setMotivationalText(getMotivationalPhrase('lastRound'));
      animateMotivationalText();
      return;
    }

    // Halfway
    if (state.currentRound === Math.ceil(config.rounds / 2) && state.secondsLeft === config.workSeconds) {
      setMotivationalText(getMotivationalPhrase('halfway'));
      animateMotivationalText();
      return;
    }

    // Regular phase change
    if (state.secondsLeft === (state.phase === 'work' ? config.workSeconds : config.restSeconds)) {
      setMotivationalText(getMotivationalPhrase(state.phase === 'work' ? 'work' : 'rest'));
      animateMotivationalText();
    }

    // Almost done countdown
    if (state.secondsLeft <= 3 && state.secondsLeft > 0) {
      setMotivationalText(getMotivationalPhrase('almostDone'));
      animateMotivationalText();
    }
  }, [state.phase, state.currentRound, state.secondsLeft, config, getMotivationalPhrase]);

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

  // Función para el color del TEXTO según la fase (para buen contraste)
  const getTextColor = (): string => {
    switch (state.phase) {
      case 'work':
        // Texto OSCURO sobre fondo verde claro
        return colors.text; // #030027
      case 'rest':
        // Texto OSCURO sobre fondo verde pastel claro
        return colors.text; // #030027
      case 'prepare':
        // Texto primary sobre fondo blanco
        return colors.primary; // #5465ff
      case 'finished':
        // Texto primary sobre fondo blanco
        return colors.primary; // #5465ff
      default:
        return colors.text;
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
        <Animated.Text
          style={[
            styles.phaseText,
            {
              color: getTextColor(),
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          {getPhaseLabel()}
        </Animated.Text>
      </View>

      {/* Motivational Text */}
      {motivationalText && state.phase !== 'prepare' && (
        <Animated.View
          style={[
            styles.motivationalContainer,
            {
              opacity: motivationalOpacity,
              transform: [{ scale: motivationalScale }]
            }
          ]}
        >
          <Text style={[styles.motivationalText, { color: getTextColor() }]}>
            {motivationalText}
          </Text>
        </Animated.View>
      )}

      {/* Timer Display */}
      <View style={[styles.timerContainer, isLandscape && styles.timerContainerLandscape]}>
        <Animated.Text
          style={[
            styles.timer,
            {
              fontSize: timerFontSize,
              transform: [{ scale: countdownScale }]
            },
            state.phase === 'finished' && styles.timerFinished
          ]}
        >
          {state.phase === 'finished' ? '00:00' : formatTime(state.secondsLeft)}
        </Animated.Text>
        {state.secondsLeft <= 3 && state.secondsLeft > 0 && state.phase !== 'prepare' && (
          <Animated.View
            style={[
              styles.countdownIndicator,
              {
                backgroundColor: getAccentColor(),
                transform: [{ scale: countdownScale }]
              }
            ]}
          />
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
          {caloriesBurned > 0 && (
            <View style={styles.caloriesContainer}>
              <Text style={styles.caloriesLabel}>{t.caloriesBurned}</Text>
              <Text style={styles.caloriesValue}>{caloriesBurned} kcal</Text>
            </View>
          )}
        </View>
      )}

      {/* Controls */}
      <View style={[
        styles.controls,
        isTablet && styles.controlsTablet,
        isLandscape && styles.controlsLandscape
      ]}>
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
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  roundText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 10,
  },
  phaseText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  motivationalContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  motivationalText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainerLandscape: {
    flex: 2,
  },
  timer: {
    fontWeight: '200',
    color: colors.text,
    fontVariant: ['tabular-nums'],
    textShadowColor: 'rgba(0, 0, 0, 0.08)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  timerFinished: {
    color: colors.primary,
  },
  countdownIndicator: {
    width: 80,
    height: 6,
    borderRadius: 3,
    marginTop: 24,
  },
  finishedContainer: {
    alignItems: 'center',
    paddingVertical: 44,
  },
  finishedTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  finishedSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  caloriesContainer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  caloriesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  caloriesValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.accent,
  },
  controls: {
    padding: 24,
    paddingBottom: 44,
  },
  controlsTablet: {
    paddingHorizontal: 60,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  controlsLandscape: {
    paddingBottom: 24,
  },
  mainButton: {
    width: '100%',
    marginBottom: 20,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
  },
});
