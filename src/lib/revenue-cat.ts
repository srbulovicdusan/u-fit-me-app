import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

const API_KEY_IOS = process.env.EXPO_PUBLIC_REVENUECAT_IOS ?? '';
const API_KEY_ANDROID = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID ?? '';

export function configureRevenueCat(userId?: string) {
  const apiKey = Platform.OS === 'ios' ? API_KEY_IOS : API_KEY_ANDROID;

  if (!apiKey) return;

  Purchases.configure({ apiKey, appUserID: userId });
}

export const ENTITLEMENT_ID = 'pro';

export async function checkSubscription(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch {
    return false;
  }
}
