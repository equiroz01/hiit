# Next Steps - Health Sync Testing & Deployment

## ✅ Completed: Phase 1 - Health APIs Integration

You now have a fully functional Health sync feature that will sync completed HIIT workouts to:
- **Apple Health** on iOS devices
- **Health Connect / Google Fit** on Android devices

## 🚀 Immediate Next Steps

### 1. Test the Implementation (Required)

Since Health APIs require native code, you **cannot test in Expo Go**. You need to build the app:

#### Option A: EAS Build (Recommended - Easiest)

```bash
# Install EAS CLI if you haven't
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS (if first time)
eas build:configure

# Build for iOS development
eas build --platform ios --profile development

# Build for Android development
eas build --platform android --profile development
```

After build completes, download and install on your physical device.

#### Option B: Local Build (Advanced)

```bash
# Generate native folders
npx expo prebuild

# For iOS (requires macOS + Xcode)
cd ios
pod install
cd ..
npx react-native run-ios --device

# For Android
npx react-native run-android
```

### 2. Verify Health Permissions

**iOS:**
1. After installing, open Settings → Privacy → Health → Pulse HIIT
2. Verify you see "High Intensity Interval Training" in read/write permissions

**Android:**
1. Ensure Health Connect is installed (comes with Android 14+, or download from Play Store)
2. Open Health Connect → App permissions → Pulse HIIT
3. Grant Exercise permissions

### 3. Test the Feature

1. Open Pulse HIIT app
2. Go to **Settings**
3. Toggle **"Health Sync"** ON
4. Grant permissions when prompted
5. Go back to Home
6. Start and complete a workout (even just 1-2 rounds for testing)
7. Open Apple Health or Health Connect app
8. Navigate to **Workouts** or **Exercise**
9. Verify your HIIT session appears with:
   - Correct duration
   - Proper workout type
   - Accurate timestamp

## 📋 Optional Improvements

### Quick Wins (1-2 hours each)

1. **Add Health indicator on Home screen**
   - Show small icon when Health sync is active
   - Visual confirmation for users

2. **Enhance workout metadata**
   - Calculate estimated calories (requires user weight)
   - Add preset name to workout notes
   - Include work/rest intervals in metadata

3. **Better error handling**
   - Show toast notifications on sync success/failure
   - Retry logic for failed syncs
   - Queue workouts if offline

### Medium Effort (1-2 days each)

4. **Stats integration**
   - Read workout data from Health app
   - Show aggregated stats from all sources
   - Compare Pulse HIIT workouts vs other exercises

5. **User profile**
   - Add weight/height settings
   - Calculate calories based on profile
   - Personalized workout recommendations

### Advanced (1+ weeks)

6. **Implement Phase 2: Native Watch Apps**
   - See `/docs/architecture_plan.md` for full plan
   - Requires Swift (iOS) and Kotlin (Android) development
   - Control timer directly from watch
   - Independent workouts without phone

## 📦 Deployment Checklist

Before submitting to App Store / Play Store:

### App Store (iOS)
- [ ] Update version in `app.json`
- [ ] Verify all Health usage strings are clear and accurate
- [ ] Test on multiple iOS devices (different iOS versions)
- [ ] Prepare screenshots showing Health integration
- [ ] Fill out Health app questionnaire in App Store Connect
- [ ] Submit for review

### Google Play (Android)
- [ ] Update version in `app.json`
- [ ] Complete Health Connect declaration form
- [ ] Test on Android 8+ and Android 14+ devices
- [ ] Prepare feature graphic showing Health integration
- [ ] Add privacy policy mentioning Health data usage
- [ ] Submit for review

## 🐛 Known Limitations

1. **Requires physical device** - Health APIs don't work in simulators
2. **Platform-specific builds needed** - Cannot use Expo Go
3. **Calories not calculated** - Currently set to 0 (needs user weight)
4. **No background sync** - Only syncs immediately after workout
5. **One-way sync** - Only writes to Health, doesn't read back

## 📚 Documentation

Created documentation:
- `/docs/HEALTH_SYNC_IMPLEMENTATION.md` - Technical implementation details
- This file - Next steps and deployment guide

## 🆘 Troubleshooting

### "Health sync not available on this device"
- Using iOS Simulator? → Use physical device
- Using Expo Go? → Build native app with EAS
- Android < 8.0? → Update OS or use newer device

### Workouts not appearing in Health app
1. Check console logs for errors
2. Verify permissions are granted
3. Make sure you completed the workout (didn't exit early)
4. Check Health app's "All Recorded Data" view
5. Try restarting the Health app

### Build failures
```bash
# Clear caches and reinstall
rm -rf node_modules
npm install

# For iOS
cd ios && pod deintegrate && pod install && cd ..

# Rebuild
eas build --platform ios --clear-cache
```

## 💡 Questions?

- Review `/docs/HEALTH_SYNC_IMPLEMENTATION.md` for technical details
- Check Expo documentation: https://docs.expo.dev/
- Health APIs docs linked in implementation guide
- Console logs will show Health sync status

---

**Ready to build and test?** Run:
```bash
eas build --platform ios --profile development
```

Good luck! 🚀
