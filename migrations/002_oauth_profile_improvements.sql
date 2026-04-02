-- =============================================
-- 002: OAuth Profile Improvements
-- =============================================
-- Unapređuje handle_new_user trigger da izvlači ime i avatar
-- iz Facebook i Apple metadata. Dodaje INSERT policy za fallback.

-- Ažuriraj trigger funkciju za Facebook/Apple metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
      -- Apple šalje ime odvojeno
      NULLIF(CONCAT_WS(' ',
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
      ), ''),
      -- Facebook koristi 'name'
      NULLIF(NEW.raw_user_meta_data->>'name', ''),
      ''
    ),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'avatar_url', ''),
      -- Facebook slika
      NULLIF(NEW.raw_user_meta_data->>'picture', ''),
      ''
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- INSERT policy za profiles — fallback kad trigger ne kreira profil
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
