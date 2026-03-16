import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/ScreenContainer';
import PackageCard from '@/components/packages/PackageCard';
import FaqSection from '@/components/packages/FaqSection';
import { useSubscription } from '@/hooks/useSubscription';
import { PACKAGES } from '@/data/workouts';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

export default function PackagesScreen() {
  const { purchase } = useSubscription();

  async function handleBuy() {
    // TODO: Integrate with RevenueCat packages
    // For now, navigate to paid zone
    router.replace('/(paid)');
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Izaberi svoj paket</Text>
        <Text style={styles.subtitle}>Jednokratna kupovina, bez pretplate</Text>
      </View>
      <View style={styles.packages}>
        {PACKAGES.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} onBuy={handleBuy} />
        ))}
      </View>
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
  packages: {
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
  },
});
