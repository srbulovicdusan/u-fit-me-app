import { useContext } from 'react';
import { SubscriptionContext } from '@/providers/subscription-provider';

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
}
