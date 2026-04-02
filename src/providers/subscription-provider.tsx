import { createContext, useEffect, useState, type ReactNode } from 'react';
import Purchases, { type PurchasesPackage } from 'react-native-purchases';
import { ENTITLEMENT_ID, isRevenueCatConfigured } from '@/lib/revenue-cat';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';

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
  const { session } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setIsSubscribed(false);
      setCurrentPackage(null);
      setIsLoading(false);
      return;
    }
    checkStatus();
  }, [session?.user?.id]);

  async function checkStatus() {
    // Mock subscription za development — setuj u .env.local
    if (process.env.EXPO_PUBLIC_MOCK_SUBSCRIPTION === 'true') {
      setIsSubscribed(true);
      setCurrentPackage('plan-treninga');
      setIsLoading(false);
      return;
    }

    if (!session?.user) {
      setIsSubscribed(false);
      setCurrentPackage(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Čitamo iz baze — Edge Function je već validirala kupovinu sa RevenueCat-om pre upisa
      const { data } = await supabase
        .from('subscriptions')
        .select('id, package_type, revenue_cat_id')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .maybeSingle();

      setIsSubscribed(!!data);
      setCurrentPackage(data?.revenue_cat_id ?? null);
    } catch {
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function syncPurchase(productIdentifier: string) {
    try {
      await supabase.functions.invoke('sync-purchase', {
        body: { productIdentifier },
      });
    } catch {
      // Fail silently — RevenueCat ostaje source of truth
    }
  }

  async function purchase(pkg: PurchasesPackage) {
    if (!isRevenueCatConfigured()) return;
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const active = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    setIsSubscribed(active);

    if (active) {
      const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
      const productId = entitlement?.productIdentifier ?? pkg.product.identifier;
      setCurrentPackage(productId);
      await syncPurchase(productId);
    }
  }

  async function restore() {
    const customerInfo = await Purchases.restorePurchases();
    const active = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    setIsSubscribed(active);

    if (active) {
      const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
      const productId = entitlement?.productIdentifier ?? null;
      setCurrentPackage(productId);
      if (productId) {
        await syncPurchase(productId);
      }
    }
  }

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, currentPackage, isLoading, purchase, restore }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
