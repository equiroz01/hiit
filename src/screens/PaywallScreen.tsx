import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/spacing';
import { RootStackParamList } from '../types';
import { usePremium } from '../hooks/usePremium';
import { useTranslations } from '../i18n';

type PaywallScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Paywall'>;
  route: RouteProp<RootStackParamList, 'Paywall'>;
};

type PricingOption = 'monthly' | 'annual' | 'lifetime';

export const PaywallScreen: React.FC<PaywallScreenProps> = ({ navigation, route }) => {
  const { source } = route.params;
  const { products, subscriptions, purchaseProduct, purchasing, loading, restorePurchases } = usePremium();
  const { t } = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState<PricingOption>('annual');

  const handlePurchase = async () => {
    const productIds = Platform.select({
      ios: {
        monthly: 'com.equiroz.pulsehiit.premium.monthly',
        annual: 'com.equiroz.pulsehiit.premium.annual',
        lifetime: 'com.equiroz.pulsehiit.premium.lifetime',
      },
      android: {
        monthly: 'premium_monthly',
        annual: 'premium_annual',
        lifetime: 'premium_lifetime',
      },
      default: {
        monthly: 'premium_monthly',
        annual: 'premium_annual',
        lifetime: 'premium_lifetime',
      },
    });

    const productId = productIds[selectedPlan];
    await purchaseProduct(productId);
  };

  const getSourceMessage = () => {
    switch (source) {
      case 'custom_presets':
        return t.unlimitedPresets;
      case 'stats_history':
        return t.fullHistory;
      case 'training_programs':
        return t.trainingPrograms;
      case 'export_data':
        return t.exportData;
      case 'ai_coach':
        return t.aiCoach;
      case 'themes':
        return t.customThemes;
      default:
        return t.unlockAllFeatures;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.badge}>⭐ {t.premium.toUpperCase()}</Text>
          <Text style={styles.title}>{getSourceMessage()}</Text>
          <Text style={styles.subtitle}>
            {t.joinThousands}
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.features}>
          <Feature icon="✓" text={t.unlimitedPresets} />
          <Feature icon="✓" text={t.fullHistory} />
          <Feature icon="✓" text={t.trainingPrograms} />
          <Feature icon="✓" text={t.exportDataFeature} />
          <Feature icon="✓" text={t.aiCoach} />
          <Feature icon="✓" text={t.customThemes} />
          <Feature icon="✓" text={t.watchIntegration} />
          <Feature icon="✓" text={t.prioritySupport} />
        </View>

        {/* Pricing Cards */}
        <View style={styles.pricing}>
          {/* Annual - Best Value */}
          <TouchableOpacity
            style={[
              styles.pricingCard,
              selectedPlan === 'annual' && styles.pricingCardSelected,
              styles.pricingCardHighlight,
            ]}
            onPress={() => setSelectedPlan('annual')}
            activeOpacity={0.8}
          >
            <View style={styles.bestValueBadge}>
              <Text style={styles.bestValueText}>⭐ {t.bestValue}</Text>
            </View>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>{t.annual}</Text>
              <Text style={styles.pricingPrice}>$29.99{t.perYear}</Text>
              <Text style={styles.pricingSavings}>{t.savePercent.replace('{percent}', '37')} • {t.justPerMonth.replace('{amount}', '2.50')}</Text>
            </View>
            {selectedPlan === 'annual' && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Monthly */}
          <TouchableOpacity
            style={[
              styles.pricingCard,
              selectedPlan === 'monthly' && styles.pricingCardSelected,
            ]}
            onPress={() => setSelectedPlan('monthly')}
            activeOpacity={0.8}
          >
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>{t.monthly}</Text>
              <Text style={styles.pricingPrice}>$3.99{t.perMonth}</Text>
              <Text style={styles.pricingDescription}>{t.billedMonthly}</Text>
            </View>
            {selectedPlan === 'monthly' && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Lifetime */}
          <TouchableOpacity
            style={[
              styles.pricingCard,
              selectedPlan === 'lifetime' && styles.pricingCardSelected,
            ]}
            onPress={() => setSelectedPlan('lifetime')}
            activeOpacity={0.8}
          >
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>{t.lifetime}</Text>
              <Text style={styles.pricingPrice}>$79.99</Text>
              <Text style={styles.pricingDescription}>{t.oneTimePayment} • {t.bestLongTermValue}</Text>
            </View>
            {selectedPlan === 'lifetime' && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={[styles.ctaButton, purchasing && styles.ctaButtonDisabled]}
          onPress={handlePurchase}
          disabled={purchasing}
          activeOpacity={0.8}
        >
          {purchasing ? (
            <ActivityIndicator color={colors.textLight} />
          ) : (
            <>
              <Text style={styles.ctaButtonText}>
                {selectedPlan === 'lifetime' ? t.getAccess : t.startFreeTrial}
              </Text>
              {selectedPlan !== 'lifetime' && (
                <Text style={styles.ctaButtonSubtext}>
                  Then ${selectedPlan === 'monthly' ? `3.99${t.perMonth}` : `29.99${t.perYear}`}
                </Text>
              )}
            </>
          )}
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          {selectedPlan !== 'lifetime' && t.freeDaysThen}
          {t.cancelAnytime}
        </Text>

        {/* Restore Purchases */}
        <TouchableOpacity
          style={styles.restoreButton}
          onPress={restorePurchases}
        >
          <Text style={styles.restoreButtonText}>{t.restorePurchases}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Feature Component
const Feature: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.feature}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  content: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
  },
  featureIcon: {
    fontSize: 20,
    color: colors.primary,
    marginRight: 12,
    fontWeight: '700',
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  pricing: {
    marginBottom: 24,
    gap: 12,
  },
  pricingCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 3,
    borderColor: colors.border,
    padding: 20,
    position: 'relative',
    ...shadows.sm,
  },
  pricingCardHighlight: {
    borderColor: colors.primary,
    backgroundColor: colors.workTint,
  },
  pricingCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.workTint,
    ...shadows.md,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: borderRadius.lg,
    ...shadows.primary,
  },
  bestValueText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 1,
  },
  pricingHeader: {
    alignItems: 'center',
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  pricingPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  pricingSavings: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  pricingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.primary,
  },
  selectedText: {
    fontSize: 18,
    color: colors.textLight,
    fontWeight: '700',
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    ...shadows.primary,
  },
  ctaButtonDisabled: {
    opacity: 0.7,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 0.5,
  },
  ctaButtonSubtext: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
    opacity: 0.9,
  },
  terms: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  restoreButtonText: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '600',
  },
});
