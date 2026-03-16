import { View, StyleSheet } from 'react-native';
import MeasurementCard from './MeasurementCard';
import { Spacing } from '@/constants/typography';
import type { Measurement } from '@/types';

interface MeasurementsGridProps {
  measurements: Measurement[];
}

export default function MeasurementsGrid({ measurements }: MeasurementsGridProps) {
  return (
    <View style={styles.grid}>
      {measurements.map((m, i) => (
        <MeasurementCard key={i} measurement={m} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.lg,
  },
});
