import { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { VideoView } from 'expo-video';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { runOnJS, withTiming } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { useVideoPlayback } from '@/hooks/use-video-playback';
import { useVideoControls } from '@/hooks/use-video-controls';
import {
  useVideoSeeking,
  TRACK_HORIZONTAL_PADDING,
  KNOB_SIZE,
} from '@/hooks/use-video-seeking';
import { useExerciseNavigation } from '@/hooks/use-exercise-navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { queryClient } from '@/providers/query-provider';
import NextVideoCard from '@/components/workout/next-video-card';

export default function ExerciseVideoScreen() {
  const { dayId = '', exerciseIndex = '0' } = useLocalSearchParams<{
    dayId: string;
    exerciseIndex: string;
  }>();
  const insets = useSafeAreaInsets();

  const nav = useExerciseNavigation(dayId, exerciseIndex);

  const videoSource = nav.currentExercise?.videoUrl ?? '';
  const playback = useVideoPlayback(videoSource);
  const controls = useVideoControls();

  const seeking = useVideoSeeking({
    player: playback.player,
    durationSeconds: playback.durationSeconds,
    isPaused: playback.isPaused,
    onSeekStart: () => {
      controls.showControls();
    },
    onSeekEnd: () => {
      if (!playback.isPaused) controls.scheduleHideControls();
    },
    setCurrentTime: () => {},
  });

  // Sync progress bar with playback (when not seeking)
  useEffect(() => {
    const sub = playback.player.addListener('timeUpdate', ({ currentTime: ct }) => {
      if (seeking.isSeeking.current) return;
      const dur = playback.player.duration;
      if (dur > 0) {
        seeking.progressFraction.value = ct / dur;
      }
    });
    return () => sub.remove();
  }, [playback.player]);

  // Auto-hide controls on mount
  useEffect(() => {
    controls.scheduleHideControls();
  }, []);

  // Mark exercise as completed when video ends
  const { session } = useAuth();
  useEffect(() => {
    if (!playback.isEnded || !session?.user?.id || !nav.currentExercise?.workoutDayExerciseId) return;

    supabase
      .from('exercise_completions')
      .upsert({
        user_id: session.user.id,
        workout_day_exercise_id: nav.currentExercise.workoutDayExerciseId,
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['exerciseCompletions'] });
      });
  }, [playback.isEnded]);

  // When video ends on last exercise, go back
  useEffect(() => {
    if (playback.isEnded && !nav.hasNext) {
      router.back();
    }
  }, [playback.isEnded, nav.hasNext]);

  // When video ends with next available, show controls
  useEffect(() => {
    if (playback.isEnded && nav.hasNext) {
      controls.showControls();
    }
  }, [playback.isEnded, nav.hasNext]);

  const handleTapOnVideo = useCallback(() => {
    if (playback.isEnded) return;

    if (controls.controlsVisible.current) {
      // Kontrole su vidljive — sakrij ih
      controls.controlsOpacity.value = withTiming(0, { duration: 300 });
      controls.controlsVisible.current = false;
      controls.cancelHide();
    } else {
      // Kontrole su skrivene — prikaži ih
      controls.showControls();
      if (!playback.isPaused) {
        controls.scheduleHideControls();
      }
    }
  }, [playback, controls]);

  const handleTogglePlayPause = useCallback(() => {
    playback.togglePlayPause();
    if (playback.isPaused || playback.isEnded) {
      controls.scheduleHideControls();
    } else {
      controls.cancelHide();
    }
  }, [playback, controls]);

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(handleTapOnVideo)();
  });

  if (!nav.currentExercise) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />

      {/* Video */}
      <GestureDetector gesture={tapGesture}>
        <View style={StyleSheet.absoluteFill}>
          <VideoView
            player={playback.player}
            style={StyleSheet.absoluteFill}
            contentFit="contain"
            nativeControls={false}
          />
          {playback.isEnded && <BlurView intensity={70} style={StyleSheet.absoluteFill} tint="systemChromeMaterialDark"/>}
        </View>
      </GestureDetector>

      {/* Top overlay */}
      <Animated.View
        style={[
          styles.topOverlay,
          { paddingTop: insets.top + 8 },
          controls.controlsAnimatedStyle,
        ]}
        pointerEvents={controls.pointerEvents}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titleText}>{nav.workout?.name}</Text>
      </Animated.View>

      {/* Next video card */}
      {nav.nextExercise && (
        <NextVideoCard
          exerciseName={nav.nextExercise.name}
          onPress={nav.goToNext}
          visible={playback.isEnded}
        />
      )}

      {/* Bottom overlay */}
      <Animated.View
        style={[
          styles.bottomOverlay,
          { paddingBottom: Math.max(insets.bottom, 20) + 8 },
          controls.controlsAnimatedStyle,
        ]}
        pointerEvents={controls.pointerEvents}
      >

        {/* Progress bar */}
        <GestureDetector gesture={seeking.panGesture}>
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack} />
            <Animated.View style={[styles.progressFill, seeking.progressFillStyle]} />
            <Animated.View style={[styles.knob, seeking.knobStyle]} />
          </View>
        </GestureDetector>

        {/* Time labels */}
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{playback.currentTime}</Text>
          <Text style={styles.timeText}>{playback.totalTime}</Text>
        </View>

        {/* Control buttons */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            hitSlop={12}
            style={[styles.skipButton, !nav.hasPrev && styles.disabledButton]}
            onPress={nav.goToPrev}
            disabled={!nav.hasPrev}
          >
            <Ionicons name="play-skip-back" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTogglePlayPause} style={styles.playButton}>
            <Ionicons
              name={playback.isPaused || playback.isEnded ? 'play' : 'pause'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={12}
            style={[styles.skipButton, !nav.hasNext && styles.disabledButton]}
            onPress={nav.goToNext}
            disabled={!nav.hasNext}
          >
            <Ionicons name="play-skip-forward" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: TRACK_HORIZONTAL_PADDING,
    paddingTop: 40,
  },
  progressContainer: {
    height: 30,
    justifyContent: 'center',
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1.5,
  },
  progressFill: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
  knob: {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#fff',
    top: (30 - KNOB_SIZE) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
    marginTop: 16,
    marginBottom: 24,
  },
  skipButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.3,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
