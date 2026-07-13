type VercelRequest = {
  method?: string;
  query: Partial<Record<string, string | string[]>>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type NatureSoundType = "rain" | "forest" | "ocean";

type AudioTrack = {
  id: string;
  title: string;
  category: "nature";
  source: "freesound";
  audioUrl: string;
  creator?: string;
  durationSeconds?: number;
  license?: string;
  sourcePageUrl?: string;
};

type FreesoundPreviews = {
  "preview-hq-mp3"?: string;
  "preview-lq-mp3"?: string;
};

type FreesoundResult = {
  id?: number;
  name?: string;
  username?: string;
  license?: string;
  duration?: number;
  url?: string;
  previews?: FreesoundPreviews;
};

type FreesoundSearchResponse = {
  results?: FreesoundResult[];
};

/**
 * Freesound APIv2 search
 * Docs: https://freesound.org/docs/api/resources_apiv2.html
 * Auth: Authorization: Token <key>
 * Prefer Creative Commons 0 for educational MVP.
 */
const TYPE_QUERIES: Record<
  NatureSoundType,
  { query: string; filter: string }
> = {
  rain: {
    query: "rain",
    filter: 'license:"Creative Commons 0" tag:rain duration:[10 TO 180]',
  },
  forest: {
    query: "forest",
    filter: 'license:"Creative Commons 0" tag:forest duration:[10 TO 180]',
  },
  ocean: {
    query: "ocean",
    filter: 'license:"Creative Commons 0" tag:ocean duration:[10 TO 180]',
  },
};

const FREESOUND_SEARCH_URL = "https://freesound.org/apiv2/search/";
const REQUEST_TIMEOUT_MS = 12000;
const CACHE_TTL_MS = 10 * 60 * 1000;
const PAGE_SIZE = 2;

const responseCache = new Map<
  NatureSoundType,
  { expiresAt: number; tracks: AudioTrack[] }
>();

function isNatureSoundType(value: string): value is NatureSoundType {
  return value === "rain" || value === "forest" || value === "ocean";
}

function normalizeLicense(license?: string): string | undefined {
  if (!license) return undefined;
  if (
    /creativecommons\.org\/publicdomain\/zero/i.test(license) ||
    /Creative Commons 0/i.test(license) ||
    /CC0/i.test(license)
  ) {
    return "Creative Commons 0";
  }
  return license;
}

function normalizeTracks(results: FreesoundResult[]): AudioTrack[] {
  const tracks: AudioTrack[] = [];

  for (const item of results) {
    const previewUrl =
      item.previews?.["preview-hq-mp3"] ?? item.previews?.["preview-lq-mp3"];
    if (!item.id || !item.name || !previewUrl) continue;

    tracks.push({
      id: `freesound-${item.id}`,
      title: item.name,
      category: "nature",
      source: "freesound",
      audioUrl: previewUrl,
      creator: item.username,
      durationSeconds:
        typeof item.duration === "number"
          ? Math.round(item.duration)
          : undefined,
      license: normalizeLicense(item.license),
      sourcePageUrl: item.url ?? `https://freesound.org/sounds/${item.id}/`,
    });
  }

  return tracks;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).json({ error: "허용되지 않은 요청입니다." });
    return;
  }

  const typeRaw = String(req.query.type ?? "");
  if (!isNatureSoundType(typeRaw)) {
    res.status(400).json({
      error: "type은 rain, forest, ocean 중 하나여야 합니다.",
    });
    return;
  }

  const apiKey = process.env.FREESOUND_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "자연음 서비스 설정이 완료되지 않아 소리를 불러올 수 없습니다.",
    });
    return;
  }

  const cached = responseCache.get(typeRaw);
  if (cached && cached.expiresAt > Date.now()) {
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
    res.status(200).json({ tracks: cached.tracks });
    return;
  }

  const queryConfig = TYPE_QUERIES[typeRaw];
  const url = new URL(FREESOUND_SEARCH_URL);
  url.searchParams.set("query", queryConfig.query);
  url.searchParams.set("filter", queryConfig.filter);
  url.searchParams.set(
    "fields",
    "id,name,username,license,duration,url,previews",
  );
  url.searchParams.set("page_size", String(PAGE_SIZE));
  url.searchParams.set("page", "1");
  url.searchParams.set("sort", "rating_desc");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const freesoundResponse = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Token ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!freesoundResponse.ok) {
      res.status(502).json({
        error:
          "Freesound에서 자연음을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
      return;
    }

    const payload =
      (await freesoundResponse.json()) as FreesoundSearchResponse;
    const results = Array.isArray(payload.results) ? payload.results : [];
    const tracks = normalizeTracks(results).slice(0, PAGE_SIZE);

    responseCache.set(typeRaw, {
      expiresAt: Date.now() + CACHE_TTL_MS,
      tracks,
    });

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
    res.status(200).json({ tracks });
  } catch {
    res.status(502).json({
      error: "자연음 서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
