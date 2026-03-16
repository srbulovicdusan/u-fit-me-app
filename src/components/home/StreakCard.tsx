import { View, Text, StyleSheet } from 'react-native';

interface StreakCardProps {
  value: string;
  label: string;
  color: string;
  bgColor: string;
}

export default function StreakCard({ value, label, color, bgColor }: StreakCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
});
