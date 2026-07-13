import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioTrack } from "../types/audio";

const DEFAULT_VOLUME = 0.38;

type UseAudioPlayerResult = {
  currentTrackId: string | null;
  isPlaying: boolean;
  volume: number;
  errorMessage: string | null;
  playTrack: (track: AudioTrack) => void;
  togglePlayPause: () => void;
  setVolumePercent: (percent: number) => void;
  stop: () => void;
};

export function useAudioPlayer(): UseAudioPlayerResult {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.volume = DEFAULT_VOLUME;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    const audio = ensureAudio();

    const handleEnded = () => {
      setIsPlaying(false);
    };
    const handleError = () => {
      setIsPlaying(false);
      setErrorMessage("이 곡을 재생할 수 없습니다. 다른 곡을 선택해 주세요.");
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [ensureAudio]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const playTrack = useCallback(
    (track: AudioTrack) => {
      const audio = ensureAudio();
      setErrorMessage(null);

      if (currentTrackId === track.id) {
        void audio.play().then(
          () => setIsPlaying(true),
          () => {
            setIsPlaying(false);
            setErrorMessage("재생을 시작하지 못했습니다.");
          },
        );
        return;
      }

      audio.pause();
      audio.src = track.audioUrl;
      audio.currentTime = 0;
      setCurrentTrackId(track.id);

      void audio.play().then(
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          setErrorMessage("재생을 시작하지 못했습니다.");
        },
      );
    },
    [currentTrackId, ensureAudio],
  );

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrackId) return;

    if (audio.paused) {
      void audio.play().then(
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          setErrorMessage("재생을 시작하지 못했습니다.");
        },
      );
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, [currentTrackId]);

  const setVolumePercent = useCallback((percent: number) => {
    const clamped = Math.min(100, Math.max(0, percent));
    const nextVolume = clamped / 100;
    setVolume(nextVolume);
    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  }, []);

  return {
    currentTrackId,
    isPlaying,
    volume,
    errorMessage,
    playTrack,
    togglePlayPause,
    setVolumePercent,
    stop,
  };
}
