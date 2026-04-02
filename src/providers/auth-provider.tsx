import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { configureRevenueCat, loginRevenueCat, logoutRevenueCat } from '@/lib/revenue-cat';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '@/types';

type OAuthProvider = 'google' | 'apple' | 'facebook';

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: OAuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  profile: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signInWithOAuth: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
});

function extractSessionParams(url: string) {
  const parsed = new URL(url);

  // Hash fragment (implicit flow)
  const hashParams = new URLSearchParams(parsed.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token');
  if (accessToken && refreshToken) {
    return { type: 'tokens' as const, accessToken, refreshToken };
  }

  // Query params (PKCE flow)
  const code = parsed.searchParams.get('code');
  if (code) {
    return { type: 'code' as const, code };
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    configureRevenueCat();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loginRevenueCat(session.user.id);
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        loginRevenueCat(session.user.id);
        fetchProfile(session.user.id);
      } else {
        logoutRevenueCat();
        setProfile(null);
        setIsLoading(false);
      }
    });

    // Slušaj deep link-ove za OAuth callback
    const linkingSub = Linking.addEventListener('url', async ({ url }) => {
      const params = extractSessionParams(url);
      if (!params) return;

      if (params.type === 'tokens') {
        await supabase.auth.setSession({
          access_token: params.accessToken,
          refresh_token: params.refreshToken,
        });
      } else {
        await supabase.auth.exchangeCodeForSession(params.code);
      }

      // Proveri da li postoji pending purchase intent
      const pendingPurchase = await AsyncStorage.getItem('fitsa_pending_purchase');
      if (pendingPurchase === 'true') {
        router.replace('/(free)/packages');
      } else {
        router.replace('/');
      }
    });

    return () => {
      subscription.unsubscribe();
      linkingSub.remove();
    };
  }, []);

  async function fetchProfile(userId: string) {
    let { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Fallback: ako profil ne postoji (trigger propustio), kreiraj ga
    if (!data) {
      const { data: userData } = await supabase.auth.getUser();
      const meta = userData?.user?.user_metadata ?? {};

      const { data: newProfile } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          full_name: meta.full_name ?? meta.name ?? '',
          avatar_url: meta.avatar_url ?? meta.picture ?? '',
        })
        .select()
        .single();

      data = newProfile;
    }

    if (data) {
      setProfile({
        id: data.id,
        fullName: data.full_name ?? '',
        avatarUrl: data.avatar_url,
        fitnessLevel: data.fitness_level ?? 'pocetnica',
        workoutFrequency: data.workout_frequency ?? 3,
        goals: data.goals ?? [],
        isOnboarded: data.is_onboarded ?? false,
        createdAt: data.created_at,
      });
    }
    setIsLoading(false);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async function signInWithOAuth(provider: OAuthProvider) {
    // Native Apple Sign In na iOS — bolji UX od web flow-a
    if (provider === 'apple' && Platform.OS === 'ios') {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('Apple Sign In: nema identity tokena');
      }

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) throw error;
      return;
    }

    // Ostali provideri (Google, Facebook) — web OAuth flow
    const redirectUrl = 'fitsa://auth/callback';

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;

    if (data.url) {
      await Linking.openURL(data.url);
    }
  }

  async function signOut() {
    await logoutRevenueCat();
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    router.replace('/');
  }

  async function updateProfile(data: Partial<Profile>) {
    if (!session?.user) return;

    const updates: Record<string, unknown> = {};
    if (data.fullName !== undefined) updates.full_name = data.fullName;
    if (data.avatarUrl !== undefined) updates.avatar_url = data.avatarUrl;
    if (data.fitnessLevel !== undefined) updates.fitness_level = data.fitnessLevel;
    if (data.workoutFrequency !== undefined) updates.workout_frequency = data.workoutFrequency;
    if (data.goals !== undefined) updates.goals = data.goals;
    if (data.isOnboarded !== undefined) updates.is_onboarded = data.isOnboarded;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id);

    if (error) throw error;

    setProfile(prev => prev ? { ...prev, ...data } : null);
  }

  return (
    <AuthContext.Provider value={{ session, profile, isLoading, signIn, signUp, signInWithOAuth, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
