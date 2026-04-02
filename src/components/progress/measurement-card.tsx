import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import type { Measurement } from '@/types';

interface MeasurementCardProps {
  measurement: Measurement;
}

export default function MeasurementCard({ measurement: m }: MeasurementCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{m.label}</Text>
      <Text style={styles.value}>{m.value}</Text>
      <Text style={[styles.change, m.good && styles.good]}>{m.change} cm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    color: Colors.muted,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 4,
  },
  change: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.muted,
  },
  good: {
    color: Colors.success,
  },
});
