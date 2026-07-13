import type { BreathStep, Emotion, EmotionId, TimeSlot } from "../types/calm";

export const STORAGE_KEY = "my-calm-pixel-grug-cards";
export const IMAGE_PATH = "assets/anchor-grug.png";
export const DEFAULT_USER_MESSAGE = "오늘도 작은 돌 하나.";

export const BREATH_INHALE_SECONDS = 3;
export const BREATH_HOLD_SECONDS = 3;
export const BREATH_EXHALE_SECONDS = 5;
export const BREATH_ROUNDS = 5;

export const timeGuides: Record<TimeSlot, string> = {
  morning: "오늘 마음은 어떤가요?",
  midday: "잠깐 숨을 고르고 다시 흐름을 잡아볼까요?",
  nap: "짧게 쉬어도 괜찮아요.",
  evening: "오늘 하루를 천천히 내려놓아 볼까요?",
  night: "잠들기 전 마음을 가볍게 해볼까요?",
};

export const timeSlotLabels: Record<TimeSlot, string> = {
  morning: "아침",
  midday: "점심",
  nap: "낮잠",
  evening: "저녁",
  night: "밤",
};

export const emotions: Emotion[] = [
  { id: "calm", label: "평온" },
  { id: "tired", label: "지침" },
  { id: "anxious", label: "불안" },
  { id: "grateful", label: "감사" },
  { id: "focus", label: "집중" },
  { id: "recovery", label: "회복" },
  { id: "start", label: "시작" },
];

export const grugMessages: Record<EmotionId, string[]> = {
  calm: ["좋음. 지금 마음, 그냥 둬도 됨.", "하늘 맑음. Grug 도 조용히 앉음."],
  tired: ["Grug 도 오늘 조금 느림.", "큰 돌 많이 들었음. 잠깐 내려놔도 됨."],
  anxious: ["큰 돌 말고 작은 돌 하나만.", "생각 많음. 숨 하나 먼저."],
  grateful: ["고마운 마음, 작은 불씨 같음.", "Grug 도 고개 끄덕임."],
  focus: ["작은 돌 하나만 들자.", "멀리 말고 바로 앞만 봄."],
  recovery: ["쉬는 것도 동굴 친구의 일.", "잠깐 멈춤. 다시 걸으면 됨."],
  start: ["처음은 작은 발자국이면 됨.", "Grug 도 같이 감."],
};

export const breathSteps: BreathStep[] = [
  { label: "숨 들이쉬기", seconds: BREATH_INHALE_SECONDS },
  { label: "잠시 멈추기", seconds: BREATH_HOLD_SECONDS },
  { label: "천천히 내쉬기", seconds: BREATH_EXHALE_SECONDS },
];

export function getCurrentTimeSlot(date = new Date()): TimeSlot {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 14) return "midday";
  if (hour >= 14 && hour < 17) return "nap";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function getEmotionLabel(emotionId: EmotionId): string {
  const found = emotions.find((emotion) => emotion.id === emotionId);
  return found ? found.label : "";
}

export function getGrugMessage(emotionId: EmotionId): string {
  const list = grugMessages[emotionId] ?? ["Grug 도 옆에 있음."];
  return list[Math.floor(Math.random() * list.length)];
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function createCardId(date = new Date()): string {
  return (
    "card-" +
    date.getFullYear() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    "-" +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

export function formatDate(date = new Date()): string {
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate())
  );
}
