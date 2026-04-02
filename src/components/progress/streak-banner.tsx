import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

export default function StreakBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>🔥</Text>
      <View>
        <Text style={styles.title}>5 dana zaredom!</Text>
        <Text style={styles.subtitle}>Još 2 dana do novog ličnog rekorda</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: Spacing.screenPadding,
    padding: Spacing.cardPadding,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.accentLight,
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.accent,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.accent,
  },
});
