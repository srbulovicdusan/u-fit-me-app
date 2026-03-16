import { createContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '@/types';

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  profile: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
      else setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

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

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
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
    <AuthContext.Provider value={{ session, profile, isLoading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
