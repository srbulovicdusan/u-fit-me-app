import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface PreviewDay {
  dayId: string;
  name: string;
  coverUrl?: string;
  dayOfWeek: number;
  durationMin: number;
  exerciseCount: number;
}

interface RpcRow {
  day_id: string;
  name: string;
  cover_url: string | null;
  day_of_week: number;
  duration_min: number | null;
  exercise_count: number;
}

async function fetchProgramPreview(): Promise<PreviewDay[]> {
  const { data, error } = await supabase.rpc('get_program_preview');
  if (error || !data) return [];

  return (data as RpcRow[]).map((row) => ({
    dayId: row.day_id,
    name: row.name,
    coverUrl: row.cover_url ?? undefined,
    dayOfWeek: row.day_of_week,
    durationMin: row.duration_min ?? 0,
    exerciseCount: row.exercise_count,
  }));
}

export function useWorkoutWeek() {
  const { data: days = [], isLoading, error } = useQuery({
    queryKey: ['workoutWeekPreview'],
    queryFn: fetchProgramPreview,
    staleTime: 1000 * 60 * 60,
  });

  return { days, isLoading, error: error?.message ?? null };
}
