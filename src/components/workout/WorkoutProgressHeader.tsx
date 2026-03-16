import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface WorkoutProgressHeaderProps {
  name: string;
  duration: string;
  exerciseCount: number;
  onBack: () => void;
}

export default function WorkoutProgressHeader({ name, duration, exerciseCount, onBack }: WorkoutProgressHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} hitSlop={8}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>{duration} • {exerciseCount} vežbi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  meta: {
    fontSize: 12,
    color: Colors.muted,
  },
});
