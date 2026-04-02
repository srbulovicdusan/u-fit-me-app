import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type PurchasesPackage } from 'react-native-purchases';
import { useQueryClient } from '@tanstack/react-query';
import ScreenContainer from '@/components/ui/screen-container';
import PackageCtaCard from '@/components/home/package-cta-card';
import FaqSection from '@/components/packages/faq-section';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';
import { getCurrentOffering } from '@/lib/revenue-cat';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

export default function PackagesScreen() {
  const { session } = useAuth();
  const { purchase } = useSubscription();
  const queryClient = useQueryClient();
  const [rcPackage, setRcPackage] = useState<PurchasesPackage | null>(null);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    async function loadOffering() {
      const offering = await getCurrentOffering();
      if (offering?.availablePackages?.length) {
        setRcPackage(offering.lifetime ?? offering.availablePackages[0]);
      }
    }
    loadOffering();
  }, []);

  // Automatski pokreni kupovinu ako je korisnik vraćen sa login-a
  useEffect(() => {
    async function checkPendingPurchase() {
      const pending = await AsyncStorage.getItem('fitsa_pending_purchase');
      if (pending === 'true' && session && rcPackage) {
        await AsyncStorage.removeItem('fitsa_pending_purchase');
        handleBuy();
      }
    }
    checkPendingPurchase();
  }, [session, rcPackage]);

  async function handleBuy() {
    if (!session) {
      await AsyncStorage.setItem('fitsa_pending_purchase', 'true');
      router.push('/(auth)/sign-in');
      return;
    }

    if (!rcPackage) {
      Alert.alert('Greška', 'Proizvod nije dostupan. Pokušajte ponovo.');
      return;
    }
    setBuyLoading(true);
    try {
      await purchase(rcPackage);
      queryClient.invalidateQueries({ queryKey: ['workoutPlan'] });
      router.replace('/(paid)');
    } catch (e: unknown) {
      if (e instanceof Error && !e.message.includes('cancelled')) {
        Alert.alert('Greška', e.message);
      }
    } finally {
      setBuyLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Izaberi paket</Text>
        <Text style={styles.subtitle}>Jednokratna kupovina — pristup zauvek</Text>
      </View>
      <PackageCtaCard onPress={handleBuy} loading={buyLoading} buttonText="Kupi program" />
      <FaqSection />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1Display,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
