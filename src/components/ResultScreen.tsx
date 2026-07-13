import type { DraftCard } from "../types/calm";
import { PixelCard } from "./PixelCard";

type ResultScreenProps = {
  card: DraftCard | null;
  saveFeedback: boolean;
  onSave: () => void;
  onAgain: () => void;
  onHistory: () => void;
};

export function ResultScreen({
  card,
  saveFeedback,
  onSave,
  onAgain,
  onHistory,
}: ResultScreenProps) {
  return (
    <section className="screen active" aria-label="결과 카드">
      <h2 className="screen-title">오늘의 픽셀 카드</h2>
      {card ? <PixelCard card={card} /> : null}
      {saveFeedback ? <p className="hint">카드를 남겼어요.</p> : null}
      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onSave}>
          카드 저장
        </button>
        <button type="button" className="btn btn-ghost" onClick={onAgain}>
          다시 체크인
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHistory}>
          기록 보기
        </button>
      </div>
    </section>
  );
}
