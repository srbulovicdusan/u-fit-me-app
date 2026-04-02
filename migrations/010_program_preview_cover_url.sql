-- =============================================
-- FitSa: get_program_preview — dodaje cover_url
-- =============================================
-- Ažurira RPC da vraća cover_url za svaki dan
-- (koristi se u ProgramCarousel komponenti).

DROP FUNCTION IF EXISTS public.get_program_preview();

CREATE OR REPLACE FUNCTION public.get_program_preview()
RETURNS TABLE (
  day_id         UUID,
  name           TEXT,
  cover_url      TEXT,
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
    wd.cover_url                 AS cover_url,
    wd.day_of_week               AS day_of_week,
    wd.duration_min              AS duration_min,
    COUNT(wde.id)::INT           AS exercise_count
  FROM public.workout_days wd
  LEFT JOIN public.workout_day_exercises wde ON wde.workout_day_id = wd.id
  WHERE wd.workout_plan_id = v_plan_id
    AND wd.week_number     = 1
    AND wd.is_rest_day     = false
  GROUP BY wd.id, wd.name, wd.cover_url, wd.day_of_week, wd.duration_min
  ORDER BY wd.day_of_week;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_program_preview() TO authenticated;
