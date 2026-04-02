import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Clock } from 'lucide-react-native';
import PrimaryButton from '@/components/ui/primary-button';
import ProgressBar from '@/components/ui/progress-bar';
import Badge from '@/components/ui/badge';
import { useTrainingDetails } from '@/hooks/use-training-details';
import { useWorkout } from '@/hooks/use-workout';
import WorkoutDetailSkeleton from '@/components/workout/workout-detail-skeleton';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fallbackHero = require('../../assets/trening-mock.png');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fallbackExercise = require('../../assets/plank.jpg');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 360;

export default function WorkoutDetailScreen() {
  const { dayId } = useLocalSearchParams<{ dayId: string }>();
  const { workout, isLoading } = useTrainingDetails(dayId);
  const { checked, doneCount, progress, toggleExercise } = useWorkout(workout?.exercises ?? []);

  if (isLoading) return <WorkoutDetailSkeleton />;

  if (!workout || workout.rest) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Nema treninga za ovaj dan.</Text>
      </SafeAreaView>
    );
  }

  function handleVideoPress(exerciseIndex: number) {
    router.push({ pathname: '/workout/exercise-video', params: { dayId: dayId ?? '', exerciseIndex: exerciseIndex.toString() } });
  }

  function handleStart() {
    handleVideoPress(0);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero slika */}
        <View style={styles.heroContainer}>
          <Image source={workout.coverUrl ? { uri: workout.coverUrl } : fallbackHero} style={styles.heroImage} resizeMode="cover" />
          <SafeAreaView style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Sadržaj */}
        <View style={styles.content}>
          <Text style={styles.title}>{workout.name}</Text>
          <View style={styles.badgeRow}>
            <Badge
              text={workout.duration}
              variant="accent"
              icon={<Clock size={14} color={Colors.accent} strokeWidth={2} />}
            />
            <Badge text={`${workout.exercises.length} vežbi`} variant="primary" />
          </View>
          <Text style={styles.description}>
            Radimo na snazi i izdržljivosti donjeg dela tela.{'\n'}Fokus je na pravilnu formu, savijaj i kontrolu pokreta. Pokušaj svaki pokret polako.
          </Text>

          {/* Sekcija header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vežbe u ovom treningu</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressSection}>
            <ProgressBar progress={progress} color={Colors.primary} />
            <Text style={styles.progressText}>{doneCount}/{workout.exercises.length} vežbi odrađeno</Text>
          </View>

          {/* Lista vežbi */}
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id} style={[styles.exerciseCard, checked[index] && styles.exerciseCardDone]}>
              <TouchableOpacity
                style={styles.exerciseTouchable}
                onPress={() => handleVideoPress(index)}
                activeOpacity={0.7}
              >
                <Image source={exercise.coverUrl ? { uri: exercise.coverUrl } : fallbackExercise} style={styles.exerciseImage} resizeMode="cover" />
                <View style={styles.exerciseInfo}>
                  <Text style={[styles.exerciseName, checked[index] && styles.exerciseNameDone]}>{exercise.name}</Text>
                  <Text style={styles.exerciseSets}>{exercise.sets}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleExercise(index)} style={styles.checkboxTouchable}>
                <View style={[styles.checkbox, checked[index] && styles.checkboxChecked]}>
                  {checked[index] && <Ionicons name="checkmark" size={16} color={Colors.white} />}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed dugme na dnu */}
      <View style={styles.bottomButton}>
        <PrimaryButton title="Započni trening" onPress={handleStart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },

  // Hero
  heroContainer: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    overflow: 'hidden',
    zIndex: -1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
    marginTop: 8,
  },

  // Content
  content: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 20,
    borderRadius: 16,
    zIndex: 2,
    backgroundColor: Colors.bg,
    marginTop: -20,
    borderTopWidth: 1,
    borderTopColor: Colors.bgSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: 24,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  countBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },

  // Progress
  progressSection: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 6,
  },

  // Exercise card
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    gap: 12,
    height: 78,
  },
  exerciseCardDone: {},
  exerciseTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },
  checkboxTouchable: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  exerciseImage: {
    width: 84,
    height: '100%',
    borderTopStartRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,

  },
  exerciseInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  exerciseName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.text,
    marginBottom: 2,
  },
  exerciseNameDone: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  exerciseSets: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // Checkbox
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 24,
  },
  checkboxChecked: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },

  // Bottom button
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 34,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
});
