import type { AudioTrack } from "../types/audio";

type AudioTrackCardProps = {
  track: AudioTrack;
  isCurrent: boolean;
  isPlaying: boolean;
  onPlay: (track: AudioTrack) => void;
  onToggle: () => void;
};

function formatDuration(seconds?: number): string {
  if (!seconds) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function AudioTrackCard({
  track,
  isCurrent,
  isPlaying,
  onPlay,
  onToggle,
}: AudioTrackCardProps) {
  const label = isCurrent && isPlaying ? "일시정지" : "재생";

  return (
    <article className={`audio-track-card${isCurrent ? " current" : ""}`}>
      <div className="audio-track-info">
        <h3>{track.title}</h3>
        {track.creator ? (
          <p className="card-meta">Creator: {track.creator}</p>
        ) : null}
        {track.durationSeconds ? (
          <p className="card-meta">{formatDuration(track.durationSeconds)}</p>
        ) : null}
        <p className="card-meta">
          {track.source === "pixabay" ? "Pixabay" : "Freesound"}
          {track.license ? ` · ${track.license}` : ""}
        </p>
        {track.source === "freesound" ? (
          <p className="card-meta attribution">
            Attribution: Freesound
            {track.creator ? ` / ${track.creator}` : ""}
          </p>
        ) : null}
        {track.sourcePageUrl ? (
          <a
            className="source-link"
            href={track.sourcePageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            원본 페이지
          </a>
        ) : null}
      </div>
      <button
        type="button"
        className={`btn ${isCurrent && isPlaying ? "btn-ghost" : "btn-primary"} audio-play-btn`}
        onClick={() => {
          if (isCurrent) {
            onToggle();
            return;
          }
          onPlay(track);
        }}
      >
        {label}
      </button>
    </article>
  );
}
