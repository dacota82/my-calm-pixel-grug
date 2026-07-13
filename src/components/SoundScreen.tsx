import { useCallback, useEffect, useState } from "react";
import { fetchNatureSounds } from "../api/freesound";
import { getPixabayTracksByCategory } from "../data/pixabayTracks";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import type { AudioCategory, AudioTrack, NatureSoundType } from "../types/audio";
import { AudioTrackCard } from "./AudioTrackCard";

type SoundScreenProps = {
  onHome: () => void;
};

const NATURE_TYPES: NatureSoundType[] = ["rain", "ocean", "forest"];

export function SoundScreen({ onHome }: SoundScreenProps) {
  const [category, setCategory] = useState<AudioCategory>("meditation");
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    currentTrackId,
    isPlaying,
    volume,
    errorMessage: playerError,
    playTrack,
    togglePlayPause,
    setVolumePercent,
    stop,
  } = useAudioPlayer();

  const loadTracks = useCallback(async (nextCategory: AudioCategory) => {
    setErrorMessage(null);

    if (nextCategory === "meditation" || nextCategory === "sleep") {
      setIsLoading(false);
      const localTracks = getPixabayTracksByCategory(nextCategory);
      setTracks(localTracks);
      return;
    }

    setIsLoading(true);
    try {
      const collected: AudioTrack[] = [];
      for (const type of NATURE_TYPES) {
        if (collected.length >= 2) break;
        const natureTracks = await fetchNatureSounds(type);
        for (const track of natureTracks) {
          if (collected.length >= 2) break;
          if (collected.some((item) => item.id === track.id)) continue;
          collected.push(track);
        }
      }
      setTracks(collected);
    } catch (error) {
      setTracks([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "자연음을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTracks(category);
  }, [category, loadTracks]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleCategoryChange = (nextCategory: AudioCategory) => {
    if (nextCategory === category) return;
    stop();
    setCategory(nextCategory);
  };

  const handleHome = () => {
    stop();
    onHome();
  };

  const emptyMessage =
    category === "nature"
      ? "표시할 자연음이 없습니다."
      : "Pixabay 음원 파일이 아직 연결되지 않았습니다.";

  return (
    <section className="screen active" aria-label="음악">
      <h2 className="screen-title">마음을 위한 소리</h2>
      <p className="hint">
        Pixabay 명상·수면 음악과 Freesound 자연음을 골라 들어보세요.
      </p>

      <div className="sound-tabs" role="tablist" aria-label="음악 분류">
        <button
          type="button"
          role="tab"
          className={`btn ${category === "meditation" ? "btn-primary" : "btn-ghost"}`}
          aria-selected={category === "meditation"}
          onClick={() => handleCategoryChange("meditation")}
        >
          명상음악
        </button>
        <button
          type="button"
          role="tab"
          className={`btn ${category === "sleep" ? "btn-primary" : "btn-ghost"}`}
          aria-selected={category === "sleep"}
          onClick={() => handleCategoryChange("sleep")}
        >
          수면음악
        </button>
        <button
          type="button"
          role="tab"
          className={`btn ${category === "nature" ? "btn-primary" : "btn-ghost"}`}
          aria-selected={category === "nature"}
          onClick={() => handleCategoryChange("nature")}
        >
          자연음
        </button>
      </div>

      <div className="volume-row">
        <label htmlFor="bgm-volume">음량</label>
        <input
          id="bgm-volume"
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(event) => setVolumePercent(Number(event.target.value))}
        />
        <span className="card-meta">{Math.round(volume * 100)}%</span>
      </div>

      {playerError ? <p className="hint sound-error">{playerError}</p> : null}

      {isLoading ? <p className="hint">소리를 불러오는 중...</p> : null}

      {!isLoading && errorMessage ? (
        <div className="sound-state">
          <p className="hint sound-error">{errorMessage}</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => void loadTracks(category)}
          >
            다시 시도
          </button>
        </div>
      ) : null}

      {!isLoading && !errorMessage && tracks.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : null}

      {!isLoading && !errorMessage && tracks.length > 0 ? (
        <div className="audio-track-list">
          {tracks.map((track) => (
            <AudioTrackCard
              key={track.id}
              track={track}
              isCurrent={currentTrackId === track.id}
              isPlaying={isPlaying && currentTrackId === track.id}
              onPlay={playTrack}
              onToggle={togglePlayPause}
            />
          ))}
        </div>
      ) : null}

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={handleHome}>
          홈으로
        </button>
      </div>
    </section>
  );
}
