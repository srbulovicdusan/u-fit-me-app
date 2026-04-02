import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

const DAY_HEADERS = ['P', 'U', 'S', 'Č', 'P', 'S', 'N'];

export default function CalendarGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.month}>Mart 2026</Text>
      <View style={styles.grid}>
        {DAY_HEADERS.map((d, i) => (
          <View key={`h-${i}`} style={styles.cell}>
            <Text style={styles.header}>{d}</Text>
          </View>
        ))}
        {Array.from({ length: 42 }, (_, i) => {
          const day = i - 5;
          if (day < 1 || day > 31) return <View key={i} style={styles.cell} />;
          const done = [2, 4, 6, 9, 11, 13].includes(day);
          const today = day === 15;
          const future = day > 15;

          return (
            <View key={i} style={[styles.cell, today && styles.todayCell]}>
              <Text style={[
                styles.dayText,
                future && styles.futureText,
                today && styles.todayText,
              ]}>
                {day}
              </Text>
              {done && <View style={[styles.dot, { backgroundColor: Colors.success }]} />}
              {today && <View style={[styles.dot, { backgroundColor: Colors.primary }]} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xl,
  },
  month: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  header: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '600',
  },
  dayText: {
    fontSize: 13,
    color: Colors.text,
  },
  futureText: {
    color: Colors.muted,
  },
  todayCell: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  todayText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 2,
  },
});
