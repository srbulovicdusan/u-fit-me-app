import { useRef, useEffect, useCallback, useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export function useVideoControls() {
  const controlsOpacity = useSharedValue(1);
  const controlsVisible = useRef(true);
  const [interactive, setInteractive] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const scheduleHideControls = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      controlsOpacity.value = withTiming(0, { duration: 300 });
      controlsVisible.current = false;
      setInteractive(false);
    }, 1500);
  }, []);

  const showControls = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    controlsOpacity.value = withTiming(1, { duration: 250 });
    controlsVisible.current = true;
    setInteractive(true);
  }, []);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const pointerEvents = interactive ? 'box-none' as const : 'none' as const;

  return {
    controlsOpacity,
    controlsVisible,
    controlsAnimatedStyle,
    pointerEvents,
    scheduleHideControls,
    showControls,
    cancelHide,
  };
}
