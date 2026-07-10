(() => {
  "use strict";

  const STORAGE_KEY = "my-calm-pixel-grug-cards";
  const IMAGE_PATH = "assets/anchor-grug.png";
  const DEFAULT_USER_MESSAGE = "오늘도 작은 돌 하나.";
  const BREATH_INHALE_SECONDS = 3;
  const BREATH_HOLD_SECONDS = 3;
  const BREATH_EXHALE_SECONDS = 5;
  const BREATH_ROUNDS = 5;

  const timeGuides = {
    morning: "오늘 마음은 어떤가요?",
    midday: "잠깐 숨을 고르고 다시 흐름을 잡아볼까요?",
    nap: "짧게 쉬어도 괜찮아요.",
    evening: "오늘 하루를 천천히 내려놓아 볼까요?",
    night: "잠들기 전 마음을 가볍게 해볼까요?",
  };

  const timeSlotLabels = {
    morning: "아침",
    midday: "점심",
    nap: "낮잠",
    evening: "저녁",
    night: "밤",
  };

  const emotions = [
    { id: "calm", label: "평온" },
    { id: "tired", label: "지침" },
    { id: "anxious", label: "불안" },
    { id: "grateful", label: "감사" },
    { id: "focus", label: "집중" },
    { id: "recovery", label: "회복" },
    { id: "start", label: "시작" },
  ];

  const grugMessages = {
    calm: ["좋음. 지금 마음, 그냥 둬도 됨.", "하늘 맑음. Grug 도 조용히 앉음."],
    tired: ["Grug 도 오늘 조금 느림.", "큰 돌 많이 들었음. 잠깐 내려놔도 됨."],
    anxious: ["큰 돌 말고 작은 돌 하나만.", "생각 많음. 숨 하나 먼저."],
    grateful: ["고마운 마음, 작은 불씨 같음.", "Grug 도 고개 끄덕임."],
    focus: ["작은 돌 하나만 들자.", "멀리 말고 바로 앞만 봄."],
    recovery: ["쉬는 것도 동굴 친구의 일.", "잠깐 멈춤. 다시 걸으면 됨."],
    start: ["처음은 작은 발자국이면 됨.", "Grug 도 같이 감."],
  };

  const breathSteps = [
    { label: "숨 들이쉬기", seconds: BREATH_INHALE_SECONDS },
    { label: "잠시 멈추기", seconds: BREATH_HOLD_SECONDS },
    { label: "천천히 내쉬기", seconds: BREATH_EXHALE_SECONDS },
  ];

  const appState = {
    currentScreen: "home",
    timeSlot: null,
    selectedEmotionId: null,
    userMessage: "",
    currentGrugMessage: "",
    draftCard: null,
    cards: [],
    breathTimerId: null,
    breathRound: 1,
    breathStepIndex: 0,
  };

  const els = {
    homeGuide: document.getElementById("home-time-guide"),
    checkinGuide: document.getElementById("checkin-time-guide"),
    emotionList: document.getElementById("emotion-list"),
    checkinHint: document.getElementById("checkin-hint"),
    userMessage: document.getElementById("user-message"),
    breathRound: document.getElementById("breath-round"),
    breathLabel: document.getElementById("breath-step-label"),
    breathCount: document.getElementById("breath-count"),
    resultDate: document.getElementById("result-date"),
    resultSlot: document.getElementById("result-slot"),
    resultEmotion: document.getElementById("result-emotion"),
    resultUser: document.getElementById("result-user"),
    resultGrug: document.getElementById("result-grug"),
    saveFeedback: document.getElementById("save-feedback"),
    cardList: document.getElementById("card-list"),
  };

  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.add("active");
    appState.currentScreen = screenId;
  }

  function getCurrentTimeSlot(date = new Date()) {
    const hour = date.getHours();
    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 14) return "midday";
    if (hour >= 14 && hour < 17) return "nap";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  }

  function renderTimeGuide() {
    appState.timeSlot = getCurrentTimeSlot();
    const text = timeGuides[appState.timeSlot];
    els.homeGuide.textContent = text;
    els.checkinGuide.textContent = text;
  }

  function renderEmotions() {
    els.emotionList.innerHTML = "";
    emotions.forEach((emotion) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "emotion-btn";
      btn.dataset.emotionId = emotion.id;
      btn.textContent = emotion.label;
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => selectEmotion(emotion.id));
      els.emotionList.appendChild(btn);
    });
  }

  function selectEmotion(emotionId) {
    appState.selectedEmotionId = emotionId;
    els.checkinHint.hidden = true;
    document.querySelectorAll(".emotion-btn").forEach((btn) => {
      const selected = btn.dataset.emotionId === emotionId;
      btn.classList.toggle("selected", selected);
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function getEmotionLabel(emotionId) {
    const found = emotions.find((e) => e.id === emotionId);
    return found ? found.label : "";
  }

  function getGrugMessage(emotionId) {
    const list = grugMessages[emotionId] || ["Grug 도 옆에 있음."];
    return list[Math.floor(Math.random() * list.length)];
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function createCardId(date = new Date()) {
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

  function formatDate(date = new Date()) {
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate())
    );
  }

  function createCheckInCard() {
    const now = new Date();
    const emotionId = appState.selectedEmotionId;
    const raw = (els.userMessage.value || "").trim();
    const userMessage = raw || DEFAULT_USER_MESSAGE;
    const grugMessage = getGrugMessage(emotionId);

    appState.userMessage = userMessage;
    appState.currentGrugMessage = grugMessage;

    return {
      id: createCardId(now),
      date: formatDate(now),
      timeSlot: appState.timeSlot,
      emotionId,
      emotionLabel: getEmotionLabel(emotionId),
      userMessage,
      grugMessage,
      imagePath: IMAGE_PATH,
      createdAt: now.toISOString(),
    };
  }

  function saveCards(cards) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }

  function loadCards() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCard(card) {
    const cards = loadCards();
    cards.unshift(card);
    saveCards(cards);
    appState.cards = cards;
  }

  function deleteCard(cardId) {
    const cards = loadCards().filter((card) => card.id !== cardId);
    saveCards(cards);
    appState.cards = cards;
    renderCardList();
  }

  function clearBreathTimer() {
    if (appState.breathTimerId) {
      clearInterval(appState.breathTimerId);
      appState.breathTimerId = null;
    }
  }

  function updateBreathRoundLabel() {
    if (els.breathRound) {
      els.breathRound.textContent = appState.breathRound + "/" + BREATH_ROUNDS;
    }
  }

  function finishBreathing() {
    clearBreathTimer();
    appState.draftCard = createCheckInCard();
    renderResultCard(appState.draftCard);
    els.saveFeedback.hidden = true;
    showScreen("result-screen");
  }

  function advanceBreath() {
    appState.breathStepIndex += 1;
    if (appState.breathStepIndex >= breathSteps.length) {
      appState.breathStepIndex = 0;
      appState.breathRound += 1;
      if (appState.breathRound > BREATH_ROUNDS) {
        finishBreathing();
        return;
      }
    }
    runBreathStep();
  }

  function runBreathStep() {
    const step = breathSteps[appState.breathStepIndex];
    let remaining = step.seconds;
    updateBreathRoundLabel();
    els.breathLabel.textContent = step.label;
    els.breathCount.textContent = String(remaining);

    clearBreathTimer();
    appState.breathTimerId = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearBreathTimer();
        advanceBreath();
        return;
      }
      els.breathCount.textContent = String(remaining);
    }, 1000);
  }

  function startBreathing() {
    if (!appState.selectedEmotionId) {
      els.checkinHint.hidden = false;
      return;
    }
    els.checkinHint.hidden = true;
    appState.breathRound = 1;
    appState.breathStepIndex = 0;
    showScreen("breathing-screen");
    runBreathStep();
  }

  function renderResultCard(card) {
    els.resultDate.textContent = card.date;
    els.resultSlot.textContent = timeSlotLabels[card.timeSlot] || card.timeSlot;
    els.resultEmotion.textContent = card.emotionLabel;
    els.resultUser.textContent = card.userMessage;
    els.resultGrug.textContent = card.grugMessage;
  }

  function renderCardList() {
    const cards = loadCards().slice().sort((a, b) => {
      return String(b.createdAt).localeCompare(String(a.createdAt));
    });
    appState.cards = cards;
    els.cardList.innerHTML = "";

    if (!cards.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "아직 남긴 마음 카드가 없습니다.";
      els.cardList.appendChild(empty);
      return;
    }

    cards.forEach((card) => {
      const article = document.createElement("article");
      article.className = "history-card";
      article.innerHTML = `
        <div class="history-card-top">
          <img class="pixel-image" src="${IMAGE_PATH}" alt="Pixel Grug" width="56" height="56" />
          <div>
            <h3>${escapeHtml(card.emotionLabel)}</h3>
            <p class="card-meta">${escapeHtml(card.date)} · ${escapeHtml(
              timeSlotLabels[card.timeSlot] || card.timeSlot
            )}</p>
            <p>${escapeHtml(card.userMessage)}</p>
            <p><strong>Grug:</strong> ${escapeHtml(card.grugMessage)}</p>
          </div>
        </div>
        <div class="history-actions">
          <button type="button" class="btn btn-danger" data-delete-id="${escapeHtml(
            card.id
          )}">삭제</button>
        </div>
      `;
      els.cardList.appendChild(article);
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function resetCheckIn() {
    clearBreathTimer();
    appState.selectedEmotionId = null;
    appState.userMessage = "";
    appState.currentGrugMessage = "";
    appState.draftCard = null;
    appState.breathRound = 1;
    appState.breathStepIndex = 0;
    els.userMessage.value = "";
    els.checkinHint.hidden = true;
    els.saveFeedback.hidden = true;
    document.querySelectorAll(".emotion-btn").forEach((btn) => {
      btn.classList.remove("selected");
      btn.setAttribute("aria-pressed", "false");
    });
    renderTimeGuide();
  }

  function goCheckin() {
    resetCheckIn();
    showScreen("checkin-screen");
  }

  function goHistory() {
    clearBreathTimer();
    renderCardList();
    showScreen("history-screen");
  }

  function bindEvents() {
    document.getElementById("btn-start").addEventListener("click", goCheckin);
    document
      .getElementById("btn-history-from-home")
      .addEventListener("click", goHistory);
    document.getElementById("btn-back-home").addEventListener("click", () => {
      clearBreathTimer();
      showScreen("home-screen");
    });
    document.getElementById("btn-breathe").addEventListener("click", startBreathing);
    document.getElementById("btn-save").addEventListener("click", () => {
      if (!appState.draftCard) return;
      saveCard(appState.draftCard);
      els.saveFeedback.hidden = false;
      appState.draftCard = null;
    });
    document.getElementById("btn-again").addEventListener("click", goCheckin);
    document
      .getElementById("btn-history-from-result")
      .addEventListener("click", goHistory);
    document
      .getElementById("btn-home-from-history")
      .addEventListener("click", () => {
        renderTimeGuide();
        showScreen("home-screen");
      });

    els.cardList.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-delete-id]");
      if (!btn) return;
      deleteCard(btn.getAttribute("data-delete-id"));
    });
  }

  function initApp() {
    appState.cards = loadCards();
    renderTimeGuide();
    renderEmotions();
    bindEvents();
    showScreen("home-screen");
  }

  document.addEventListener("DOMContentLoaded", initApp);
})();
