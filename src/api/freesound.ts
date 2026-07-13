import type { AudioTrack, NatureSoundType } from "../types/audio";

type FreesoundSoundsResponse = {
  tracks?: unknown;
  error?: unknown;
};

function isAudioTrack(value: unknown): value is AudioTrack {
  if (!value || typeof value !== "object") return false;
  const track = value as Record<string, unknown>;
  return (
    typeof track.id === "string" &&
    typeof track.title === "string" &&
    typeof track.audioUrl === "string" &&
    track.category === "nature" &&
    track.source === "freesound"
  );
}

export async function fetchNatureSounds(
  type: NatureSoundType,
): Promise<AudioTrack[]> {
  let response: Response;

  try {
    response = await fetch(
      `/api/freesound-sounds?type=${encodeURIComponent(type)}`,
    );
  } catch {
    throw new Error("네트워크 오류로 자연음을 불러오지 못했습니다.");
  }

  let payload: FreesoundSoundsResponse;
  try {
    payload = (await response.json()) as FreesoundSoundsResponse;
  } catch {
    throw new Error("자연음 서버 응답을 해석하지 못했습니다.");
  }

  if (!response.ok) {
    const message =
      typeof payload.error === "string" && payload.error.trim()
        ? payload.error
        : "자연음을 불러오지 못했습니다.";
    throw new Error(message);
  }

  if (!Array.isArray(payload.tracks)) {
    throw new Error("자연음 목록 형식이 올바르지 않습니다.");
  }

  if (payload.tracks.length === 0) {
    return [];
  }

  const tracks = payload.tracks.filter(isAudioTrack);
  if (tracks.length !== payload.tracks.length) {
    throw new Error("일부 자연음 데이터 형식이 올바르지 않습니다.");
  }

  return tracks;
}
