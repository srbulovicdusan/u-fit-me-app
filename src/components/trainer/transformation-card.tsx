import { View, Text, StyleSheet } from 'react-native';
import Badge from '@/components/ui/badge';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import type { Transformation } from '@/data/workouts';

interface TransformationCardProps {
  transformation: Transformation;
}

export default function TransformationCard({ transformation: t }: TransformationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{t.name}, {t.age} god.</Text>
        <Badge text={`${t.months} meseca`} color={Colors.success} bgColor={Colors.successLight} />
      </View>
      <Text style={styles.desc}>{t.desc}</Text>
      <View style={styles.photoRow}>
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>Pre</Text>
        </View>
        <View style={[styles.photoPlaceholder, styles.photoAfter]}>
          <Text style={[styles.photoText, { color: Colors.success }]}>Posle</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.screenPadding,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  desc: {
    ...Typography.description,
    color: Colors.textSecondary,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  photoPlaceholder: {
    flex: 1,
    height: 70,
    borderRadius: 8,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoAfter: {
    backgroundColor: Colors.successLight,
  },
  photoText: {
    fontSize: 11,
    color: Colors.muted,
  },
});
