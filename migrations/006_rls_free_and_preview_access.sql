-- =============================================
-- FitSa: RLS policy-ji za free trening i program preview
-- =============================================
-- Problem: workout_days i workout_day_exercises imaju policy koji
-- zahteva da korisnik poseduje plan (user_workout_plans).
-- Free korisnici ne poseduju nijedan plan pa ne mogu da čitaju ove tabele.
--
-- Rešenje: Dodajemo policy-je koji dozvoljavaju čitanje:
--   1. is_free = true dana (besplatan trening)
--   2. week_number = 1 dana (program preview — zaključan, ali metapodaci su vidljivi)

-- ─────────────────────────────────────────────
-- workout_days
-- ─────────────────────────────────────────────

CREATE POLICY "Authenticated users can read free and preview days"
  ON public.workout_days FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND (is_free = true OR week_number = 1)
  );

-- ─────────────────────────────────────────────
-- workout_day_exercises
-- Potrebno da get_free_workout() može da joinuje vežbe.
-- ─────────────────────────────────────────────

CREATE POLICY "Authenticated users can read exercises from free and preview days"
  ON public.workout_day_exercises FOR SELECT
  USING (
    workout_day_id IN (
      SELECT id FROM public.workout_days
      WHERE is_free = true OR week_number = 1
    )
  );
