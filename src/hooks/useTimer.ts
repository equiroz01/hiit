import { useCallback, useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { TimerConfig, TimerState, Phase } from '../types';

const PREPARE_SECONDS = 5;

interface UseTimerProps {
  config: TimerConfig;
  onComplete: (completedRounds: number, totalWorkTime: number) => void;
}

export const useTimer = ({ config, onComplete }: UseTimerProps) => {
  const [state, setState] = useState<TimerState>({
    phase: 'prepare',
    currentRound: 1,
    secondsLeft: PREPARE_SECONDS,
    isRunning: false,
    isPaused: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const workTimeRef = useRef(0);

  // Load sound
  useEffect(() => {
    const loadSound = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
      } catch (error) {
        console.error('Error setting audio mode:', error);
      }
    };
    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const triggerFeedback = useCallback(async (type: 'phase' | 'complete' | 'countdown') => {
    try {
      switch (type) {
        case 'phase':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'complete':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          await new Promise(resolve => setTimeout(resolve, 200));
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          await new Promise(resolve => setTimeout(resolve, 200));
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'countdown':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
      }
    } catch (error) {
      // Haptics not available
    }
  }, []);

  const tick = useCallback(() => {
    setState(prev => {
      if (!prev.isRunning || prev.isPaused) return prev;

      const newSecondsLeft = prev.secondsLeft - 1;

      // Countdown feedback for last 3 seconds
      if (newSecondsLeft <= 3 && newSecondsLeft > 0) {
        triggerFeedback('countdown');
      }

      // Time's up for current phase
      if (newSecondsLeft <= 0) {
        if (prev.phase === 'prepare') {
          // Start work phase
          triggerFeedback('phase');
          return {
            ...prev,
            phase: 'work' as Phase,
            secondsLeft: config.workSeconds,
          };
        }

        if (prev.phase === 'work') {
          // Track work time
          workTimeRef.current += config.workSeconds;

          // Check if this was the last round
          if (prev.currentRound >= config.rounds) {
            triggerFeedback('complete');
            return {
              ...prev,
              phase: 'finished' as Phase,
              secondsLeft: 0,
              isRunning: false,
            };
          }

          // Move to rest
          triggerFeedback('phase');
          return {
            ...prev,
            phase: 'rest' as Phase,
            secondsLeft: config.restSeconds,
          };
        }

        if (prev.phase === 'rest') {
          // Move to next round
          triggerFeedback('phase');
          return {
            ...prev,
            phase: 'work' as Phase,
            currentRound: prev.currentRound + 1,
            secondsLeft: config.workSeconds,
          };
        }
      }

      return {
        ...prev,
        secondsLeft: newSecondsLeft,
      };
    });
  }, [config, triggerFeedback]);

  // Timer interval
  useEffect(() => {
    if (state.isRunning && !state.isPaused && state.phase !== 'finished') {
      intervalRef.current = setInterval(tick, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.isPaused, state.phase, tick]);

  // Handle completion
  useEffect(() => {
    if (state.phase === 'finished') {
      onComplete(state.currentRound, workTimeRef.current);
    }
  }, [state.phase, state.currentRound, onComplete]);

  const start = useCallback(() => {
    workTimeRef.current = 0;
    setState({
      phase: 'prepare',
      currentRound: 1,
      secondsLeft: PREPARE_SECONDS,
      isRunning: true,
      isPaused: false,
    });
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const reset = useCallback(() => {
    workTimeRef.current = 0;
    setState({
      phase: 'prepare',
      currentRound: 1,
      secondsLeft: PREPARE_SECONDS,
      isRunning: false,
      isPaused: false,
    });
  }, []);

  const stop = useCallback(() => {
    const completedRounds = state.phase === 'work'
      ? state.currentRound - 1
      : state.currentRound;
    onComplete(completedRounds, workTimeRef.current);
    reset();
  }, [state, reset, onComplete]);

  return {
    state,
    start,
    pause,
    resume,
    reset,
    stop,
  };
};
