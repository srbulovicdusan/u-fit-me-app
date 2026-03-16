import { View, StyleSheet } from 'react-native';
import StreakCard from '@/components/home/StreakCard';
import { Colors } from '@/constants/colors';

interface CompletionStatsProps {
  streak: number;
  duration: string;
}

export default function CompletionStats({ streak, duration }: CompletionStatsProps) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <StreakCard value={`🔥 ${streak}`} label="Streak dana" color={Colors.accent} bgColor={Colors.card} />
      </View>
      <View style={styles.card}>
        <StreakCard value={duration} label="Trajanje" color={Colors.primary} bgColor={Colors.card} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
