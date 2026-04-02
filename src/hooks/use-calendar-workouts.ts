import { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import type { CalendarDayInfo } from '@/types';

const MONTH_NAMES = [
  'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
  'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar',
];

const DAY_NAMES_FULL = [
  'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja',
];

const DAY_HEADERS = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];

/** Convert JS Date.getDay() (0=Sun) to Monday-start index (0=Mon, 6=Sun) */
function toMondayIndex(jsDay: number): number {
  return jsDay === 0 ? 6 : jsDay - 1;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function diffDays(a: Date, b: Date): number {
  const msPerDay = 86400000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcA - utcB) / msPerDay);
}

/** Generate a calendar grid (weeks starting Monday) for a given year/month */
function getMonthGrid(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = toMondayIndex(firstDay.getDay());

  // Start from the Monday before (or on) the 1st
  const gridStart = new Date(year, month, 1 - firstDayOfWeek);

  const weeks: Date[][] = [];
  let current = new Date(gridStart);

  // Generate 6 weeks max (covers all months)
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    // Stop if this entire week is in the next month
    if (w >= 4 && week[0].getMonth() !== month) break;
    weeks.push(week);
  }

  return weeks;
}

// ── Supabase types ──

interface DbWorkoutDay {
  id: string;
  week_number: number;
  day_of_week: number;
  duration_min: number | null;
  workout_day_exercises: { id: string }[];
}

interface DbExerciseCompletion {
  workout_day_exercise_id: string;
}

interface PlanData {
  purchasedAt: Date;
  planId: string;
  planName: string;
  workoutDays: DbWorkoutDay[];
}

async function fetchPlanData(userId: string): Promise<PlanData | null> {
  // 1. Get user's plan with purchased_at
  const { data: userPlan, error: planError } = await supabase
    .from('user_workout_plans')
    .select('workout_plan_id, purchased_at')
    .eq('user_id', userId)
    .limit(1)
    .single();

  if (planError || !userPlan) return null;

  // 2. Get plan name
  const { data: plan } = await supabase
    .from('workout_plans')
    .select('workout_name')
    .eq('id', userPlan.workout_plan_id)
    .single();

  // 3. Get ALL workout days (all weeks) with exercise IDs for counting
  const { data: days, error: daysError } = await supabase
    .from('workout_days')
    .select(`
      id,
      week_number,
      day_of_week,
      duration_min,
      workout_day_exercises ( id )
    `)
    .eq('workout_plan_id', userPlan.workout_plan_id)
    .order('week_number')
    .order('day_of_week');

  if (daysError) throw daysError;

  return {
    purchasedAt: new Date(userPlan.purchased_at),
    planId: userPlan.workout_plan_id,
    planName: plan?.workout_name ?? 'Trening',
    workoutDays: (days ?? []) as DbWorkoutDay[],
  };
}

async function fetchCompletions(userId: string, wdeIds: string[]): Promise<Set<string>> {
  if (wdeIds.length === 0) return new Set();

  const { data } = await supabase
    .from('exercise_completions')
    .select('workout_day_exercise_id')
    .eq('user_id', userId)
    .in('workout_day_exercise_id', wdeIds);

  return new Set((data ?? []).map((d: DbExerciseCompletion) => d.workout_day_exercise_id));
}

