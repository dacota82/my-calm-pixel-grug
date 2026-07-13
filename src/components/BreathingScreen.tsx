import { BREATH_ROUNDS } from "../data/calmContent";
import { useBreathingTimer } from "../hooks/useBreathingTimer";

type BreathingScreenProps = {
  onComplete: () => void;
};

export function BreathingScreen({ onComplete }: BreathingScreenProps) {
  const { breathRound, breathRemaining, breathStepLabel } =
    useBreathingTimer(onComplete);

  return (
    <section className="screen active" aria-label="호흡">
      <h2 className="screen-title">짧은 호흡</h2>
      <p className="time-guide" aria-live="polite">
        {breathRound}/{BREATH_ROUNDS}
      </p>
      <p className="breath-label" aria-live="polite">
        {breathStepLabel}
      </p>
      <p className="breath-count" aria-live="polite">
        {breathRemaining}
      </p>
      <p className="hint">들숨 3초 · 멈춤 3초 · 날숨 5초 · 5회</p>
    </section>
  );
}
