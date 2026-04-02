import { View, Text, StyleSheet } from 'react-native';
import { Clock, Dumbbell, Snowflake } from 'lucide-react-native';
import Card from '@/components/ui/card';
import PrimaryButton from '@/components/ui/primary-button';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import type { CalendarDayInfo } from '@/types';

interface DayActivityCardProps {
  dayInfo: CalendarDayInfo | null;
  dayName: string;
  onViewWorkout: () => void;
}

export default function DayActivityCard({ dayInfo, dayName, onViewWorkout }: DayActivityCardProps) {
  if (!dayInfo || (!dayInfo.isWorkoutDay && !dayInfo.isRestDay)) {
    return null;
  }

  if (dayInfo.isRestDay) {
    return (
      <Card style={styles.card}>
        <Text style={styles.dayLabel}>{dayName}</Text>
        <Text style={styles.title}>Dan odmora</Text>
        <View style={styles.metaRow}>
          <Snowflake size={16} color={Colors.textSecondary} />
          <Text style={styles.metaText}>Oporavak je deo napretka</Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Text style={styles.dayLabel}>{dayInfo.isToday ? 'Danas' : dayName}</Text>
      <Text style={styles.title}>{dayInfo.workoutName}</Text>
      <View style={styles.metaRow}>
        <Clock size={16} color={Colors.textSecondary} />
        <Text style={styles.metaText}>{dayInfo.durationMin ?? 0} min</Text>
        <Dumbbell size={16} color={Colors.textSecondary} style={styles.metaIcon} />
        <Text style={styles.metaText}>{dayInfo.exerciseCount} vežbi</Text>
      </View>
      <PrimaryButton
        title="Pogledaj trening"
        onPress={onViewWorkout}
        style={styles.button}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 4,
  },
  dayLabel: {
    ...Typography.labelUppercase,
    color: Colors.primary,
    marginBottom: 2,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    ...Typography.description,
    color: Colors.textSecondary,
  },
  metaIcon: {
    marginLeft: 8,
  },
  button: {
    marginTop: Spacing.md,
  },
});
