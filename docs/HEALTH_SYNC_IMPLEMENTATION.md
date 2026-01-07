# Health Sync Implementation Guide

## Overview
This document describes the Health API integration implemented in Pulse HIIT to sync workouts with Apple Health (iOS) and Health Connect (Android).

## Implementation Status

✅ **Phase 1 - Health APIs Integration: COMPLETED**

### What's Been Implemented

1. **Dependencies Installed**
   - `react-native-health` for iOS (HealthKit)
   - `react-native-health-connect` for Android (Health Connect)

2. **Permissions Configured** (`app.json`)
   - iOS: HealthKit entitlements and usage descriptions
   - Android: Health Connect permissions for exercise data

3. **Core Hook: `useHealthSync`** (`src/hooks/useHealthSync.ts`)
   - Cross-platform abstraction for Health APIs
   - Features:
     - Auto-detection of platform and availability
     - Permission request flow
     - Enable/disable sync setting persistence
     - Save workout sessions to Health apps
     - Proper error handling

4. **Integration Points**
   - **TimerScreen**: Automatically saves completed workouts to Health if enabled
   - **SettingsScreen**: UI toggle to enable/disable Health sync with status indicators

5. **Translations**
   - Health sync strings added for all 5 supported languages (EN, ES, IT, FR, ZH)

## How It Works

### User Flow

1. User opens **Settings** screen
2. Sees "Health Sync" section with toggle switch
3. Enables sync → System requests Health permissions
4. User grants permissions in system dialog
5. Completes a workout → Automatically synced to Health app
6. Workout appears in Apple Health or Google Fit

### Technical Flow

```
Workout Complete → TimerScreen.handleComplete()
                 ↓
              saveSession() (local storage)
                 ↓
              saveWorkout() (Health API)
                 ↓
         iOS: HealthKit.saveWorkout()
         Android: HealthConnect.insertRecords()
```

## File Changes

### New Files
- `src/hooks/useHealthSync.ts` - Health sync hook implementation

### Modified Files
- `app.json` - Added Health permissions
- `src/screens/TimerScreen.tsx` - Added Health sync on workout complete
- `src/screens/SettingsScreen.tsx` - Added Health sync toggle UI
- `src/i18n/translations.ts` - Added Health sync translations
- `package.json` - Added health dependencies

## Next Steps to Test

### Prerequisites

Since you're using Expo, you need to build the native app to test Health APIs:

```bash
# Build for iOS (requires macOS and Apple Developer account)
eas build --platform ios --profile development

# Build for Android (requires Google Play Developer account)
eas build --platform android --profile development
```

### Testing on iOS

1. Install the built app on a physical iOS device (Simulator won't work for HealthKit)
2. Open the app → Settings
3. Enable "Health Sync" toggle
4. Grant Health permissions when prompted
5. Complete a HIIT workout
6. Open Apple Health app → Browse → Workouts
7. Verify your HIIT session appears with correct:
   - Type: High Intensity Interval Training
   - Duration: Total workout time
   - Date/time: When you completed it

### Testing on Android

1. Ensure Android device has Health Connect installed (Android 14+)
2. Install the built app on device
3. Open app → Settings
4. Enable "Health Sync" toggle
5. Grant Health Connect permissions
6. Complete a workout
7. Open Health Connect app → Exercise
8. Verify HIIT workout appears

## Troubleshooting

### iOS Issues

**"Health sync not available on this device"**
- HealthKit requires a physical device (not Simulator)
- Device must support HealthKit (iPhone 5s or later)

**Permission dialog doesn't appear**
- Check `app.json` has correct permissions
- Rebuild app with `eas build`
- Reset app permissions in Settings → Privacy

### Android Issues

**"Health sync not available"**
- Device must have Android 8.0+ (API 26)
- Health Connect must be installed
- Check Google Play Services is updated

**Workouts not syncing**
- Verify Health Connect permissions are granted
- Check logs for errors: `npx react-native log-android`

## Data Saved to Health

### iOS (HealthKit)
- **Workout Type**: `HKWorkoutActivityType.highIntensityIntervalTraining`
- **Start Date**: Session date/time
- **End Date**: Start + total work time
- **Duration**: Total work seconds
- **Energy Burned**: 0 (can be calculated later)
- **Distance**: 0 (not applicable for HIIT)

### Android (Health Connect)
- **Exercise Type**: `high_intensity_interval_training`
- **Start Time**: Session date/time
- **End Time**: Start + total work time
- **Title**: Preset name or "HIIT Workout"

## Future Enhancements (Phase 2+)

### Potential Features
1. **Read heart rate data** during workouts (requires heart rate sensor)
2. **Calculate and save calories burned** based on user profile
3. **Show health data in Stats screen** (aggregate from Health app)
4. **Sync presets** as workout templates
5. **Native watch apps** (Apple Watch / Wear OS) - see main architecture doc

### Advanced Integration
- Background sync for missed workouts
- Bi-directional sync (read workouts from Health app)
- Export workout history
- Integration with third-party fitness apps via Health APIs

## Important Notes

⚠️ **Building Required**
- Health APIs require native code
- Cannot test in Expo Go
- Must use EAS Build or `expo prebuild` + native build

⚠️ **Privacy**
- Always explain why you need Health access
- Only request necessary permissions
- Never share health data externally

⚠️ **App Store Review**
- Apple requires clear Health usage descriptions
- Must actually use requested Health permissions
- Cannot gate features behind Health access (optional only)

## Resources

- [HealthKit Documentation](https://developer.apple.com/documentation/healthkit)
- [Health Connect Documentation](https://developer.android.com/health-and-fitness/guides/health-connect)
- [react-native-health](https://github.com/agencyenterprise/react-native-health)
- [react-native-health-connect](https://github.com/matinzd/react-native-health-connect)

## Support

For issues or questions:
1. Check this documentation
2. Review logs in the console
3. Test on a physical device
4. Verify permissions in system settings
5. Rebuild app if config changed
