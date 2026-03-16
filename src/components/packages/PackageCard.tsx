import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '@/components/ui/PrimaryButton';
import FeatureItem from './FeatureItem';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import type { Package } from '@/types';

interface PackageCardProps {
  pkg: Package;
  onBuy: () => void;
}

export default function PackageCard({ pkg, onBuy }: PackageCardProps) {
  return (
    <View style={[styles.card, pkg.popular && styles.popularCard]}>
      {pkg.popular && <Text style={styles.popularBadge}>Najpopularnije</Text>}
      <View style={styles.header}>
        <Text style={styles.name}>{pkg.name}</Text>
        <Text style={styles.duration}>{pkg.duration}</Text>
      </View>
      <Text style={styles.price}>
        {pkg.price} <Text style={styles.currency}>RSD</Text>
      </Text>
      {pkg.features.map((f, i) => (
        <FeatureItem key={i} text={f} />
      ))}
      <PrimaryButton
        title={`Izaberi ${pkg.name}`}
        onPress={onBuy}
        variant={pkg.popular ? 'primary' : 'outline'}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    paddingHorizontal: 18,
    borderRadius: Spacing.cardRadiusLg,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  popularCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 18,
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
    letterSpacing: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  duration: {
    fontSize: 11,
    color: Colors.muted,
  },
  price: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 12,
  },
  currency: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.muted,
  },
  button: {
    marginTop: 14,
  },
});
