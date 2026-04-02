import { Platform } from 'react-native';
import Purchases, { type PurchasesOffering } from 'react-native-purchases';

const API_KEY_IOS = process.env.EXPO_PUBLIC_REVENUECAT_IOS ?? '';
const API_KEY_ANDROID = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID ?? '';

let isConfigured = false;

export function configureRevenueCat() {
  if (isConfigured) return;

  const apiKey = Platform.OS === 'ios' ? API_KEY_IOS : API_KEY_ANDROID;
  if (!apiKey) return;

  Purchases.configure({ apiKey });
  isConfigured = true;
}

export function isRevenueCatConfigured() {
  return isConfigured;
}

export async function loginRevenueCat(userId: string) {
  if (!isConfigured) return;
  try {
    await Purchases.logIn(userId);
  } catch {
    // will retry on next auth change
  }
}

export async function logoutRevenueCat() {
  if (!isConfigured) return;
  try {
    const isAnonymous = await Purchases.isAnonymous();
    if (!isAnonymous) {
      await Purchases.logOut();
    }
  } catch {
    // already anonymous
  }
}

export const ENTITLEMENT_ID = 'Get Fit by Marko Bijelovic Pro';

export async function checkSubscription(): Promise<boolean> {
  if (!isConfigured) return false;
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch {
    return false;
  }
}

export async function getCurrentOffering(): Promise<PurchasesOffering | null> {
  if (!isConfigured) return null;
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch {
    return null;
  }
}
