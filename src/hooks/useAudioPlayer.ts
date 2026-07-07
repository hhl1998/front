import { useRef, useState, useCallback, useEffect } from 'react';
import type { PlayState } from '../types/music';

export interface AudioPlayerControls {
  isPlaying: boolean;
  playState: PlayState;
  currentTime: number;
  duration: number;
  error: string | null;
  load: (url: string) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggle: () => void;
}

export function useAudioPlayer(): AudioPlayerControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playState, setPlayState] = useState<PlayState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.7;
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setPlayState('idle');
    };
    const onError = () => {
      setError('音频加载失败，该录音可能暂时不可用。请尝试其他日期。');
      setIsPlaying(false);
      setPlayState('error');
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const load = useCallback((url: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setError(null);
    setIsPlaying(false);
    setPlayState('loading');
    setCurrentTime(0);
    audio.src = url;
    audio.load();
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    setPlayState('loading');
    audio.play().then(() => {
      setIsPlaying(true);
      setPlayState('playing');
    }).catch(() => {
      setError('播放失败，请再次点击播放按钮重试。');
      setPlayState('paused');
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setPlayState('paused');
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setPlayState('idle');
    setCurrentTime(0);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    playState,
    currentTime,
    duration,
    error,
    load,
    play,
    pause,
    stop,
    toggle,
  };
}
