import { useCallback, useMemo, useState } from "react";
import { BreathingScreen } from "./components/BreathingScreen";
import { CheckInScreen } from "./components/CheckInScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { HomeScreen } from "./components/HomeScreen";
import { ResultScreen } from "./components/ResultScreen";
import { SoundScreen } from "./components/SoundScreen";
import {
  DEFAULT_USER_MESSAGE,
  IMAGE_PATH,
  createCardId,
  formatDate,
  getCurrentTimeSlot,
  getEmotionLabel,
  getGrugMessage,
  timeGuides,
} from "./data/calmContent";
import {
  addCard,
  deleteCard as deleteStoredCard,
  loadCards,
} from "./services/cardStorage";
import type {
  CalmCard,
  DraftCard,
  EmotionId,
  ScreenId,
  TimeSlot,
} from "./types/calm";

function sortCardsNewestFirst(cards: CalmCard[]): CalmCard[] {
  return cards.slice().sort((a, b) => {
    return String(b.createdAt).localeCompare(String(a.createdAt));
  });
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("home");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(() => getCurrentTimeSlot());
  const [selectedEmotionId, setSelectedEmotionId] = useState<EmotionId | null>(
    null,
  );
  const [userMessage, setUserMessage] = useState("");
  const [showEmotionHint, setShowEmotionHint] = useState(false);
  const [resultCard, setResultCard] = useState<DraftCard | null>(null);
  const [draftCard, setDraftCard] = useState<DraftCard | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [savedCards, setSavedCards] = useState<CalmCard[]>(() =>
    sortCardsNewestFirst(loadCards()),
  );

  const timeGuide = useMemo(() => timeGuides[timeSlot], [timeSlot]);

  const refreshTimeSlot = useCallback(() => {
    const nextSlot = getCurrentTimeSlot();
    setTimeSlot(nextSlot);
  }, []);

  const refreshSavedCards = useCallback(() => {
    setSavedCards(sortCardsNewestFirst(loadCards()));
  }, []);

  const resetCheckIn = useCallback(() => {
    setSelectedEmotionId(null);
    setUserMessage("");
    setShowEmotionHint(false);
    setResultCard(null);
    setDraftCard(null);
    setSaveFeedback(false);
    refreshTimeSlot();
  }, [refreshTimeSlot]);

  const goHome = useCallback(() => {
    refreshTimeSlot();
    setCurrentScreen("home");
  }, [refreshTimeSlot]);

  const goCheckIn = useCallback(() => {
    resetCheckIn();
    setCurrentScreen("checkin");
  }, [resetCheckIn]);

  const goHistory = useCallback(() => {
    refreshSavedCards();
    setCurrentScreen("history");
  }, [refreshSavedCards]);

  const goSound = useCallback(() => {
    setCurrentScreen("sound");
  }, []);

  const handleSelectEmotion = useCallback((emotionId: EmotionId) => {
    setSelectedEmotionId(emotionId);
    setShowEmotionHint(false);
  }, []);

  const handleStartBreathing = useCallback(() => {
    if (!selectedEmotionId) {
      setShowEmotionHint(true);
      return;
    }
    setShowEmotionHint(false);
    setCurrentScreen("breathing");
  }, [selectedEmotionId]);

  const createCheckInCard = useCallback((): DraftCard => {
    const now = new Date();
    const emotionId = selectedEmotionId;
    if (!emotionId) {
      throw new Error("Emotion must be selected before creating a card.");
    }

    const raw = userMessage.trim();
    const resolvedMessage = raw || DEFAULT_USER_MESSAGE;
    const grugMessage = getGrugMessage(emotionId);

    return {
      id: createCardId(now),
      date: formatDate(now),
      timeSlot,
      emotionId,
      emotionLabel: getEmotionLabel(emotionId),
      userMessage: resolvedMessage,
      grugMessage,
      imagePath: IMAGE_PATH,
      createdAt: now.toISOString(),
    };
  }, [selectedEmotionId, timeSlot, userMessage]);

  const handleBreathingComplete = useCallback(() => {
    const card = createCheckInCard();
    setResultCard(card);
    setDraftCard(card);
    setSaveFeedback(false);
    setCurrentScreen("result");
  }, [createCheckInCard]);

  const handleSaveCard = useCallback(() => {
    if (!draftCard) return;
    const nextCards = addCard(draftCard);
    setSavedCards(sortCardsNewestFirst(nextCards));
    setSaveFeedback(true);
    setDraftCard(null);
  }, [draftCard]);

  const handleDeleteCard = useCallback((cardId: string) => {
    const nextCards = deleteStoredCard(cardId);
    setSavedCards(sortCardsNewestFirst(nextCards));
  }, []);

  return (
    <main className="app">
      {currentScreen === "home" ? (
        <HomeScreen
          timeGuide={timeGuide}
          onStart={goCheckIn}
          onHistory={goHistory}
          onSound={goSound}
        />
      ) : null}

      {currentScreen === "checkin" ? (
        <CheckInScreen
          timeGuide={timeGuide}
          selectedEmotionId={selectedEmotionId}
          userMessage={userMessage}
          showHint={showEmotionHint}
          onSelectEmotion={handleSelectEmotion}
          onUserMessageChange={setUserMessage}
          onStartBreathing={handleStartBreathing}
          onBack={goHome}
        />
      ) : null}

      {currentScreen === "breathing" ? (
        <BreathingScreen onComplete={handleBreathingComplete} />
      ) : null}

      {currentScreen === "result" ? (
        <ResultScreen
          card={resultCard}
          saveFeedback={saveFeedback}
          onSave={handleSaveCard}
          onAgain={goCheckIn}
          onHistory={goHistory}
        />
      ) : null}

      {currentScreen === "history" ? (
        <HistoryScreen
          cards={savedCards}
          onDelete={handleDeleteCard}
          onHome={goHome}
        />
      ) : null}

      {currentScreen === "sound" ? <SoundScreen onHome={goHome} /> : null}
    </main>
  );
}

export default App;
