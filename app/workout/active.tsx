import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import WorkoutProgressHeader from '@/components/workout/WorkoutProgressHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import ExerciseItem from '@/components/workout/ExerciseItem';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useWorkout } from '@/hooks/useWorkout';
import { WEEK_PLAN } from '@/data/workouts';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

export default function ActiveWorkoutScreen() {
  const { dayIndex } = useLocalSearchParams<{ dayIndex: string }>();
  const workout = WEEK_PLAN[Number(dayIndex)] ?? WEEK_PLAN.find(d => d.today)!;
  const { checked, doneCount, progress, allDone, toggleExercise } = useWorkout(workout.exercises);

  function handleVideoPress(exerciseIndex: number) {
    router.push({ pathname: '/workout/exercise-video', params: { dayIndex: dayIndex ?? '2', exerciseIndex: exerciseIndex.toString() } });
  }

  function handleComplete() {
    router.push('/workout/completion');
  }

  return (
    <SafeAreaView style={styles.container}>
      <WorkoutProgressHeader
        name={workout.name}
        duration={workout.duration}
        exerciseCount={workout.exercises.length}
        onBack={() => router.back()}
      />
      <View style={styles.progressSection}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>{doneCount}/{workout.exercises.length} vežbi odrađeno</Text>
      </View>
      <FlatList
        data={workout.exercises}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ExerciseItem
            exercise={item}
            checked={checked[index]}
            onToggle={() => toggleExercise(index)}
            onVideoPress={() => handleVideoPress(index)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      {allDone && (
        <View style={styles.completeSection}>
          <PrimaryButton title="Završi trening! 🎉" onPress={handleComplete} variant="success" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  progressSection: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.sm,
  },
  progressText: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xl,
  },
  completeSection: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
});
