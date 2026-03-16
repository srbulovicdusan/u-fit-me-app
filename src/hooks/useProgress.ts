import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import type { ProgressEntry, Measurement } from '@/types';

const DEFAULT_MEASUREMENTS: Measurement[] = [
  { label: 'Težina', value: '72.5 kg', change: '-2.3', good: true },
  { label: 'Obim struka', value: '78 cm', change: '-4', good: true },
  { label: 'Obim kukova', value: '101 cm', change: '-2', good: true },
];

export function useProgress() {
  const { session } = useAuth();
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [measurements] = useState<Measurement[]>(DEFAULT_MEASUREMENTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) fetchEntries();
  }, [session?.user]);

  async function fetchEntries() {
    if (!session?.user) return;
    setIsLoading(true);

    const { data } = await supabase
      .from('progress_entries')
      .select('*')
      .eq('user_id', session.user.id)
      .order('recorded_at', { ascending: false });

    if (data) {
      setEntries(data.map(d => ({
        id: d.id,
        userId: d.user_id,
        weight: d.weight,
        waistCm: d.waist_cm,
        hipsCm: d.hips_cm,
        photoUrl: d.photo_url,
        recordedAt: d.recorded_at,
      })));
    }
    setIsLoading(false);
  }

  const addEntry = useCallback(async (data: Omit<ProgressEntry, 'id' | 'userId' | 'recordedAt'>) => {
    if (!session?.user) return;

    await supabase.from('progress_entries').insert({
      user_id: session.user.id,
      weight: data.weight,
      waist_cm: data.waistCm,
      hips_cm: data.hipsCm,
      photo_url: data.photoUrl,
    });

    fetchEntries();
  }, [session?.user]);

  return { entries, measurements, isLoading, addEntry };
}
