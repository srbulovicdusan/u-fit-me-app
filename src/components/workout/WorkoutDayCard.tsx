import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from '@/components/ui/Badge';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import type { WorkoutDay } from '@/types';

interface WorkoutDayCardProps {
  day: WorkoutDay;
  onStart?: () => void;
}

export default function WorkoutDayCard({ day, onStart }: WorkoutDayCardProps) {
  return (
    <View style={[styles.card, day.today && styles.todayCard, day.rest && styles.restCard]}>
      <View style={styles.row}>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={[styles.dayLabel, day.today && styles.dayLabelToday]}>{day.day}</Text>
            <Text style={[styles.name, day.rest && styles.nameMuted]}>{day.name}</Text>
            {day.today && <Badge text="DANAS" />}
          </View>
          {day.duration ? (
            <Text style={styles.meta}>{day.duration} • {day.exercises?.length} vežbi</Text>
          ) : day.rest ? (
            <Text style={styles.meta}>Tvoje telo se regeneriše 🧘‍♀️</Text>
          ) : null}
        </View>
        {day.done && <Ionicons name="checkmark-circle" size={22} color={Colors.success} />}
      </View>
      {day.today && onStart && (
        <PrimaryButton title="Započni trening →" onPress={onStart} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: Spacing.cardRadius,
    marginBottom: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  todayCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  restCard: {
    backgroundColor: Colors.bg,
    borderColor: Colors.borderLight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.muted,
    minWidth: 30,
  },
  dayLabelToday: {
    color: Colors.primary,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  nameMuted: {
    color: Colors.muted,
  },
  meta: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
    marginLeft: 38,
  },
  button: {
    marginTop: 12,
  },
});
