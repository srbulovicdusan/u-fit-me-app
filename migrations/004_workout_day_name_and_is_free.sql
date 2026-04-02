-- =============================================
-- FitSa: workout_days — name + is_free polja
-- =============================================

ALTER TABLE public.workout_days ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.workout_days ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_workout_days_is_free ON public.workout_days(is_free) WHERE is_free = true;

-- ─────────────────────────────────────────────
-- RPC 1: get_free_workout()
-- Vraća besplatan trening (is_free=true) sa vežbama.
-- SECURITY DEFINER bypasuje RLS — free korisnici ne poseduju plan.
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_free_workout()
RETURNS TABLE (
  day_id         UUID,
  name           TEXT,
  duration_min   INT,
  exercise_count INT,
  exercises      JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    wd.id                          AS day_id,
    COALESCE(wd.name, 'Trening')   AS name,
    wd.duration_min                AS duration_min,
    COUNT(wde.id)::INT             AS exercise_count,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'workoutDayExerciseId', wde.id,
          'id',                   e.id,
          'name',                 e.name,
          'sets',                 wde.sets,
          'order_index',          wde.order_index,
          'videoUrl',             e.video_url,
          'techniqueTips',        e.technique_tips,
          'done',                 false
        ) ORDER BY wde.order_index
      ) FILTER (WHERE wde.id IS NOT NULL),
      '[]'::jsonb
    )                              AS exercises
  FROM public.workout_days wd
  LEFT JOIN public.workout_day_exercises wde ON wde.workout_day_id = wd.id
  LEFT JOIN public.exercises e               ON e.id = wde.exercise_id
  WHERE wd.is_free = true
  GROUP BY wd.id, wd.name, wd.duration_min
  LIMIT 1;
END;
$$;

-- ─────────────────────────────────────────────
-- RPC 2: get_program_preview()
-- Vraća non-rest treninge iz prve nedelje prvog plana.
-- Koristi se za "Šta dobijas u programu" sekciju (zaključano preview).
-- SECURITY DEFINER bypasuje RLS — free korisnici ne poseduju plan.
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_program_preview()
RETURNS TABLE (
  day_id         UUID,
  name           TEXT,
  day_of_week    INT,
  duration_min   INT,
  exercise_count INT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_plan_id UUID;
BEGIN
  -- Uzmi prvi plan po datumu kreiranja
  SELECT id INTO v_plan_id
    FROM public.workout_plans
   ORDER BY created_at
   LIMIT 1;

  IF v_plan_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    wd.id                        AS day_id,
    COALESCE(wd.name, 'Trening') AS name,
    wd.day_of_week               AS day_of_week,
    wd.duration_min              AS duration_min,
    COUNT(wde.id)::INT           AS exercise_count
  FROM public.workout_days wd
  LEFT JOIN public.workout_day_exercises wde ON wde.workout_day_id = wd.id
  WHERE wd.workout_plan_id = v_plan_id
    AND wd.week_number     = 1
    AND wd.is_rest_day     = false
  GROUP BY wd.id, wd.name, wd.day_of_week, wd.duration_min
  ORDER BY wd.day_of_week;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_free_workout()     TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_program_preview()  TO authenticated;
