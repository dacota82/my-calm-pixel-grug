export type ScreenId =
  | "home"
  | "checkin"
  | "breathing"
  | "result"
  | "history";

export type TimeSlot = "morning" | "midday" | "nap" | "evening" | "night";

export type EmotionId =
  | "calm"
  | "tired"
  | "anxious"
  | "grateful"
  | "focus"
  | "recovery"
  | "start";

export type Emotion = {
  id: EmotionId;
  label: string;
};

export type BreathStep = {
  label: string;
  seconds: number;
};

export type CalmCard = {
  id: string;
  date: string;
  timeSlot: TimeSlot;
  emotionId: EmotionId;
  emotionLabel: string;
  userMessage: string;
  grugMessage: string;
  imagePath: string;
  createdAt: string;
};

export type DraftCard = CalmCard;
