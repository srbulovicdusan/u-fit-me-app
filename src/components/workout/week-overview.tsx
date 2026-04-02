import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import DayBox from './day-box';
import { Colors } from '@/constants/colors';
import type { WorkoutDay } from '@/types';

interface WeekOverviewProps {
  weekPlan: WorkoutDay[];
}

export default function WeekOverview({ weekPlan }: WeekOverviewProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Ova nedelja</Text>
      <View style={styles.row}>
        {weekPlan.map((day, i) => (
          <DayBox key={i} day={day} />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
});
