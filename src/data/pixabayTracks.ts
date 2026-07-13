import type { AudioTrack } from "../types/audio";

/**
 * Pixabay local BGM tracks.
 * Fill after the lord provides MP3 files and Source Page metadata.
 * Do not hotlink Pixabay CDN URLs.
 */
export const PIXABAY_TRACKS: AudioTrack[] = [];

export function getPixabayTracksByCategory(
  category: "meditation" | "sleep",
): AudioTrack[] {
  return PIXABAY_TRACKS.filter((track) => track.category === category);
}
