import { useState, useEffect, useCallback } from 'react';
import { translations, SupportedLanguage, Translations } from './translations';
import { motivationalPhrases, getRandomPhrase, MotivationalPhrases } from './motivational';
import { getGlobalLanguage, subscribeToLanguage } from '../hooks/useSettings';

// Hook para obtener traducciones reactivas
export const useTranslations = () => {
  const [language, setLanguage] = useState<SupportedLanguage>(getGlobalLanguage());

  useEffect(() => {
    const unsubscribe = subscribeToLanguage(setLanguage);
    return unsubscribe;
  }, []);

  const t = translations[language];

  const getMotivationalPhrase = useCallback((category: keyof MotivationalPhrases): string => {
    return getRandomPhrase(language, category);
  }, [language]);

  const interpolate = useCallback((text: string, vars: Record<string, string | number>): string => {
    let result = text;
    Object.entries(vars).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, String(value));
    });
    return result;
  }, []);

  return {
    t,
    language,
    getMotivationalPhrase,
    interpolate,
  };
};

// Para compatibilidad con código existente (uso estático)
export const t = translations[getGlobalLanguage()];

export const getMotivationalPhrase = (category: keyof MotivationalPhrases): string => {
  return getRandomPhrase(getGlobalLanguage(), category);
};

export const interpolate = (text: string, vars: Record<string, string | number>): string => {
  let result = text;
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

export { SupportedLanguage, Translations, MotivationalPhrases };
export { translations, motivationalPhrases };
