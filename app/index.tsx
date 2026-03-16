import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';

export default function Index() {
  const { session, profile, isLoading: authLoading } = useAuth();
  const { isSubscribed, isLoading: subLoading } = useSubscription();

  if (authLoading || subLoading) {
    return <Redirect href="/splash" />;
  }

  if (!session) {
    return <Redirect href="/onboarding" />;
  }

  if (!profile?.isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!isSubscribed) {
    return <Redirect href="/(free)" />;
  }

  return <Redirect href="/(paid)" />;
}
