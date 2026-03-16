import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExerciseCheckbox from './ExerciseCheckbox';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import type { Exercise } from '@/types';

interface ExerciseItemProps {
  exercise: Exercise;
  checked: boolean;
  onToggle: () => void;
  onVideoPress: () => void;
}

export default function ExerciseItem({ exercise, checked, onToggle, onVideoPress }: ExerciseItemProps) {
  return (
    <View style={[styles.container, checked && styles.containerChecked]}>
      <ExerciseCheckbox checked={checked} onToggle={onToggle} />
      <TouchableOpacity style={styles.content} onPress={onVideoPress} activeOpacity={0.7}>
        <Text style={[styles.name, checked && styles.nameChecked]}>{exercise.name}</Text>
        <Text style={styles.sets}>{exercise.sets}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.videoButton} onPress={onVideoPress} activeOpacity={0.7}>
        <Ionicons name="play" size={12} color={Colors.primary} />
        <Text style={styles.videoText}>Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  containerChecked: {
    backgroundColor: Colors.successLight,
    borderColor: 'transparent',
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  nameChecked: {
    textDecorationLine: 'line-through',
  },
  sets: {
    fontSize: 12,
    color: Colors.muted,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  videoText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
});
