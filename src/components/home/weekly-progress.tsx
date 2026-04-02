import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface WeeklyProgressProps {
  done: number;
  total: number;
  remaining: number;
  progress: number;
}

export default function WeeklyProgress({ done, total, remaining, progress }: WeeklyProgressProps) {
  if (total === 0) return null;

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Tvoj napredak</Text>
      <Text style={styles.subtitle}><Text style={styles.subtitleBolded}>{done} od {total}</Text> treninga ove nedelje</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.round(progress * 100)}%` }]} />
      </View>
      <Text style={styles.hint}>
        {remaining === 0 ? 'Ispunila si cilj! 🎉' : `Još ${remaining} i ispuniš cilj!`}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 4,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  subtitleBolded: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  barTrack: {
    height: Spacing.progressBarHeight,
    backgroundColor: Colors.primaryLight,
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 99,
  },
  hint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
