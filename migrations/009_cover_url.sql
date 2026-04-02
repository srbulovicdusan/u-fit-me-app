-- =============================================
-- FitSa: cover_url na workout_days i exercises
-- =============================================
-- Dodaje polje za cover sliku na treninge i vežbe.
-- Ažurira RPC funkcije da vraćaju cover_url.

-- ─────────────────────────────────────────────
-- 1. Dodaj kolone
-- ─────────────────────────────────────────────

ALTER TABLE public.workout_days ADD COLUMN IF NOT EXISTS cover_url TEXT;
ALTER TABLE public.exercises    ADD COLUMN IF NOT EXISTS cover_url TEXT;

-- ─────────────────────────────────────────────
-- 2. Ažuriraj get_free_workout()
--    Doda cover_url na nivo dana + coverUrl u exercises JSONB
-- ─────────────────────────────────────────────

DROP FUNCTION IF EXISTS public.get_free_workout();

CREATE OR REPLACE FUNCTION public.get_free_workout()
RETURNS TABLE (
  day_id         UUID,
  name           TEXT,
  cover_url      TEXT,
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
    wd.cover_url                   AS cover_url,
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
          'coverUrl',             e.cover_url,
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
  GROUP BY wd.id, wd.name, wd.cover_url, wd.duration_min
  LIMIT 1;
END;
$$;

-- ─────────────────────────────────────────────
-- 3. Ažuriraj get_user_workout_week()
--    Doda coverUrl u exercises JSONB
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_user_workout_week(p_user_id UUID)
RETURNS TABLE (
  day_id        UUID,
  day_of_week   INT,
  duration_min  INT,
  is_rest_day   BOOLEAN,
  is_completed  BOOLEAN,
  exercises     JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_plan_id      UUID;
  v_purchased_at TIMESTAMPTZ;
  v_week_number  INT;
BEGIN
  -- 1. Uzmi plan i datum kupovine
  SELECT workout_plan_id, purchased_at
    INTO v_plan_id, v_purchased_at
    FROM public.user_workout_plans
   WHERE user_id = p_user_id
   LIMIT 1;

  IF v_plan_id IS NULL THEN
    RETURN;
  END IF;

  -- 2. Izračunaj tekuću nedelju (1-based)
  v_week_number := FLOOR(
    EXTRACT(EPOCH FROM (now() - v_purchased_at)) / (7 * 24 * 3600)
  )::INT + 1;

  -- 3. Vrati dane sa vežbama i completion statusom
  RETURN QUERY
  SELECT
    wd.id                          AS day_id,
    wd.day_of_week                 AS day_of_week,
    wd.duration_min                AS duration_min,
    wd.is_rest_day                 AS is_rest_day,
    CASE
      WHEN COUNT(wde.id) = 0 THEN FALSE
      ELSE COUNT(wde.id) = COUNT(ec.id)
    END                            AS is_completed,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'workoutDayExerciseId', wde.id,
          'id',                   e.id,
          'name',                 e.name,
          'sets',                 wde.sets,
          'order_index',          wde.order_index,
          'videoUrl',             e.video_url,
          'coverUrl',             e.cover_url,
          'techniqueTips',        e.technique_tips,
          'done',                 (ec.id IS NOT NULL)
        ) ORDER BY wde.order_index
      ) FILTER (WHERE wde.id IS NOT NULL),
      '[]'::jsonb
    )                              AS exercises
  FROM public.workout_days wd
  LEFT JOIN public.workout_day_exercises wde ON wde.workout_day_id = wd.id
  LEFT JOIN public.exercises e               ON e.id = wde.exercise_id
  LEFT JOIN public.exercise_completions ec
         ON ec.workout_day_exercise_id = wde.id
        AND ec.user_id = p_user_id
  WHERE wd.workout_plan_id = v_plan_id
    AND wd.week_number     = v_week_number
  GROUP BY wd.id, wd.day_of_week, wd.duration_min, wd.is_rest_day
  ORDER BY wd.day_of_week;
END;
$$;

-- ─────────────────────────────────────────────
-- 4. Grants (ostaju isti)
-- ─────────────────────────────────────────────

GRANT EXECUTE ON FUNCTION public.get_free_workout()              TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_workout_week(UUID)     TO authenticated;
