import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import Card from '@/components/ui/card';
import PrimaryButton from '@/components/ui/primary-button';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

const FEATURES = [
  '2 meseca personalizovanog plana',
  'Pristup svim treninzima',
  'Video uputstva za svaku vežbu',
  'Chat podrška sa trenerom Markom',
];

interface PackageCtaCardProps {
  onPress: () => void;
  loading?: boolean;
  buttonText?: string;
}

export default function PackageCtaCard({ onPress, loading, buttonText = 'Započni program' }: PackageCtaCardProps) {
  return (
    <Card style={styles.card}>
      {/* Naslov */}
      <Text style={styles.packageName}>Transform</Text>

      {/* Cena */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>29€</Text>
        <Text style={styles.priceNote}> / jednokratno</Text>
      </View>
      <Text style={[styles.priceNote, styles.priceDescription]}> Manje od 1€ dnevno za tvoje zdarvlje</Text>

      {/* Feature lista */}
      <View style={styles.features}>
        {FEATURES.map((f) => (
          <View key={f} style={styles.featureRow}>
            <View style={styles.checkIcon}>
              <Check size={12} color={Colors.accent} strokeWidth={3} />
            </View>
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton title={buttonText} onPress={onPress} loading={loading} style={styles.button} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Spacing.lg,
  },
  packageName: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    lineHeight: 18,
    color: Colors.text,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
  },
  priceDescription: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#D6A6A138",
  },
  price: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 28,
    color: "#2C2A26",
  },
  priceNote: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  features: {
    gap: 12,
    marginBottom: Spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  button: {
    marginTop: Spacing.md,
  },
});
