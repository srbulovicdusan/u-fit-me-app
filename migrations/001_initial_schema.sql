-- =============================================
-- FitSa Database Schema
-- =============================================
-- Pokreni ovo u Supabase SQL editoru ili kao migraciju.
-- Redosled je bitan jer postoje foreign key reference.

-- ─────────────────────────────────────────────
-- 1. PROFILES
-- ─────────────────────────────────────────────
-- Extend-uje Supabase auth.users sa app-specifičnim podacima.
-- Kreira se automatski kad se user registruje (trigger ispod).

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  fitness_level TEXT CHECK (fitness_level IN ('pocetnica', 'povremeno', 'redovno')),
  workout_frequency INT CHECK (workout_frequency BETWEEN 2 AND 5),
  goals TEXT[] DEFAULT '{}',
  is_onboarded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Korisnički profil — extend auth.users sa fitness podacima';

-- ─────────────────────────────────────────────
-- 2. SUBSCRIPTIONS
-- ─────────────────────────────────────────────
-- Sinhronizovano sa RevenueCat webhook-om.
-- App čita status iz RevenueCat SDK-a, ova tabela je backup/audit.

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  package_type TEXT NOT NULL CHECK (package_type IN ('starter', 'transform', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  revenue_cat_id TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.subscriptions IS 'Pretplate — sync sa RevenueCat webhookom';

-- ─────────────────────────────────────────────
-- 3. WORKOUT PLANS
-- ─────────────────────────────────────────────
-- Globalni planovi treninga (bez user_id). Korisnici se povezuju preko user_workout_plans.

CREATE TABLE public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_name TEXT NOT NULL,
  description TEXT,
  price_din INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.workout_plans IS 'Plan treninga — globalni, dodeljen korisnicima preko user_workout_plans';

-- ─────────────────────────────────────────────
-- 3b. USER WORKOUT PLANS (many-to-many)
-- ─────────────────────────────────────────────
-- Povezuje korisnike sa planovima koje su kupili.

CREATE TABLE public.user_workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  workout_plan_id UUID REFERENCES public.workout_plans(id) ON DELETE CASCADE NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, workout_plan_id)
);

COMMENT ON TABLE public.user_workout_plans IS 'Veza korisnik ↔ plan treninga (kupovina)';

-- ─────────────────────────────────────────────
-- 4. WORKOUT DAYS
-- ─────────────────────────────────────────────
-- Dani unutar plana. Svaki dan pripada jednoj nedelji i danu u nedelji.

CREATE TABLE public.workout_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_plan_id UUID REFERENCES public.workout_plans(id) ON DELETE CASCADE NOT NULL,
  week_number INT NOT NULL DEFAULT 1,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=PON, 6=NED
  duration_min INT,
  is_rest_day BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.workout_days IS 'Dani treninga unutar plana — nedelja + dan';

CREATE INDEX idx_workout_days_plan ON public.workout_days(workout_plan_id);

-- ─────────────────────────────────────────────
-- 5. EXERCISES (statička tabela vežbi)
-- ─────────────────────────────────────────────
-- Svaka vežba postoji jednom. Dani referenciraju vežbe preko workout_day_exercises.

CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  video_url TEXT,                 -- Supabase Storage URL
  technique_tips TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.exercises IS 'Statička tabela vežbi sa video URL-om i savetima';

-- ─────────────────────────────────────────────
-- 5b. WORKOUT DAY EXERCISES (many-to-many)
-- ─────────────────────────────────────────────
-- Povezuje vežbe sa danima treninga. Setovi i redosled su specifični za dan.

CREATE TABLE public.workout_day_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_day_id UUID REFERENCES public.workout_days(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  sets TEXT NOT NULL,             -- "3×12", "3×30s"
  order_index INT NOT NULL DEFAULT 0
);

COMMENT ON TABLE public.workout_day_exercises IS 'Vežbe u danu treninga — setovi i redosled specifični za dan';

CREATE INDEX idx_wde_day ON public.workout_day_exercises(workout_day_id);
CREATE INDEX idx_wde_exercise ON public.workout_day_exercises(exercise_id);

-- ─────────────────────────────────────────────
-- 6. WORKOUT COMPLETIONS
-- ─────────────────────────────────────────────
-- Svaki put kad korisnik završi trening — tracking + rating.

