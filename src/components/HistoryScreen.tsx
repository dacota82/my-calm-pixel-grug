import grugImage from "../assets/anchor-grug.png";
import { timeSlotLabels } from "../data/calmContent";
import type { CalmCard } from "../types/calm";

type HistoryScreenProps = {
  cards: CalmCard[];
  onDelete: (cardId: string) => void;
  onHome: () => void;
};

export function HistoryScreen({ cards, onDelete, onHome }: HistoryScreenProps) {
  return (
    <section className="screen active" aria-label="기록 목록">
      <h2 className="screen-title">마음 카드 기록</h2>
      <div className="card-list">
        {cards.length === 0 ? (
          <p className="empty-state">아직 남긴 마음 카드가 없습니다.</p>
        ) : (
          cards.map((card) => (
            <article key={card.id} className="history-card">
              <div className="history-card-top">
                <img
                  className="pixel-image"
                  src={grugImage}
                  alt="Pixel Grug"
                  width={56}
                  height={56}
                />
                <div>
                  <h3>{card.emotionLabel}</h3>
                  <p className="card-meta">
                    {card.date} ·{" "}
                    {timeSlotLabels[card.timeSlot] || card.timeSlot}
                  </p>
                  <p>{card.userMessage}</p>
                  <p>
                    <strong>Grug:</strong> {card.grugMessage}
                  </p>
                </div>
              </div>
              <div className="history-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(card.id)}
                >
                  삭제
                </button>
              </div>
            </article>
          ))
        )}
      </div>
      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onHome}>
          홈으로
        </button>
      </div>
    </section>
  );
}
