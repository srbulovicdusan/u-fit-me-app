import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import StreakCard from './StreakCard';

export default function StreakRow() {
  return (
    <View style={styles.row}>
      <StreakCard value="🔥 5" label="dana zaredom" color={Colors.accent} bgColor={Colors.accentLight} />
      <StreakCard value="12" label="treninga ovog meseca" color={Colors.success} bgColor={Colors.successLight} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 10,
  },
});