CREATE TABLE public.workout_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  workout_day_id UUID REFERENCES public.workout_days(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  duration_min INT,
  rating INT CHECK (rating BETWEEN 1 AND 5) -- emoji rating
);

COMMENT ON TABLE public.workout_completions IS 'Evidencija završenih treninga sa ocenom i trajanjem';

CREATE INDEX idx_completions_user ON public.workout_completions(user_id, completed_at DESC);

-- ─────────────────────────────────────────────
-- 6b. EXERCISE COMPLETIONS
-- ─────────────────────────────────────────────
-- Da li je user odradio konkretnu vežbu u danu.

CREATE TABLE public.exercise_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  workout_day_exercise_id UUID REFERENCES public.workout_day_exercises(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, workout_day_exercise_id)
);

COMMENT ON TABLE public.exercise_completions IS 'Praćenje odrađenih vežbi po korisniku';

CREATE INDEX idx_exercise_completions_user ON public.exercise_completions(user_id);

-- ─────────────────────────────────────────────
-- 7. PROGRESS ENTRIES
-- ─────────────────────────────────────────────
-- Praćenje merenja i foto dnevnik.

CREATE TABLE public.progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  weight DECIMAL(5,1),           -- kg, npr 72.5
  waist_cm DECIMAL(5,1),
  hips_cm DECIMAL(5,1),
  photo_url TEXT,                -- Supabase Storage URL
  notes TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.progress_entries IS 'Merenja korisnika — težina, obimi, foto dnevnik';

CREATE INDEX idx_progress_user ON public.progress_entries(user_id, recorded_at DESC);

-- ─────────────────────────────────────────────
-- 8. CHAT MESSAGES
-- ─────────────────────────────────────────────
-- Realtime chat između korisnika i trenera.
-- Supabase Realtime sluša INSERT events na ovoj tabeli.

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'trainer')),
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,           -- null = nepročitano
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.chat_messages IS 'Chat poruke — Realtime sa trenerom';

CREATE INDEX idx_chat_user ON public.chat_messages(user_id, created_at DESC);


-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
-- Svaki korisnik vidi/menja SAMO svoje podatke.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_day_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- SUBSCRIPTIONS (read-only za usera, write via webhook)
CREATE POLICY "Users can read own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- WORKOUT PLANS (svi ulogovani korisnici mogu da čitaju planove)
CREATE POLICY "Authenticated users can read workout plans"
  ON public.workout_plans FOR SELECT
  USING (auth.role() = 'authenticated');

-- USER WORKOUT PLANS
CREATE POLICY "Users can read own plan assignments"
  ON public.user_workout_plans FOR SELECT
  USING (auth.uid() = user_id);

-- WORKOUT DAYS
CREATE POLICY "Users can read days from own plans"
  ON public.workout_days FOR SELECT
  USING (
    workout_plan_id IN (
      SELECT workout_plan_id FROM public.user_workout_plans WHERE user_id = auth.uid()
    )
  );

-- EXERCISES (statička tabela, svi authenticated čitaju)
CREATE POLICY "Authenticated users can read exercises"
  ON public.exercises FOR SELECT
  USING (auth.role() = 'authenticated');

-- WORKOUT DAY EXERCISES
CREATE POLICY "Users can read workout day exercises from own plans"
  ON public.workout_day_exercises FOR SELECT
  USING (
    workout_day_id IN (
      SELECT id FROM public.workout_days WHERE workout_plan_id IN (
        SELECT workout_plan_id FROM public.user_workout_plans WHERE user_id = auth.uid()
      )
    )
  );

-- EXERCISE COMPLETIONS
CREATE POLICY "Users can read own exercise completions"
  ON public.exercise_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise completions"
  ON public.exercise_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise completions"
  ON public.exercise_completions FOR DELETE
  USING (auth.uid() = user_id);

-- WORKOUT COMPLETIONS
CREATE POLICY "Users can read own completions"
  ON public.workout_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions"
  ON public.workout_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- PROGRESS ENTRIES
CREATE POLICY "Users can read own progress"
  ON public.progress_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.progress_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.progress_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON public.progress_entries FOR DELETE
  USING (auth.uid() = user_id);

-- CHAT MESSAGES
CREATE POLICY "Users can read own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can send messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id AND sender = 'user');


-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-kreiraj profil kad se user registruje
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at na profiles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- =============================================
-- REALTIME
-- =============================================
-- Uključi Realtime za chat tabelu (za live poruke)

ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
