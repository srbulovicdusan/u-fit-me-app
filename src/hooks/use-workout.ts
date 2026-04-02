import { useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import type { Exercise } from '@/types';

export function useWorkout(exercises: Exercise[]) {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();

  const wdeIds = useMemo(
    () => exercises.map(e => e.workoutDayExerciseId).filter(Boolean) as string[],
    [exercises],
  );

  const queryKey = ['exerciseCompletions', userId, wdeIds];

  const { data: completedIds = new Set<string>() } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!userId || wdeIds.length === 0) return new Set<string>();

      const { data } = await supabase
        .from('exercise_completions')
        .select('workout_day_exercise_id')
        .eq('user_id', userId)
        .in('workout_day_exercise_id', wdeIds);

      return new Set((data ?? []).map(d => d.workout_day_exercise_id));
    },
    enabled: !!userId && wdeIds.length > 0,
  });

  const checked = useMemo(
    () => exercises.map(e => completedIds.has(e.workoutDayExerciseId ?? '')),
    [exercises, completedIds],
  );

  const doneCount = useMemo(() => checked.filter(Boolean).length, [checked]);
  const progress = exercises.length > 0 ? doneCount / exercises.length : 0;
  const allDone = doneCount === exercises.length && exercises.length > 0;

  function optimisticToggle(wdeId: string, add: boolean) {
    queryClient.setQueryData<Set<string>>(queryKey, (old) => {
      const next = new Set(old);
      if (add) {
        next.add(wdeId);
      } else {
        next.delete(wdeId);
      }
      return next;
    });
  }

  function invalidateWeeklyData() {
    queryClient.invalidateQueries({ queryKey: ['userWorkoutWeek', userId] });
    queryClient.invalidateQueries({ queryKey: ['trainingDetails'] });
  }

  const completeMutation = useMutation({
    mutationFn: async (wdeId: string) => {
      if (!userId) return;
      await supabase
        .from('exercise_completions')
        .upsert({ user_id: userId, workout_day_exercise_id: wdeId });
    },
    onMutate: (wdeId) => {
      optimisticToggle(wdeId, true);
    },
    onError: (_err, wdeId) => {
      optimisticToggle(wdeId, false);
    },
    onSuccess: invalidateWeeklyData,
  });

  const uncompleteMutation = useMutation({
    mutationFn: async (wdeId: string) => {
      if (!userId) return;
      await supabase
        .from('exercise_completions')
        .delete()
        .eq('user_id', userId)
        .eq('workout_day_exercise_id', wdeId);
    },
    onMutate: (wdeId) => {
      optimisticToggle(wdeId, false);
    },
    onError: (_err, wdeId) => {
      optimisticToggle(wdeId, true);
    },
    onSuccess: invalidateWeeklyData,
  });

  const toggleExercise = useCallback((index: number) => {
    const wdeId = exercises[index]?.workoutDayExerciseId;
    if (!wdeId) return;

    if (checked[index]) {
      uncompleteMutation.mutate(wdeId);
    } else {
      completeMutation.mutate(wdeId);
    }
  }, [exercises, checked, completeMutation, uncompleteMutation]);

  const markExerciseComplete = useCallback((exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise?.workoutDayExerciseId) return;
    if (completedIds.has(exercise.workoutDayExerciseId)) return;
    completeMutation.mutate(exercise.workoutDayExerciseId);
  }, [exercises, completedIds, completeMutation]);

  const reset = useCallback(() => {
    // noop za sad
  }, []);

  return { checked, doneCount, progress, allDone, toggleExercise, markExerciseComplete, reset };
}
