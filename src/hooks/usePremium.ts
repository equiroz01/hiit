import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchasesPackage, PurchasesOffering } from 'react-native-purchases';
import { PremiumState } from '../types';
import * as RevenueCat from '../services/revenueCat';

const PREMIUM_STORAGE_KEY = '@pulse_hiit_premium';

const defaultPremiumState: PremiumState = {
  isPremium: false,
  tier: 'free',
  expirationDate: null,
  productId: null,
  isLifetime: false,
};

export const usePremium = () => {
  const [premiumState, setPremiumState] = useState<PremiumState>(defaultPremiumState);
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  // Initialize RevenueCat and load premium state
  useEffect(() => {
    const init = async () => {
      try {
        // Initialize RevenueCat
        await RevenueCat.initializeRevenueCat();

        // Load offerings
        const currentOfferings = await RevenueCat.getOfferings();
        setOfferings(currentOfferings);

        // Check premium status
        await checkPremiumStatus();
      } catch (error) {
        console.error('Error initializing premium:', error);
        // Fall back to local storage
        await loadPremiumStateFromStorage();
      } finally {
        setLoading(false);
      }
    };

    init();

    // Set up listener for purchase updates
    // This will be called when purchases are completed
    const updateListener = () => {
      checkPremiumStatus();
    };

    // Note: RevenueCat's CustomerInfoUpdateListener can be added here
    // For now, we'll manually check after purchases

    return () => {
      // Cleanup if needed
    };
  }, []);

  /**
   * Check premium status from RevenueCat
   */
  const checkPremiumStatus = async () => {
    try {
      const isPremium = await RevenueCat.isPremiumUser();
      const expirationDate = await RevenueCat.getExpirationDate();
      const isLifetime = await RevenueCat.hasLifetimeAccess();
      const productId = await RevenueCat.getActiveProductId();

      const newState: PremiumState = {
        isPremium,
        tier: isPremium ? 'premium' : 'free',
        expirationDate: expirationDate?.toISOString() || null,
        productId,
        isLifetime,
      };

      setPremiumState(newState);

      // Also save to local storage as backup
      await AsyncStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Error checking premium status:', error);
      // Fall back to local storage
      await loadPremiumStateFromStorage();
    }
  };

  /**
   * Load premium state from AsyncStorage (fallback)
   */
  const loadPremiumStateFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem(PREMIUM_STORAGE_KEY);
      if (stored) {
        const state = JSON.parse(stored) as PremiumState;

        // Check if subscription is still valid
        if (state.expirationDate && !state.isLifetime) {
          const expiration = new Date(state.expirationDate);
          const now = new Date();

          if (now > expiration) {
            // Subscription expired
            setPremiumState(defaultPremiumState);
            await AsyncStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(defaultPremiumState));
          } else {
            setPremiumState(state);
          }
        } else {
          setPremiumState(state);
        }
      }
    } catch (error) {
      console.error('Error loading premium state from storage:', error);
    }
  };

  /**
   * Purchase a package
   */
  const purchasePackage = useCallback(async (pkg: PurchasesPackage) => {
    setPurchasing(true);

    try {
      const customerInfo = await RevenueCat.purchasePackage(pkg);

      // Check if purchase was successful
      const isPremium = customerInfo.entitlements.active[RevenueCat.ENTITLEMENTS.PREMIUM] !== undefined;

      if (isPremium) {
        // Refresh premium status
        await checkPremiumStatus();

        Alert.alert(
          '🎉 Welcome to Premium!',
          'You now have access to all premium features. Enjoy!',
          [{ text: 'Get Started' }]
        );
      } else {
        Alert.alert(
          'Purchase Completed',
          'Thank you for your purchase. It may take a moment to activate.',
          [{ text: 'OK' }]
        );
      }
    } catch (error: any) {
      if (error.message === 'PURCHASE_CANCELLED') {
        // User cancelled - do nothing
        return;
      }

      console.error('Error purchasing package:', error);
      Alert.alert(
        'Purchase Failed',
        'Unable to complete purchase. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setPurchasing(false);
    }
  }, []);

  /**
   * Purchase by product ID (legacy support for PaywallScreen)
   */
  const purchaseProduct = useCallback(async (productId: string) => {
    setPurchasing(true);

    try {
      // Map product ID to package identifier
      let packageIdentifier = '';

      if (productId.includes('monthly')) {
        packageIdentifier = 'monthly';
      } else if (productId.includes('annual')) {
        packageIdentifier = 'annual';
      } else if (productId.includes('lifetime')) {
        packageIdentifier = 'lifetime';
      } else {
        throw new Error('Unknown product ID');
      }

      // Get the package
      const pkg = await RevenueCat.getPackageByIdentifier(packageIdentifier);

      if (!pkg) {
        throw new Error('Package not found');
      }

      // Purchase the package
      await purchasePackage(pkg);
    } catch (error) {
      console.error('Error purchasing product:', error);
      setPurchasing(false);
      Alert.alert(
        'Purchase Failed',
        'Unable to find product. Please try again.',
        [{ text: 'OK' }]
      );
    }
  }, [purchasePackage]);

  /**
   * Restore purchases
   */
  const restorePurchases = useCallback(async () => {
    setLoading(true);

    try {
      const customerInfo = await RevenueCat.restorePurchases();

      const isPremium = customerInfo.entitlements.active[RevenueCat.ENTITLEMENTS.PREMIUM] !== undefined;

      if (isPremium) {
        // Refresh premium status
        await checkPremiumStatus();

        Alert.alert(
          'Purchases Restored',
          'Your premium access has been restored!',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'No Purchases Found',
          'We couldn\'t find any previous purchases for this account.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
      Alert.alert(
        'Restore Failed',
        'Unable to restore purchases. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Identify user (call after login)
   */
  const identifyUser = useCallback(async (userId: string) => {
    try {
      await RevenueCat.identifyUser(userId);
      await checkPremiumStatus();
    } catch (error) {
      console.error('Error identifying user:', error);
    }
  }, []);

  /**
   * Log out user (call after logout)
   */
  const logoutUser = useCallback(async () => {
    try {
      await RevenueCat.logoutUser();
      await checkPremiumStatus();
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  }, []);

  /**
   * Helper functions for feature checks
   */
  const canUseFeature = useCallback((feature: string): boolean => {
    // For now, all premium features require premium tier
    // Can be extended for different tiers later
    return premiumState.isPremium;
  }, [premiumState.isPremium]);

  /**
   * Get remaining days until expiration
   */
  const getRemainingDays = useCallback((): number | null => {
    if (premiumState.isLifetime || !premiumState.expirationDate) {
      return null;
    }

    const expiration = new Date(premiumState.expirationDate);
    const now = new Date();
    const diffTime = expiration.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }, [premiumState]);

  /**
   * Get all available packages
   */
  const getAvailablePackages = useCallback((): PurchasesPackage[] => {
    return offerings?.availablePackages || [];
  }, [offerings]);

  /**
   * Get package by type
   */
  const getPackage = useCallback((type: 'monthly' | 'annual' | 'lifetime'): PurchasesPackage | null => {
    if (!offerings) return null;

    switch (type) {
      case 'monthly':
        return offerings.monthly || null;
      case 'annual':
        return offerings.annual || null;
      case 'lifetime':
        return offerings.lifetime || null;
      default:
        return null;
    }
  }, [offerings]);

  // FOR DEVELOPMENT ONLY - Remove in production
  const unlockPremiumForTesting = async () => {
    const testState: PremiumState = {
      isPremium: true,
      tier: 'premium',
      expirationDate: null,
      productId: 'test',
      isLifetime: true,
    };
    await AsyncStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(testState));
    setPremiumState(testState);

    Alert.alert(
      'Premium Unlocked! 🎉',
      'You now have access to all premium features for testing.',
      [{ text: 'Get Started' }]
    );
  };

  const resetPremiumForTesting = async () => {
    await AsyncStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(defaultPremiumState));
    setPremiumState(defaultPremiumState);

    Alert.alert(
      'Premium Reset',
      'Premium access has been removed.',
      [{ text: 'OK' }]
    );
  };

  return {
    // State
    isPremium: premiumState.isPremium,
    premiumState,
    offerings,
    loading,
    purchasing,

    // Actions
    purchasePackage,
    purchaseProduct, // Legacy support for PaywallScreen
    restorePurchases,
    identifyUser,
    logoutUser,
    canUseFeature,
    getRemainingDays,
    getAvailablePackages,
    getPackage,

    // Development helpers
    unlockPremiumForTesting,
    resetPremiumForTesting,

    // Legacy support (for backwards compatibility)
    products: [], // Empty - use offerings instead
    subscriptions: [], // Empty - use offerings instead
  };
};
