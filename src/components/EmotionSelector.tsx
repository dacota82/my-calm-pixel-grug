import type { EmotionId } from "../types/calm";
import { emotions } from "../data/calmContent";

type EmotionSelectorProps = {
  selectedEmotionId: EmotionId | null;
  onSelect: (emotionId: EmotionId) => void;
};

export function EmotionSelector({
  selectedEmotionId,
  onSelect,
}: EmotionSelectorProps) {
  return (
    <div className="emotion-list" role="group" aria-label="감정 선택">
      {emotions.map((emotion) => {
        const selected = selectedEmotionId === emotion.id;
        return (
          <button
            key={emotion.id}
            type="button"
            className={`emotion-btn${selected ? " selected" : ""}`}
            aria-pressed={selected}
            onClick={() => onSelect(emotion.id)}
          >
            {emotion.label}
          </button>
        );
      })}
    </div>
  );
}
