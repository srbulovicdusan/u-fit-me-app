import { useRef, useCallback } from 'react';
import { Dimensions } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import type { VideoPlayer } from 'expo-video';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TRACK_HORIZONTAL_PADDING = 20;
const TRACK_WIDTH = SCREEN_WIDTH - TRACK_HORIZONTAL_PADDING * 2;
const KNOB_SIZE = 16;

export { TRACK_WIDTH, TRACK_HORIZONTAL_PADDING, KNOB_SIZE };

interface UseVideoSeekingOptions {
  player: VideoPlayer;
  durationSeconds: React.MutableRefObject<number>;
  isPaused: boolean;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  setCurrentTime: (time: string) => void;
}

function formatTime(seconds: number): string {
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function useVideoSeeking({
  player,
  durationSeconds,
  isPaused,
  onSeekStart,
  onSeekEnd,
  setCurrentTime,
}: UseVideoSeekingOptions) {
  const progressFraction = useSharedValue(0);
  const isSeeking = useRef(false);
  const seekStartFraction = useSharedValue(0);

  const handleSeekStart = useCallback(() => {
    isSeeking.current = true;
    onSeekStart?.();
  }, [onSeekStart]);

  const updateSeekTime = useCallback(
    (fraction: number) => {
      const secs = fraction * durationSeconds.current;
      setCurrentTime(formatTime(secs));
    },
    [durationSeconds, setCurrentTime]
  );

  const handleSeekEnd = useCallback(
    (fraction: number) => {
      const newTime = fraction * durationSeconds.current;
      player.currentTime = newTime;
      isSeeking.current = false;
      onSeekEnd?.();
    },
    [player, durationSeconds, onSeekEnd]
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(handleSeekStart)();
      seekStartFraction.value = progressFraction.value;
    })
    .onUpdate((event) => {
      const newFraction = Math.max(
        0,
        Math.min(
          1,
          seekStartFraction.value + event.translationX / TRACK_WIDTH
        )
      );
      progressFraction.value = newFraction;
      runOnJS(updateSeekTime)(newFraction);
    })
    .onEnd(() => {
      const fraction = progressFraction.value;
      runOnJS(handleSeekEnd)(fraction);
    });

  const progressFillStyle = useAnimatedStyle(() => ({
    width: progressFraction.value * TRACK_WIDTH,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progressFraction.value * TRACK_WIDTH - KNOB_SIZE / 2,
      },
    ],
  }));

  return {
    progressFraction,
    isSeeking,
    panGesture,
    progressFillStyle,
    knobStyle,
  };
}
