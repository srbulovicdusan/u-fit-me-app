import { useCallback } from 'react';
import { router } from 'expo-router';
import { useTrainingDetails } from '@/hooks/use-training-details';

export function useExerciseNavigation(dayId: string, exerciseIndex: string) {
  const exIdx = Number(exerciseIndex);

  const { workout } = useTrainingDetails(dayId);
  const exercises = workout?.exercises ?? [];
  const currentExercise = exercises[exIdx] ?? null;
  const nextExercise = exercises[exIdx + 1] ?? null;
  const prevExercise = exercises[exIdx - 1] ?? null;
  const hasNext = nextExercise !== null;
  const hasPrev = prevExercise !== null;

  const goToNext = useCallback(() => {
    if (!hasNext) return;
    router.replace({
      pathname: '/workout/exercise-video',
      params: {
        dayId,
        exerciseIndex: (exIdx + 1).toString(),
      },
    });
  }, [dayId, exIdx, hasNext]);

  const goToPrev = useCallback(() => {
    if (!hasPrev) return;
    router.replace({
      pathname: '/workout/exercise-video',
      params: {
        dayId,
        exerciseIndex: (exIdx - 1).toString(),
      },
    });
  }, [dayId, exIdx, hasPrev]);

  return {
    workout,
    currentExercise,
    nextExercise,
    prevExercise,
    hasNext,
    hasPrev,
    goToNext,
    goToPrev,
  };
}
