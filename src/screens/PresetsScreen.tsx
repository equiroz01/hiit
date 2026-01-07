import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/spacing';
import { RootStackParamList, Preset } from '../types';
import { usePresets } from '../hooks/useStorage';
import { usePremium } from '../hooks/usePremium';
import { useTranslations } from '../i18n';

type PresetsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Presets'>;
};

export const PresetsScreen: React.FC<PresetsScreenProps> = ({ navigation }) => {
  const { presets, toggleFavorite, deletePreset, getPresetLimitInfo } = usePresets();
  const { isPremium } = usePremium();
  const { t, interpolate } = useTranslations();

  const presetLimitInfo = getPresetLimitInfo(isPremium);
  const customPresets = presets.filter(p => !p.isDefault);

  const handlePresetPress = (preset: Preset) => {
    navigation.navigate('Timer', {
      config: {
        workSeconds: preset.workSeconds,
        restSeconds: preset.restSeconds,
        rounds: preset.rounds,
      },
      presetName: preset.name,
    });
  };

  const handleDelete = (preset: Preset) => {
    if (preset.isDefault) {
      Alert.alert('Info', t.defaultPresetInfo);
      return;
    }
    Alert.alert(
      t.deletePreset,
      interpolate(t.deleteConfirm, { name: preset.name }),
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: () => deletePreset(preset.id),
        },
      ]
    );
  };

  const renderPreset = ({ item }: { item: Preset }) => (
    <TouchableOpacity
      style={styles.presetCard}
      onPress={() => handlePresetPress(item)}
      onLongPress={() => handleDelete(item)}
      activeOpacity={0.7}
    >
      <View style={styles.presetInfo}>
        <Text style={styles.presetName}>{item.name}</Text>
        <Text style={styles.presetDetails}>
          {item.workSeconds}s {t.workLabel} · {item.restSeconds}s {t.restLabel} · {item.rounds} {t.roundsLabel}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Text style={[styles.favoriteIcon, item.isFavorite && styles.favoriteActive]}>
          {item.isFavorite ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t.presets}</Text>
        <View style={{ width: 80 }} />
      </View>

      {/* Preset Limit Banner */}
      {!isPremium && customPresets.length >= 2 && (
        <TouchableOpacity
          style={styles.limitBanner}
          onPress={() => navigation.navigate('Paywall', { source: 'custom_presets' })}
          activeOpacity={0.7}
        >
          <View style={styles.limitBannerContent}>
            <Text style={styles.limitBannerText}>
              {presetLimitInfo.canAdd
                ? interpolate(t.presetsUsed, {
                    current: presetLimitInfo.current,
                    limit: presetLimitInfo.limit || 3,
                  })
                : t.presetLimitReached}
            </Text>
            <Text style={styles.limitBannerSubtext}>
              {t.upgradeForUnlimited}
            </Text>
          </View>
          <Text style={styles.limitBannerArrow}>→</Text>
        </TouchableOpacity>
      )}

      {/* Premium Badge */}
      {isPremium && customPresets.length > 0 && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>
            ⭐ {t.unlimited} · {customPresets.length} {t.presets}
          </Text>
        </View>
      )}

      <FlatList
        data={presets}
        keyExtractor={(item) => item.id}
        renderItem={renderPreset}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.hint}>
        <Text style={styles.hintText}>{t.holdToDelete}</Text>
      </View>
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
  listContent: {
    padding: 20,
  },
  presetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: borderRadius.xl,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  presetInfo: {
    flex: 1,
  },
  presetName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  presetDetails: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  favoriteButton: {
    padding: 10,
  },
  favoriteIcon: {
    fontSize: 28,
    color: colors.textMuted,
  },
  favoriteActive: {
    color: colors.accent,
  },
  hint: {
    padding: 20,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  limitBanner: {
    backgroundColor: colors.accent,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.md,
  },
  limitBannerContent: {
    flex: 1,
  },
  limitBannerText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textLight,
    marginBottom: 4,
  },
  limitBannerSubtext: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    opacity: 0.9,
  },
  limitBannerArrow: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: '700',
  },
  premiumBadge: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.primary,
  },
  premiumBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
});
