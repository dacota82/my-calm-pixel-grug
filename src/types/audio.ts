export type AudioCategory = "meditation" | "sleep" | "nature";
export type AudioSource = "pixabay" | "freesound";
export type NatureSoundType = "rain" | "forest" | "ocean";

export type AudioTrack = {
  id: string;
  title: string;
  category: AudioCategory;
  source: AudioSource;
  audioUrl: string;
  creator?: string;
  durationSeconds?: number;
  license?: string;
  sourcePageUrl?: string;
};
