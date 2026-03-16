import { createContext, useEffect, useState, type ReactNode } from 'react';
import Purchases, { type PurchasesPackage } from 'react-native-purchases';
import { ENTITLEMENT_ID, checkSubscription } from '@/lib/revenue-cat';

interface SubscriptionContextValue {
  isSubscribed: boolean;
  currentPackage: string | null;
  isLoading: boolean;
  purchase: (pkg: PurchasesPackage) => Promise<void>;
  restore: () => Promise<void>;
}

export const SubscriptionContext = createContext<SubscriptionContextValue>({
  isSubscribed: false,
  currentPackage: null,
  isLoading: true,
  purchase: async () => {},
  restore: async () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    try {
      const active = await checkSubscription();
      setIsSubscribed(active);

      if (active) {
        const info = await Purchases.getCustomerInfo();
        const entitlement = info.entitlements.active[ENTITLEMENT_ID];
        setCurrentPackage(entitlement?.productIdentifier ?? null);
      }
    } catch {
      // RevenueCat not configured yet — default to not subscribed
    } finally {
      setIsLoading(false);
    }
  }

  async function purchase(pkg: PurchasesPackage) {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const active = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    setIsSubscribed(active);
  }

  async function restore() {
    const customerInfo = await Purchases.restorePurchases();
    const active = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    setIsSubscribed(active);
  }

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, currentPackage, isLoading, purchase, restore }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
