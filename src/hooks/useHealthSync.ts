import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';
import {
  initialize,
  requestPermission,
  insertRecords,
  SdkAvailabilityStatus,
  ExerciseType,
} from 'react-native-health-connect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutSession } from '../types';

const HEALTH_SYNC_KEY = '@pulse_hiit_health_sync_enabled';

// HealthKit permissions for iOS
const healthKitPermissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
    write: [
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
  },
};

export interface HealthSyncState {
  isAvailable: boolean;
  isEnabled: boolean;
  isAuthorized: boolean;
  platform: 'ios' | 'android' | 'web' | null;
}

export const useHealthSync = () => {
  const [state, setState] = useState<HealthSyncState>({
    isAvailable: false,
    isEnabled: false,
    isAuthorized: false,
    platform: null,
  });
  const [loading, setLoading] = useState(true);

  // Initialize and check availability
  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    try {
      const enabled = await AsyncStorage.getItem(HEALTH_SYNC_KEY);
      const isEnabled = enabled === 'true';

      if (Platform.OS === 'ios') {
        // Check if HealthKit is available on iOS
        // Note: requires custom development build (not available in Expo Go)
        try {
          if (typeof AppleHealthKit?.isAvailable === 'function') {
            AppleHealthKit.isAvailable((error, available) => {
              if (error) {
                console.error('HealthKit availability error:', error);
                setState({
                  isAvailable: false,
                  isEnabled: false,
                  isAuthorized: false,
                  platform: 'ios',
                });
                setLoading(false);
                return;
              }

              setState(prev => ({
                ...prev,
                isAvailable: available,
                isEnabled: available && isEnabled,
                platform: 'ios',
              }));
              setLoading(false);
            });
          } else {
            // Native module not available (likely running in Expo Go)
            console.warn('AppleHealthKit not available - requires custom development build');
            setState({
              isAvailable: false,
              isEnabled: false,
              isAuthorized: false,
              platform: 'ios',
            });
            setLoading(false);
          }
        } catch (nativeError) {
          console.warn('HealthKit native module error:', nativeError);
          setState({
            isAvailable: false,
            isEnabled: false,
            isAuthorized: false,
            platform: 'ios',
          });
          setLoading(false);
        }
      } else if (Platform.OS === 'android') {
        // Check if Health Connect is available on Android
        try {
          const status = await initialize();
          // initialize() returns boolean in some versions, SdkAvailabilityStatus in others
          const isAvailable = typeof status === 'boolean'
            ? status
            : status === SdkAvailabilityStatus.SDK_AVAILABLE;

          setState({
            isAvailable,
            isEnabled: isAvailable && isEnabled,
            isAuthorized: false,
            platform: 'android',
          });
          setLoading(false);
        } catch (androidError) {
          console.warn('Health Connect not available:', androidError);
          setState({
            isAvailable: false,
            isEnabled: false,
            isAuthorized: false,
            platform: 'android',
          });
          setLoading(false);
        }
      } else {
        setState({
          isAvailable: false,
          isEnabled: false,
          isAuthorized: false,
          platform: 'web',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking health sync availability:', error);
      setState({
        isAvailable: false,
        isEnabled: false,
        isAuthorized: false,
        platform: Platform.OS as 'ios' | 'android' | 'web' | null,
      });
      setLoading(false);
    }
  };

  const requestAuthorization = useCallback(async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (Platform.OS === 'ios') {
        try {
          if (typeof AppleHealthKit?.initHealthKit === 'function') {
            AppleHealthKit.initHealthKit(healthKitPermissions, (error) => {
              if (error) {
                console.error('HealthKit authorization error:', error);
                setState(prev => ({ ...prev, isAuthorized: false }));
                resolve(false);
                return;
              }

              setState(prev => ({ ...prev, isAuthorized: true }));
              resolve(true);
            });
          } else {
            console.warn('AppleHealthKit not available - requires custom development build');
            setState(prev => ({ ...prev, isAuthorized: false }));
            resolve(false);
          }
        } catch (error) {
          console.warn('HealthKit authorization error:', error);
          setState(prev => ({ ...prev, isAuthorized: false }));
          resolve(false);
        }
      } else if (Platform.OS === 'android') {
        requestPermission([
          { accessType: 'read', recordType: 'ExerciseSession' },
          { accessType: 'write', recordType: 'ExerciseSession' },
          { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
          { accessType: 'write', recordType: 'ActiveCaloriesBurned' },
          { accessType: 'read', recordType: 'Distance' },
          { accessType: 'write', recordType: 'Distance' },
        ])
          .then(() => {
            setState(prev => ({ ...prev, isAuthorized: true }));
            resolve(true);
          })
          .catch((error) => {
            console.error('Health Connect authorization error:', error);
            setState(prev => ({ ...prev, isAuthorized: false }));
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }, []);

  const enableSync = useCallback(async (): Promise<boolean> => {
    if (!state.isAvailable) {
      return false;
    }

    // Request authorization first
    const authorized = await requestAuthorization();
    if (!authorized) {
      return false;
    }

    try {
      await AsyncStorage.setItem(HEALTH_SYNC_KEY, 'true');
      setState(prev => ({ ...prev, isEnabled: true, isAuthorized: true }));
      return true;
    } catch (error) {
      console.error('Error enabling health sync:', error);
      return false;
    }
  }, [state.isAvailable, requestAuthorization]);

  const disableSync = useCallback(async () => {
    try {
      await AsyncStorage.setItem(HEALTH_SYNC_KEY, 'false');
      setState(prev => ({ ...prev, isEnabled: false }));
    } catch (error) {
      console.error('Error disabling health sync:', error);
    }
  }, []);

  const saveWorkout = useCallback(
    async (session: WorkoutSession): Promise<boolean> => {
      if (!state.isEnabled || !state.isAuthorized) {
        return false;
      }

      try {
        if (Platform.OS === 'ios') {
          return await saveWorkoutIOS(session);
        } else if (Platform.OS === 'android') {
          return await saveWorkoutAndroid(session);
        }
        return false;
      } catch (error) {
        console.error('Error saving workout to health:', error);
        return false;
      }
    },
    [state.isEnabled, state.isAuthorized]
  );

  return {
    state,
    loading,
    enableSync,
    disableSync,
    saveWorkout,
    requestAuthorization,
  };
};

// iOS HealthKit implementation
const saveWorkoutIOS = async (session: WorkoutSession): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      if (typeof AppleHealthKit?.saveWorkout !== 'function') {
        console.warn('AppleHealthKit not available - requires custom development build');
        resolve(false);
        return;
      }

      const startDate = new Date(session.date);
      const endDate = new Date(
        startDate.getTime() + session.totalWorkTime * 1000
      );

      const workoutData = {
        type: AppleHealthKit.Constants.Activities.HighIntensityIntervalTraining,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        energyBurned: session.caloriesBurned || 0,
        distance: 0,
      };

      AppleHealthKit.saveWorkout(workoutData, (error, result) => {
        if (error) {
          console.error('Error saving workout to HealthKit:', error);
          resolve(false);
          return;
        }

        console.log('Workout saved to HealthKit:', result);
        resolve(true);
      });
    } catch (error) {
      console.warn('Error saving workout to HealthKit:', error);
      resolve(false);
    }
  });
};

// Android Health Connect implementation
const saveWorkoutAndroid = async (
  session: WorkoutSession
): Promise<boolean> => {
  try {
    const startDate = new Date(session.date);
    const endDate = new Date(
      startDate.getTime() + session.totalWorkTime * 1000
    );

    const exerciseRecord = {
      recordType: 'ExerciseSession' as const,
      exerciseType: ExerciseType.HIGH_INTENSITY_INTERVAL_TRAINING,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      title: session.preset || 'HIIT Workout',
    };

    await insertRecords([exerciseRecord]);
    console.log('Workout saved to Health Connect');
    return true;
  } catch (error) {
    console.error('Error saving workout to Health Connect:', error);
    return false;
  }
};
