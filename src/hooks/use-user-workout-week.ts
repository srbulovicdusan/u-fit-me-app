import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import type { WorkoutDay, Exercise } from '@/types';

const DAY_NAMES = ['PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB', 'NED'];

function getTodayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

interface RpcExercise {
  workoutDayExerciseId: string;
  id: string;
  name: string;
  sets: string;
  order_index: number;
  videoUrl: string | null;
  techniqueTips: string | null;
  done: boolean;
}

interface RpcDay {
  day_id: string;
  day_of_week: number;
  duration_min: number | null;
  is_rest_day: boolean;
  is_completed: boolean;
  exercises: RpcExercise[];
}

async function fetchUserWorkoutWeek(userId: string): Promise<WorkoutDay[]> {
  const { data, error } = await supabase.rpc('get_user_workout_week', {
    p_user_id: userId,
  });

  if (error) throw error;

  const todayIdx = getTodayIndex();
  const daysMap = new Map<number, RpcDay>();
  for (const row of (data ?? []) as RpcDay[]) {
    daysMap.set(row.day_of_week, row);
  }

  return DAY_NAMES.map((dayName, i) => {
    const dbDay = daysMap.get(i);

    if (!dbDay || dbDay.is_rest_day) {
      return {
        day: dayName,
        name: 'Odmor',
        duration: '',
        done: false,
        rest: true,
        today: i === todayIdx,
        exercises: [],
        dayId: dbDay?.day_id,
      };
    }

    const exercises: Exercise[] = (dbDay.exercises ?? []).map((e) => ({
      id: e.id,
      workoutDayExerciseId: e.workoutDayExerciseId,
      name: e.name,
      sets: e.sets,
      done: e.done,
      videoUrl: e.videoUrl ?? undefined,
      techniqueTips: e.techniqueTips ?? undefined,
    }));

    return {
      day: dayName,
      name: 'Trening',
      duration: `${dbDay.duration_min ?? 0} min`,
      done: dbDay.is_completed,
      rest: false,
      today: i === todayIdx,
      exercises,
      dayId: dbDay.day_id,
    };
  });
}

export function useUserWorkoutWeek() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { data: weekDays = [], isLoading, error } = useQuery({
    queryKey: ['userWorkoutWeek', userId],
    queryFn: () => fetchUserWorkoutWeek(userId!),
    enabled: !!userId,
  });

  const workoutDays = weekDays.filter((d) => !d.rest);
  const done = workoutDays.filter((d) => d.done).length;
  const total = workoutDays.length;
  const remaining = Math.max(0, total - done);
  const progress = total > 0 ? done / total : 0;

  return { weekDays, done, total, remaining, progress, isLoading, error: error?.message ?? null };
}
