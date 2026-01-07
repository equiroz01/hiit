import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/spacing';
import { RootStackParamList } from '../types';
import {
  useSettings,
  languageNames,
  languageFlags,
  supportedLanguages,
  SupportedLanguage
} from '../hooks/useSettings';
import { useHealthSync } from '../hooks/useHealthSync';
import { usePremium } from '../hooks/usePremium';
import { useAuth } from '../hooks/useAuth';
import { useTranslations } from '../i18n';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { settings, updateLanguage } = useSettings();
  const { state: healthState, loading: healthLoading, enableSync, disableSync } = useHealthSync();
  const { isPremium, unlockPremiumForTesting, resetPremiumForTesting } = usePremium();
  const { user, isAuthenticated, signOut } = useAuth();
  const { t } = useTranslations();
  const [togglingHealth, setTogglingHealth] = useState(false);

  const handleLanguageSelect = async (lang: SupportedLanguage) => {
    await updateLanguage(lang);
  };

  const handleHealthToggle = async (value: boolean) => {
    setTogglingHealth(true);
    try {
      if (value) {
        const success = await enableSync();
        if (!success) {
          Alert.alert(
            t.healthSync,
            'Failed to enable health sync. Please check permissions in Settings.',
            [{ text: 'OK' }]
          );
        }
      } else {
        await disableSync();
      }
    } catch (error) {
      console.error('Error toggling health sync:', error);
    } finally {
      setTogglingHealth(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      t.signOut,
      'Are you sure you want to sign out? Your data will remain on this device.',
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.signOut,
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t.settings}</Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          {isAuthenticated ? (
            <View style={styles.card}>
              {/* User Info */}
              <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileTitle}>
                    {user?.email || 'Anonymous User'}
                  </Text>
                  <Text style={styles.profileDescription}>
                    {t.cloudSync} • {t.synced}
                  </Text>
                </View>
              </View>
              {/* Sign Out Button */}
              <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}
                activeOpacity={0.7}
              >
                <Text style={styles.signOutText}>{t.signOut}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Auth')}
              activeOpacity={0.7}
            >
              <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileTitle}>{t.signIn}</Text>
                  <Text style={styles.profileDescription}>
                    {t.syncDescription}
                  </Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.profile}</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            <View style={styles.profileContainer}>
              <View style={styles.profileInfo}>
                <Text style={styles.profileTitle}>{t.userProfile}</Text>
                <Text style={styles.profileDescription}>
                  {t.profileIncompleteDescription}
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Premium Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.premium}</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Paywall', { source: 'settings' })}
            activeOpacity={0.7}
          >
            <View style={styles.profileContainer}>
              <View style={styles.profileInfo}>
                <Text style={styles.profileTitle}>
                  {isPremium ? `${t.premium} ✓` : t.upgradeToPremium}
                </Text>
                <Text style={styles.profileDescription}>
                  {isPremium
                    ? 'All premium features unlocked'
                    : t.unlockAllFeatures
                  }
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Health Sync Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.healthSync}</Text>
          <View style={styles.card}>
            <View style={styles.healthSyncContainer}>
              <View style={styles.healthSyncInfo}>
                <Text style={styles.healthSyncTitle}>{t.enableHealthSync}</Text>
                <Text style={styles.healthSyncDescription}>
                  {healthState.isAvailable
                    ? t.healthSyncDescription
                    : t.healthNotAvailable}
                </Text>
                {healthState.isEnabled && (
                  <Text style={styles.healthSyncStatus}>
                    {t.healthSyncEnabled}
                  </Text>
                )}
              </View>
              {healthLoading || togglingHealth ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Switch
                  value={healthState.isEnabled}
                  onValueChange={handleHealthToggle}
                  disabled={!healthState.isAvailable}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.cardBackground}
                  ios_backgroundColor={colors.border}
                />
              )}
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.language}</Text>
          <View style={styles.languageList}>
            {supportedLanguages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  settings.language === lang && styles.languageOptionSelected,
                ]}
                onPress={() => handleLanguageSelect(lang)}
                activeOpacity={0.7}
              >
                <Text style={styles.languageFlag}>{languageFlags[lang]}</Text>
                <Text
                  style={[
                    styles.languageName,
                    settings.language === lang && styles.languageNameSelected,
                  ]}
                >
                  {languageNames[lang]}
                </Text>
                {settings.language === lang && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Development Section - ONLY FOR TESTING */}
        {__DEV__ && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ DEVELOPMENT ONLY</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.devButton}
                onPress={isPremium ? resetPremiumForTesting : unlockPremiumForTesting}
                activeOpacity={0.7}
              >
                <Text style={styles.devButtonText}>
                  {isPremium ? '🔓 Reset Premium (Test)' : '🔒 Unlock Premium (Test)'}
                </Text>
                <Text style={styles.devButtonDescription}>
                  {isPremium
                    ? 'Remove premium access for testing'
                    : 'Unlock all premium features without IAP'
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.appInfo}>
          <Text style={styles.appName}>Pulse HIIT</Text>
          <Text style={styles.appVersion}>v1.0.0</Text>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  healthSyncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  healthSyncInfo: {
    flex: 1,
    marginRight: 16,
  },
  healthSyncTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  healthSyncDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  healthSyncStatus: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  profileInfo: {
    flex: 1,
    marginRight: 16,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  profileDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  arrow: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  languageList: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageOptionSelected: {
    backgroundColor: colors.workTint,
  },
  languageFlag: {
    fontSize: 28,
    marginRight: 14,
  },
  languageName: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
  },
  languageNameSelected: {
    fontWeight: '700',
  },
  checkmark: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '800',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  appVersion: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  devButton: {
    padding: 18,
  },
  devButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  devButtonDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  signOutButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 12,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F44336',
    textAlign: 'center',
  },
});
