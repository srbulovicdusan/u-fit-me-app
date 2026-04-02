import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import { Colors } from '@/constants/colors';

const WEIGHT_DATA = [
  { week: 'N1', value: 74.8 },
  { week: 'N2', value: 74.2 },
  { week: 'N3', value: 73.5 },
  { week: 'N4', value: 72.5 },
];

export default function WeightChart() {
  return (
    <Card>
      <Text style={styles.title}>Težina — poslednja 4 nedelje</Text>
      <View style={styles.chart}>
        {WEIGHT_DATA.map((d, i) => (
          <View key={i} style={styles.barContainer}>
            <Text style={styles.barValue}>{d.value}</Text>
            <View style={[
              styles.bar,
              { height: (d.value - 70) * 18 },
              i === WEIGHT_DATA.length - 1 ? styles.barCurrent : styles.barPast,
            ]} />
            <Text style={styles.barLabel}>{d.week}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  chart: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    paddingHorizontal: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barValue: {
    fontSize: 10,
    color: Colors.muted,
  },
  bar: {
    width: '100%',
    borderRadius: 6,
  },
  barCurrent: {
    backgroundColor: Colors.primary,
  },
  barPast: {
    backgroundColor: Colors.primaryLight,
  },
  barLabel: {
    fontSize: 10,
    color: Colors.muted,
  },
});
