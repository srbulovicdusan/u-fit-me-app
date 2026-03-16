import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import type { WorkoutDay } from '@/types';

interface DayBoxProps {
  day: WorkoutDay;
}

export default function DayBox({ day }: DayBoxProps) {
  return (
    <View style={[
      styles.box,
      day.today && styles.today,
      day.done && styles.done,
      day.rest && !day.today && styles.rest,
    ]}>
      <Text style={[styles.label, day.today && styles.labelToday]}>
        {day.day}
      </Text>
      {day.done ? (
        <Text style={styles.check}>✓</Text>
      ) : day.rest ? (
        <Text style={styles.dash}>—</Text>
      ) : day.today ? (
        <View style={styles.dotActive} />
      ) : (
        <View style={styles.dotInactive} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  today: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  done: {
    backgroundColor: Colors.successLight,
  },
  rest: {
    backgroundColor: Colors.bg,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.muted,
  },
  labelToday: {
    color: Colors.primary,
    fontWeight: '700',
  },
  check: {
    color: Colors.success,
    fontSize: 14,
    marginTop: 4,
  },
  dash: {
    color: Colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
});
