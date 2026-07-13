import type { EmotionId } from "../types/calm";
import { EmotionSelector } from "./EmotionSelector";

type CheckInScreenProps = {
  timeGuide: string;
  selectedEmotionId: EmotionId | null;
  userMessage: string;
  showHint: boolean;
  onSelectEmotion: (emotionId: EmotionId) => void;
  onUserMessageChange: (value: string) => void;
  onStartBreathing: () => void;
  onBack: () => void;
};

export function CheckInScreen({
  timeGuide,
  selectedEmotionId,
  userMessage,
  showHint,
  onSelectEmotion,
  onUserMessageChange,
  onStartBreathing,
  onBack,
}: CheckInScreenProps) {
  return (
    <section className="screen active" aria-label="체크인">
      <h2 className="screen-title">지금 마음은?</h2>
      <p className="time-guide" aria-live="polite">
        {timeGuide}
      </p>
      <EmotionSelector
        selectedEmotionId={selectedEmotionId}
        onSelect={onSelectEmotion}
      />
      {showHint ? (
        <p className="hint">지금 마음을 하나 골라주세요.</p>
      ) : null}
      <label className="field-label" htmlFor="user-message">
        오늘의 한 줄
      </label>
      <textarea
        id="user-message"
        className="user-message"
        rows={2}
        maxLength={120}
        placeholder="짧게 적어도 괜찮아요."
        value={userMessage}
        onChange={(event) => onUserMessageChange(event.target.value)}
      />
      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onStartBreathing}
        >
          호흡 시작
        </button>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          뒤로
        </button>
      </div>
    </section>
  );
}
