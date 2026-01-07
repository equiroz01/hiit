/**
 * RevenueCat Service
 * Handles all IAP (In-App Purchase) functionality through RevenueCat
 */

import Purchases, {
  PurchasesPackage,
  PurchasesOffering,
  CustomerInfo,
  LOG_LEVEL,
} from 'react-native-purchases';
import { Platform } from 'react-native';

/**
 * RevenueCat API Keys
 *
 * IMPORTANT: Get these from RevenueCat Dashboard
 * https://app.revenuecat.com/
 *
 * 1. Create a project in RevenueCat
 * 2. Go to Project Settings > API Keys
 * 3. Copy iOS and Android keys
 * 4. Add to .env file (recommended) or here
 */

// TODO: Replace with your actual RevenueCat API keys
// Better practice: Use environment variables
const REVENUECAT_API_KEY = Platform.select({
  ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || 'YOUR_IOS_API_KEY',
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || 'YOUR_ANDROID_API_KEY',
}) || '';

/**
 * Entitlement IDs
 *
 * These must match your entitlements in RevenueCat Dashboard
 * An entitlement represents access to premium features
 */
export const ENTITLEMENTS = {
  PREMIUM: 'premium', // Main premium entitlement
} as const;

/**
 * Initialize RevenueCat
 * Call this once when the app starts (in App.tsx or index.tsx)
 *
 * @param userId - Optional user ID to identify user across devices
 */
export const initializeRevenueCat = async (userId?: string): Promise<void> => {
  try {
    // Enable debug logs in development
    if (__DEV__) {
      await Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }

    // Configure the SDK
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: userId, // Optional - RevenueCat will generate one if not provided
    });

    console.log('RevenueCat initialized successfully');
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
    throw error;
  }
};

/**
 * Get current customer info
 * Contains all active subscriptions and entitlements
 */
export const getCustomerInfo = async (): Promise<CustomerInfo> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('Error getting customer info:', error);
    throw error;
  }
};

/**
 * Check if user has premium access
 */
export const isPremiumUser = async (): Promise<boolean> => {
  try {
    const customerInfo = await getCustomerInfo();
    const hasPremium = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM] !== undefined;
    return hasPremium;
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
};

/**
 * Get available offerings (products)
 * Offerings are configured in RevenueCat Dashboard
 */
export const getOfferings = async (): Promise<PurchasesOffering | null> => {
  try {
    const offerings = await Purchases.getOfferings();

    if (offerings.current !== null) {
      return offerings.current;
    }

    console.warn('No current offering found');
    return null;
  } catch (error) {
    console.error('Error getting offerings:', error);
    throw error;
  }
};

/**
 * Purchase a package
 *
 * @param pkg - The package to purchase (from getOfferings)
 * @returns CustomerInfo with updated entitlements
 */
export const purchasePackage = async (pkg: PurchasesPackage): Promise<CustomerInfo> => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo;
  } catch (error: any) {
    // Handle user cancellation gracefully
    if (error.userCancelled) {
      console.log('User cancelled purchase');
      throw new Error('PURCHASE_CANCELLED');
    }

    console.error('Error purchasing package:', error);
    throw error;
  }
};

/**
 * Restore purchases
 * Use this to restore previous purchases on a new device
 *
 * @returns CustomerInfo with restored entitlements
 */
export const restorePurchases = async (): Promise<CustomerInfo> => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    throw error;
  }
};

/**
 * Identify user
 * Call this after user logs in to sync purchases across devices
 *
 * @param userId - Unique user ID (e.g., from Supabase auth)
 */
export const identifyUser = async (userId: string): Promise<CustomerInfo> => {
  try {
    const { customerInfo } = await Purchases.logIn(userId);
    return customerInfo;
  } catch (error) {
    console.error('Error identifying user:', error);
    throw error;
  }
};

/**
 * Log out user
 * Call this when user logs out
 */
export const logoutUser = async (): Promise<CustomerInfo> => {
  try {
    const customerInfo = await Purchases.logOut();
    return customerInfo;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

/**
 * Get expiration date for active subscription
 * Returns null if lifetime or no active subscription
 */
export const getExpirationDate = async (): Promise<Date | null> => {
  try {
    const customerInfo = await getCustomerInfo();
    const premiumEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM];

    if (!premiumEntitlement) {
      return null;
    }

    // If there's no expiration date, it's a lifetime purchase
    if (!premiumEntitlement.expirationDate) {
      return null;
    }

    return new Date(premiumEntitlement.expirationDate);
  } catch (error) {
    console.error('Error getting expiration date:', error);
    return null;
  }
};

/**
 * Check if user has lifetime access
 */
export const hasLifetimeAccess = async (): Promise<boolean> => {
  try {
    const customerInfo = await getCustomerInfo();
    const premiumEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM];

    if (!premiumEntitlement) {
      return false;
    }

    // If willRenew is false and there's no expiration date, it's lifetime
    return !premiumEntitlement.willRenew && !premiumEntitlement.expirationDate;
  } catch (error) {
    console.error('Error checking lifetime access:', error);
    return false;
  }
};

/**
 * Get active product ID
 * Returns the product ID of the active subscription/purchase
 */
export const getActiveProductId = async (): Promise<string | null> => {
  try {
    const customerInfo = await getCustomerInfo();
    const premiumEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM];

    if (!premiumEntitlement) {
      return null;
    }

    return premiumEntitlement.productIdentifier;
  } catch (error) {
    console.error('Error getting active product ID:', error);
    return null;
  }
};

/**
 * Helper to format price with currency symbol
 */
export const formatPrice = (pkg: PurchasesPackage): string => {
  return pkg.product.priceString;
};

/**
 * Helper to get package by identifier
 */
export const getPackageByIdentifier = async (
  identifier: string
): Promise<PurchasesPackage | null> => {
  try {
    const offering = await getOfferings();

    if (!offering) {
      return null;
    }

    // Check common package types
    switch (identifier.toLowerCase()) {
      case 'monthly':
      case '$rc_monthly':
        return offering.monthly || null;
      case 'annual':
      case '$rc_annual':
        return offering.annual || null;
      case 'lifetime':
      case '$rc_lifetime':
        return offering.lifetime || null;
      default:
        // Search in available packages
        return offering.availablePackages.find(
          (pkg) => pkg.identifier === identifier
        ) || null;
    }
  } catch (error) {
    console.error('Error getting package by identifier:', error);
    return null;
  }
};

/**
 * Set up customer attributes
 * Useful for analytics and targeting
 */
export const setCustomerAttributes = async (attributes: {
  email?: string;
  displayName?: string;
  [key: string]: string | undefined;
}): Promise<void> => {
  try {
    if (attributes.email) {
      await Purchases.setEmail(attributes.email);
    }

    if (attributes.displayName) {
      await Purchases.setDisplayName(attributes.displayName);
    }

    // Set custom attributes
    for (const [key, value] of Object.entries(attributes)) {
      if (key !== 'email' && key !== 'displayName' && value !== undefined) {
        await Purchases.setAttributes({ [key]: value });
      }
    }
  } catch (error) {
    console.error('Error setting customer attributes:', error);
  }
};

export default {
  initializeRevenueCat,
  getCustomerInfo,
  isPremiumUser,
  getOfferings,
  purchasePackage,
  restorePurchases,
  identifyUser,
  logoutUser,
  getExpirationDate,
  hasLifetimeAccess,
  getActiveProductId,
  formatPrice,
  getPackageByIdentifier,
  setCustomerAttributes,
  ENTITLEMENTS,
};
