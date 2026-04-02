-- =============================================
-- FitSa: get_user_workout_week RPC funkcija
-- =============================================
-- Vraća sve dane tekuće nedelje za korisnika sa:
--   - listom vežbi (JSONB)
--   - is_completed (sve vežbe tog dana završene)
-- Tekuća nedelja se računa iz purchased_at u user_workout_plans.
-- Pokreni u Supabase SQL editoru.

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

  -- 2. Izračunaj tekuću nedelju (1-based, kao u klijentskom kodu)
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

-- Dozvoli poziv autentikovanim korisnicima
GRANT EXECUTE ON FUNCTION public.get_user_workout_week(UUID) TO authenticated;
