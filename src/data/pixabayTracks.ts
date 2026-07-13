import type { AudioTrack } from "../types/audio";

/**
 * Pixabay local BGM tracks.
 * Files live under public/audio/pixabay/ — do not hotlink Pixabay CDN URLs.
 */
export const PIXABAY_TRACKS: AudioTrack[] = [
  {
    id: "pixabay-meditation-01",
    title: "Meditation Ambient",
    category: "meditation",
    source: "pixabay",
    audioUrl: "/audio/pixabay/meditation-01.mp3",
    creator: "leberch",
    license: "Pixabay Content License",
    sourcePageUrl:
      "https://pixabay.com/music/meditationspiritual-meditation-ambient-375361/",
  },
  {
    id: "pixabay-meditation-02",
    title: "Meditation",
    category: "meditation",
    source: "pixabay",
    audioUrl: "/audio/pixabay/meditation-02.mp3",
    creator: "The_Mountain",
    license: "Pixabay Content License",
    sourcePageUrl:
      "https://pixabay.com/music/ambient-meditation-490007/",
  },
  {
    id: "pixabay-sleep-01",
    title: "Sleep Music",
    category: "sleep",
    source: "pixabay",
    audioUrl: "/audio/pixabay/sleep-01.mp3",
    creator: "AtlasAudio",
    license: "Pixabay Content License",
    sourcePageUrl:
      "https://pixabay.com/music/meditationspiritual-sleep-music-562633/",
  },
  {
    id: "pixabay-sleep-02",
    title: "Sleep Healing",
    category: "sleep",
    source: "pixabay",
    audioUrl: "/audio/pixabay/sleep-02.mp3",
    creator: "leberch",
    license: "Pixabay Content License",
    sourcePageUrl:
      "https://pixabay.com/music/meditationspiritual-sleep-healing-254393/",
  },
];

export function getPixabayTracksByCategory(
  category: "meditation" | "sleep",
): AudioTrack[] {
  return PIXABAY_TRACKS.filter((track) => track.category === category);
}
