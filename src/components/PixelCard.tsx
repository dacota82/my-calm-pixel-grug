import grugImage from "../assets/anchor-grug.png";
import { timeSlotLabels } from "../data/calmContent";
import type { CalmCard } from "../types/calm";

type PixelCardProps = {
  card: CalmCard;
};

export function PixelCard({ card }: PixelCardProps) {
  return (
    <article className="pixel-card" aria-live="polite">
      <img
        className="pixel-image card-grug"
        src={grugImage}
        alt="Pixel Grug"
        width={96}
        height={96}
      />
      <p className="card-meta">
        <span>{card.date}</span> ·{" "}
        <span>{timeSlotLabels[card.timeSlot] || card.timeSlot}</span>
      </p>
      <p className="card-emotion">{card.emotionLabel}</p>
      <p className="card-user">{card.userMessage}</p>
      <p className="card-grug-msg">{card.grugMessage}</p>
    </article>
  );
}
