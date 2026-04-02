import { useRef, useState, useEffect, useCallback } from 'react';
import { useVideoPlayer } from 'expo-video';
import type { VideoSource } from 'expo-video';

function formatTime(seconds: number): string {
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function useVideoPlayback(source: VideoSource) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalTime, setTotalTime] = useState('0:00');
  const [isEnded, setIsEnded] = useState(false);

  const durationSeconds = useRef(0);
  const currentSeconds = useRef(0);

  const player = useVideoPlayer(source, (p) => {
    p.loop = false;
    p.timeUpdateEventInterval = 0.25;
    p.play();
  });

  useEffect(() => {
    const timeSub = player.addListener('timeUpdate', ({ currentTime: ct }) => {
      currentSeconds.current = ct;
      const dur = player.duration;
      durationSeconds.current = dur;

      setCurrentTime(formatTime(ct));
      setTotalTime(formatTime(dur));

      // Detect end of video
      if (dur > 0 && ct >= dur - 0.3 && !player.playing) {
        setIsEnded(true);
      }
    });

    const statusSub = player.addListener('statusChange', (payload) => {
      if (payload.status === 'readyToPlay') {
        durationSeconds.current = player.duration;
        setTotalTime(formatTime(player.duration));
      }
    });

    const playingSub = player.addListener('playingChange', ({ isPlaying }) => {
      setIsPaused(!isPlaying);

      // Detect end: not playing and near the end
      const dur = durationSeconds.current;
      const ct = currentSeconds.current;
      if (!isPlaying && dur > 0 && ct >= dur - 0.3) {
        setIsEnded(true);
      }
    });

    return () => {
      timeSub.remove();
      statusSub.remove();
      playingSub.remove();
    };
  }, [player]);

  const play = useCallback(() => {
    setIsEnded(false);
    player.play();
    setIsPaused(false);
  }, [player]);

  const pause = useCallback(() => {
    player.pause();
    setIsPaused(true);
  }, [player]);

  const togglePlayPause = useCallback(() => {
    if (isEnded) {
      player.currentTime = 0;
      setIsEnded(false);
      player.play();
      setIsPaused(false);
    } else if (isPaused) {
      play();
    } else {
      pause();
    }
  }, [isPaused, isEnded, player, play, pause]);

  const replay = useCallback(() => {
    player.currentTime = 0;
    setIsEnded(false);
    player.play();
    setIsPaused(false);
  }, [player]);

  return {
    player,
    isPaused,
    currentTime,
    totalTime,
    durationSeconds,
    currentSeconds,
    isEnded,
    play,
    pause,
    togglePlayPause,
    replay,
  };
}
