import { useEffect, useRef, useState } from "react";
import { BREATH_ROUNDS, breathSteps } from "../data/calmContent";

type BreathingTimerState = {
  breathRound: number;
  breathStepIndex: number;
  breathRemaining: number;
  breathStepLabel: string;
};

export function useBreathingTimer(onComplete: () => void): BreathingTimerState {
  const [breathRound, setBreathRound] = useState(1);
  const [breathStepIndex, setBreathStepIndex] = useState(0);
  const [breathRemaining, setBreathRemaining] = useState(breathSteps[0].seconds);
  const [breathStepLabel, setBreathStepLabel] = useState(breathSteps[0].label);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    let round = 1;
    let stepIndex = 0;
    let timerId: number | null = null;

    const clearTimer = () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    const runBreathStep = () => {
      const step = breathSteps[stepIndex];
      let remaining = step.seconds;

      if (!cancelled) {
        setBreathRound(round);
        setBreathStepIndex(stepIndex);
        setBreathRemaining(remaining);
        setBreathStepLabel(step.label);
      }

      clearTimer();
      timerId = window.setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearTimer();
          stepIndex += 1;
          if (stepIndex >= breathSteps.length) {
            stepIndex = 0;
            round += 1;
            if (round > BREATH_ROUNDS) {
              if (!cancelled) onCompleteRef.current();
              return;
            }
          }
          runBreathStep();
          return;
        }
        if (!cancelled) setBreathRemaining(remaining);
      }, 1000);
    };

    runBreathStep();

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, []);

  return {
    breathRound,
    breathStepIndex,
    breathRemaining,
    breathStepLabel,
  };
}
