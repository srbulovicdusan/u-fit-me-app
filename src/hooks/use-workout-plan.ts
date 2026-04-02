import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import type { WorkoutDay, Exercise } from '@/types';

const DAY_NAMES = ['PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB', 'NED'];

function getTodayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

interface DbExercise {
  id: string;
  name: string;
  video_url: string | null;
  technique_tips: string | null;
}

interface DbWorkoutDayExercise {
  id: string;
  exercise_id: string;
  sets: string;
  order_index: number;
  exercises: DbExercise;
}

interface DbWorkoutDay {
  id: string;
  week_number: number;
  day_of_week: number;
  duration_min: number | null;
  is_rest_day: boolean;
  workout_day_exercises: DbWorkoutDayExercise[];
}

function buildWeek(days: DbWorkoutDay[], weekNumber: number, todayIdx: number): WorkoutDay[] {
  const daysMap = new Map<number, DbWorkoutDay>();
  for (const day of days) {
    if (day.week_number === weekNumber) {
      daysMap.set(day.day_of_week, day);
    }
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
        dayId: dbDay?.id,
      };
    }

    const exercises: Exercise[] = (dbDay.workout_day_exercises ?? [])
      .sort((a, b) => a.order_index - b.order_index)
      .map((wde) => ({
        id: wde.exercises.id,
        workoutDayExerciseId: wde.id,
        name: wde.exercises.name,
        sets: wde.sets,
        done: false,
        videoUrl: wde.exercises.video_url ?? undefined,
        techniqueTips: wde.exercises.technique_tips ?? undefined,
      }));

    return {
      day: dayName,
      name: 'Trening',
      duration: `${dbDay.duration_min ?? 0} min`,
      done: false,
      rest: false,
      today: i === todayIdx,
      exercises,
      dayId: dbDay.id,
    };
  });
}

async function fetchFullPlan(userId: string): Promise<{ planName: string; weeks: WorkoutDay[][] }> {
  const { data: userPlan, error: planError } = await supabase
    .from('user_workout_plans')
    .select('workout_plan_id')
    .eq('user_id', userId)
    .limit(1)
    .single();

  if (planError || !userPlan) return { planName: '', weeks: [] };

  const { data: planMeta } = await supabase
    .from('workout_plans')
    .select('workout_name')
    .eq('id', userPlan.workout_plan_id)
    .single();

  const { data: days, error: daysError } = await supabase
    .from('workout_days')
    .select(`
      id,
      week_number,
      day_of_week,
      duration_min,
      is_rest_day,
      workout_day_exercises (
        id,
        exercise_id,
        sets,
        order_index,
        exercises (
          id,
          name,
          video_url,
          technique_tips
        )
      )
    `)
    .eq('workout_plan_id', userPlan.workout_plan_id)
    .order('week_number')
    .order('day_of_week');

  if (daysError || !days) return { planName: planMeta?.workout_name ?? '', weeks: [] };

  const allDays = days as DbWorkoutDay[];
  const todayIdx = getTodayIndex();

  const maxWeek = allDays.reduce((max, d) => Math.max(max, d.week_number), 0);
  const weeks: WorkoutDay[][] = [];
  for (let w = 1; w <= maxWeek; w++) {
    weeks.push(buildWeek(allDays, w, todayIdx));
  }

  return { planName: planMeta?.workout_name ?? '', weeks };
}

export function useWorkoutPlan() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['workoutPlan', userId],
    queryFn: () => fetchFullPlan(userId!),
    enabled: !!userId,
  });

  return {
    planName: data?.planName ?? '',
    weeks: data?.weeks ?? [],
    isLoading,
    error: error?.message ?? null,
  };
}
