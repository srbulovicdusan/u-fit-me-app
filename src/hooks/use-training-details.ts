import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import type { WorkoutDay, Exercise } from '@/types';

interface DbWde {
  id: string;
  sets: string;
  order_index: number;
  exercises: {
    id: string;
    name: string;
    video_url: string | null;
    cover_url: string | null;
    technique_tips: string | null;
  };
}

interface DbDay {
  id: string;
  name: string | null;
  is_rest_day: boolean;
  duration_min: number | null;
  cover_url: string | null;
  workout_day_exercises: DbWde[];
}

async function fetchTrainingDetails(dayId: string, userId: string | undefined): Promise<WorkoutDay | null> {
  const { data: day, error } = await supabase
    .from('workout_days')
    .select(`
      id,
      name,
      is_rest_day,
      duration_min,
      cover_url,
      workout_day_exercises (
        id,
        sets,
        order_index,
        exercises ( id, name, video_url, cover_url, technique_tips )
      )
    `)
    .eq('id', dayId)
    .single();

  if (error || !day) return null;

  const d = day as unknown as DbDay;

  if (d.is_rest_day) {
    return {
      day: '',
      name: 'Odmor',
      duration: '',
      done: false,
      rest: true,
      today: false,
      exercises: [],
      dayId: d.id,
    };
  }

  const wdeIds = d.workout_day_exercises.map((e) => e.id);

  const { data: completions } = wdeIds.length > 0 && userId
    ? await supabase
        .from('exercise_completions')
        .select('workout_day_exercise_id')
        .eq('user_id', userId)
        .in('workout_day_exercise_id', wdeIds)
    : { data: [] };

  const completedSet = new Set(
    (completions ?? []).map((c: { workout_day_exercise_id: string }) => c.workout_day_exercise_id),
  );

  const exercises: Exercise[] = d.workout_day_exercises
    .sort((a, b) => a.order_index - b.order_index)
    .map((wde) => ({
      id: wde.exercises.id,
      workoutDayExerciseId: wde.id,
      name: wde.exercises.name,
      sets: wde.sets,
      done: completedSet.has(wde.id),
      videoUrl: wde.exercises.video_url ?? undefined,
      coverUrl: wde.exercises.cover_url ?? undefined,
      techniqueTips: wde.exercises.technique_tips ?? undefined,
    }));

  const done = exercises.length > 0 && exercises.every((e) => e.done);

  return {
    day: '',
    name: d.name ?? 'Trening',
    duration: `${d.duration_min ?? 0} min`,
    done,
    rest: false,
    today: false,
    exercises,
    dayId: d.id,
    coverUrl: d.cover_url ?? undefined,
  };
}

export function useTrainingDetails(dayId: string | undefined) {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { data: workout = null, isLoading, error } = useQuery({
    queryKey: ['trainingDetails', dayId, userId],
    queryFn: () => fetchTrainingDetails(dayId!, userId),
    enabled: !!dayId,
  });

  return { workout, isLoading, error: error?.message ?? null };
}
