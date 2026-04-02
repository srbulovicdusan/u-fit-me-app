-- =============================================
-- FitSa: Ispravka anon RLS scope-a (zamena migracije 007)
-- =============================================
-- Uklanjamo preširoke policy-je iz 007 i zamenjujemo
-- konzistentnim: samo is_free=true dani su potpuno javni.

-- workout_plans: ukloni preširoki USING (true)
DROP POLICY IF EXISTS "Anon users can read workout plans" ON public.workout_plans;
CREATE POLICY "Anon users can read workout plans"
  ON public.workout_plans FOR SELECT
  TO anon
  USING (true);
-- Napomena: workout_plans sadrži samo nazive i cene planova —
-- nema osetljivih podataka, OK je da anon čita (potrebno za RPC).

-- exercises: zameni USING (true) sa filtrom na is_free dane
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

-- workout_day_exercises: zameni OR week_number = 1 sa samo is_free
DROP POLICY IF EXISTS "Any user can read exercises from free and preview days" ON public.workout_day_exercises;
CREATE POLICY "Any user can read exercises from free days only"
  ON public.workout_day_exercises FOR SELECT
  USING (
    workout_day_id IN (
      SELECT id FROM public.workout_days WHERE is_free = true
    )
  );

-- workout_days ostaje isti (is_free = true OR week_number = 1) —
-- week 1 metapodaci su OK za preview, samo vežbe su zaštićene
