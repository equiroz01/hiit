import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { SupportedLanguage } from '../i18n/translations';

const SETTINGS_KEY = '@pulse_hiit_settings';

interface Settings {
  language: SupportedLanguage;
}

const supportedLanguages: SupportedLanguage[] = ['en', 'es', 'it', 'fr', 'zh'];

const getDeviceLanguage = (): SupportedLanguage => {
  const locale = Localization.getLocales()[0]?.languageCode || 'en';
  if (supportedLanguages.includes(locale as SupportedLanguage)) {
    return locale as SupportedLanguage;
  }
  return 'en';
};

const defaultSettings: Settings = {
  language: getDeviceLanguage(),
};

// Singleton para el estado global del idioma
let globalLanguage: SupportedLanguage = getDeviceLanguage();
let listeners: Set<(lang: SupportedLanguage) => void> = new Set();

export const getGlobalLanguage = () => globalLanguage;

export const setGlobalLanguage = (lang: SupportedLanguage) => {
  globalLanguage = lang;
  listeners.forEach(listener => listener(lang));
};

export const subscribeToLanguage = (listener: (lang: SupportedLanguage) => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({ language: globalLanguage });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  // Suscribirse a cambios globales
  useEffect(() => {
    const unsubscribe = subscribeToLanguage((lang) => {
      setSettings(prev => ({ ...prev, language: lang }));
    });
    return unsubscribe;
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Settings;
        setSettings(parsed);
        setGlobalLanguage(parsed.language);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLanguage = useCallback(async (language: SupportedLanguage) => {
    try {
      const newSettings = { ...settings, language };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
      setGlobalLanguage(language);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  return {
    settings,
    loading,
    updateLanguage,
  };
};

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
  zh: '中文',
};

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  it: '🇮🇹',
  fr: '🇫🇷',
  zh: '🇨🇳',
};

export { SupportedLanguage, supportedLanguages };
