import { useState, useMemo, useCallback } from 'react';
import type { Exercise } from '@/types';

export function useWorkout(exercises: Exercise[]) {
  const [checked, setChecked] = useState(() => exercises.map(e => e.done));

  const doneCount = useMemo(() => checked.filter(Boolean).length, [checked]);
  const progress = exercises.length > 0 ? doneCount / exercises.length : 0;
  const allDone = doneCount === exercises.length && exercises.length > 0;

  const toggleExercise = useCallback((index: number) => {
    setChecked(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setChecked(exercises.map(() => false));
  }, [exercises]);

  return { checked, doneCount, progress, allDone, toggleExercise, reset };
}
