import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';
import {
  useSettings,
  languageNames,
  languageFlags,
  supportedLanguages,
  SupportedLanguage
} from '../hooks/useSettings';
import { useTranslations } from '../i18n';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { settings, updateLanguage } = useSettings();
  const { t } = useTranslations();

  const handleLanguageSelect = async (lang: SupportedLanguage) => {
    await updateLanguage(lang);
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
  languageList: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
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
});
