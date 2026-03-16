export interface Package {
  id: string;
  name: string;
  price: string;
  duration: string;
  popular: boolean;
  features: string[];
}

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';

export interface Subscription {
  id: string;
  userId: string;
  packageType: string;
  status: SubscriptionStatus;
  startedAt: string;
  expiresAt: string;
}
