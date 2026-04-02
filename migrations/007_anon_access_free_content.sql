-- =============================================
-- FitSa: Anon pristup besplatnom sadržaju
-- =============================================
-- Princip: samo is_free=true dani su potpuno javni (vežbe, video URL-ovi).
-- Week 1 je dostupan SAMO kao metapodaci kroz get_program_preview() RPC —
-- direktan SELECT na workout_day_exercises za week 1 nije dozvoljen anon-u.

-- workout_plans: anon može da čita nazive planova (potrebno za get_program_preview RPC)
CREATE POLICY "Anon users can read workout plans"
  ON public.workout_plans FOR SELECT
  USING (true);

-- workout_days: anon vidi is_free dane I week 1 metapodatke (id, name, duration, day_of_week)
-- week 1 je potreban get_program_preview RPC-u koji joinuje ovu tabelu
DROP POLICY IF EXISTS "Authenticated users can read free and preview days" ON public.workout_days;
CREATE POLICY "Any user can read free and preview days"
  ON public.workout_days FOR SELECT
  USING (is_free = true OR week_number = 1);

-- workout_day_exercises: anon vidi SAMO vežbe is_free dana — ne i week 1
-- week 1 exercises ostaju zaštićeni; get_program_preview ne vraća vežbe, samo count
DROP POLICY IF EXISTS "Authenticated users can read exercises from free and preview days" ON public.workout_day_exercises;
CREATE POLICY "Any user can read exercises from free days only"
  ON public.workout_day_exercises FOR SELECT
  USING (
    workout_day_id IN (
      SELECT id FROM public.workout_days WHERE is_free = true
    )
  );

-- exercises: anon vidi samo vežbe koje su vezane za is_free dane
-- (RLS na workout_day_exercises već filtrira, ali exercises tabela treba sopstveni policy)
DROP POLICY IF EXISTS "Anon users can read exercises" ON public.exercises;
CREATE POLICY "Any user can read exercises from free days"
  ON public.exercises FOR SELECT
  USING (
    id IN (
      SELECT wde.exercise_id
      FROM public.workout_day_exercises wde
      JOIN public.workout_days wd ON wd.id = wde.workout_day_id
      WHERE wd.is_free = true
    )
  );

-- RPC funkcije: dozvoli poziv i za anon
GRANT EXECUTE ON FUNCTION public.get_free_workout()    TO anon;
GRANT EXECUTE ON FUNCTION public.get_program_preview() TO anon;
