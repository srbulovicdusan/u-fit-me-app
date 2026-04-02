import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { WorkoutDay, Exercise } from '@/types';

interface RpcExercise {
  workoutDayExerciseId: string;
  id: string;
  name: string;
  sets: string;
  order_index: number;
  videoUrl: string | null;
  coverUrl: string | null;
  techniqueTips: string | null;
  done: boolean;
}

interface RpcRow {
  day_id: string;
  name: string;
  cover_url: string | null;
  duration_min: number | null;
  exercise_count: number;
  exercises: RpcExercise[];
}

async function fetchFreeWorkout(): Promise<WorkoutDay | null> {
  const { data, error } = await supabase.rpc('get_free_workout');
  if (error || !data || data.length === 0) return null;

  const row = data[0] as RpcRow;

  const exercises: Exercise[] = (row.exercises ?? []).map((e) => ({
    id: e.id,
    workoutDayExerciseId: e.workoutDayExerciseId,
    name: e.name,
    sets: e.sets,
    done: false,
    videoUrl: e.videoUrl ?? undefined,
    coverUrl: e.coverUrl ?? undefined,
    techniqueTips: e.techniqueTips ?? undefined,
  }));

  return {
    day: '',
    name: row.name,
    duration: `${row.duration_min ?? 0} min`,
    done: false,
    rest: false,
    today: false,
    exercises,
    dayId: row.day_id,
    coverUrl: row.cover_url ?? undefined,
  };
}

export function useFreeTraining() {
  const { data: workout = null, isLoading, error } = useQuery({
    queryKey: ['freeTraining'],
    queryFn: fetchFreeWorkout,
    staleTime: 1000 * 60 * 60,
  });

  return { workout, isLoading, error: error?.message ?? null };
}
