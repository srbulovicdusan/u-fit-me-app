import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

export default function CalendarLegend() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.dot, { backgroundColor: Colors.success }]} />
        <Text style={styles.text}>Odrađeno</Text>
      </View>
      <View style={styles.item}>
        <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
        <Text style={styles.text}>Danas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.screenPadding,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 11,
    color: Colors.muted,
  },
});