export function useCalendarWorkouts() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // ── Fetch plan data ──
  const queryClient = useQueryClient();
  const { data: planData, isLoading: planLoading } = useQuery({
    queryKey: ['calendarPlanData', userId],
    queryFn: () => fetchPlanData(userId!),
    enabled: !!userId,
  });

  // Refetch on screen focus
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['calendarPlanData', userId] });
        queryClient.invalidateQueries({ queryKey: ['calendarCompletions', userId] });
      }
    }, [userId, queryClient]),
  );

  // ── Build map of (weekNumber, dayOfWeek) → workout day ──
  const workoutDayMap = useMemo(() => {
    if (!planData) return new Map<string, DbWorkoutDay>();
    const map = new Map<string, DbWorkoutDay>();
    for (const day of planData.workoutDays) {
      map.set(`${day.week_number}-${day.day_of_week}`, day);
    }
    return map;
  }, [planData]);

  // ── Generate calendar grid ──
  const calendarWeeks = useMemo(
    () => getMonthGrid(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month],
  );

  // ── Collect all workout_day_exercise IDs visible in this month's grid ──
  const visibleWdeIds = useMemo(() => {
    if (!planData) return [] as string[];
    const ids: string[] = [];
    for (const week of calendarWeeks) {
      for (const date of week) {
        const daysSince = diffDays(date, planData.purchasedAt);
        if (daysSince < 0) continue;
        const weekNum = Math.floor(daysSince / 7) + 1;
        const dow = toMondayIndex(date.getDay());
        const wDay = workoutDayMap.get(`${weekNum}-${dow}`);
        if (wDay) {
          for (const wde of wDay.workout_day_exercises) {
            ids.push(wde.id);
          }
        }
      }
    }
    return ids;
  }, [calendarWeeks, planData, workoutDayMap]);

  // ── Fetch exercise completions ──
  const { data: completedWdeIds = new Set<string>(), isLoading: completionsLoading } = useQuery({
    queryKey: ['calendarCompletions', userId, visibleWdeIds],
    queryFn: () => fetchCompletions(userId!, visibleWdeIds),
    enabled: !!userId && visibleWdeIds.length > 0,
  });

  // ── Build CalendarDayInfo grid ──
  const calendarDays = useMemo((): CalendarDayInfo[][] => {
    return calendarWeeks.map((week) =>
      week.map((date): CalendarDayInfo => {
        const isCurrentMonth = date.getMonth() === currentMonth.month;
        const isToday = isSameDay(date, today);
        const isSelected = isSameDay(date, selectedDate);

        // Default: no plan
        let workoutDayId: string | null = null;
        let isRestDay = false;
        let isWorkoutDay = false;
        let isCompleted = false;
        let durationMin: number | null = null;
        let exerciseCount = 0;
        let workoutName: string | null = null;

        if (planData) {
          const daysSince = diffDays(date, planData.purchasedAt);
          if (daysSince >= 0) {
            const weekNum = Math.floor(daysSince / 7) + 1;
            const dow = toMondayIndex(date.getDay());
            const wDay = workoutDayMap.get(`${weekNum}-${dow}`);

            if (wDay && wDay.workout_day_exercises.length > 0) {
              workoutDayId = wDay.id;
              isWorkoutDay = true;
              durationMin = wDay.duration_min;
              exerciseCount = wDay.workout_day_exercises.length;
              workoutName = planData.planName;

              // Check completion: all exercises done
              isCompleted = wDay.workout_day_exercises.every(
                (wde) => completedWdeIds.has(wde.id),
              );
            } else {
              // No workout or no exercises → rest day
              isRestDay = true;
              workoutName = 'Dan odmora';
            }
          }
        }

        return {
          date,
          dayOfMonth: date.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          workoutDayId,
          isRestDay,
          isWorkoutDay,
          isCompleted,
          durationMin,
          exerciseCount,
          workoutName,
        };
      }),
    );
  }, [calendarWeeks, currentMonth.month, today, selectedDate, planData, workoutDayMap, completedWdeIds]);

  // ── Find which week row contains the selected date ──
  const currentWeekIndex = useMemo(() => {
    for (let i = 0; i < calendarDays.length; i++) {
      if (calendarDays[i].some((d) => isSameDay(d.date, selectedDate))) {
        return i;
      }
    }
    return 0;
  }, [calendarDays, selectedDate]);

  // ── Selected day info ──
  const selectedDayInfo = useMemo(() => {
    for (const week of calendarDays) {
      for (const day of week) {
        if (isSameDay(day.date, selectedDate)) return day;
      }
    }
    return null;
  }, [calendarDays, selectedDate]);

  // ── Month navigation ──
  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const m = prev.month === 0 ? 11 : prev.month - 1;
      const y = prev.month === 0 ? prev.year - 1 : prev.year;
      return { year: y, month: m };
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const m = prev.month === 11 ? 0 : prev.month + 1;
      const y = prev.month === 11 ? prev.year + 1 : prev.year;
      return { year: y, month: m };
    });
  }, []);

  const monthLabel = `${MONTH_NAMES[currentMonth.month]}`;

  return {
    monthLabel,
    calendarWeeks: calendarDays,
    currentWeekIndex,
    selectedDate,
    setSelectedDate,
    selectedDayInfo,
    goToPrevMonth,
    goToNextMonth,
    isLoading: planLoading || completionsLoading,
    dayHeaders: DAY_HEADERS,
    dayNamesFull: DAY_NAMES_FULL,
  };
}
