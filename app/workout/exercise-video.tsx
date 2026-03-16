import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ExerciseDetails from '@/components/workout/ExerciseDetails';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { WEEK_PLAN } from '@/data/workouts';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

export default function ExerciseVideoScreen() {
  const { dayIndex, exerciseIndex } = useLocalSearchParams<{ dayIndex: string; exerciseIndex: string }>();
  const workout = WEEK_PLAN[Number(dayIndex)];
  const exercise = workout?.exercises[Number(exerciseIndex)];

  if (!exercise) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      {/* Video placeholder */}
      <View style={styles.videoPlaceholder}>
        <View style={styles.playButton}>
          <Ionicons name="play" size={24} color={Colors.white} />
        </View>
      </View>

      <ExerciseDetails exercise={exercise} />

      <View style={styles.altButton}>
        <PrimaryButton title="Zameni alternativnom vežbom" onPress={() => {}} variant="outline" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  videoPlaceholder: {
    marginHorizontal: Spacing.screenPadding,
    height: 200,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  altButton: {
    paddingHorizontal: Spacing.screenPadding,
    marginTop: Spacing.md,
  },
});
