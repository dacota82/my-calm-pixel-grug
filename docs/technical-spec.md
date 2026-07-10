# My Calm — Pixel Grug 기술명세서

> 출처: `my_calm_pixel_grug_technical_spec.pdf`  
> 문서 역할: **HTML, CSS, JavaScript로 어떻게 만들 것인가**  
> MVP 핵심: 짧은 호흡 + Grug 체크인 + 픽셀 카드 기록

---

## 1. 문서 목적

본 문서는 My Calm — Pixel Grug 웹앱을 **HTML / CSS / JavaScript** 기반으로 구현하기 위한 기술명세서이다.

이 앱은 Calm처럼 대량 명상·수면 콘텐츠를 제공하는 서비스가 아니라,  
하루 중 짧은 순간에 감정을 알아차리고 Grug와 함께 **1분 안에 픽셀 카드로 기록**하는 감정 체크인 웹앱이다.

초기 MVP는 **서버·로그인·결제·외부 API 없이** 브라우저에서 동작하는 **정적 웹앱**으로 구현한다.

---

## 2. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | My Calm — Pixel Grug |
| 앱 유형 | 감정 체크인 / 짧은 호흡 / 픽셀 카드 기록 웹앱 |
| 구현 방식 | 정적 웹앱 |
| 기술 스택 | HTML, CSS, JavaScript |
| 저장 방식 | 브라우저 `localStorage` |
| 배포 방식 | GitHub Pages |
| 기준 에셋 | `assets/anchor-grug.png` |
| MVP 핵심 | 짧은 호흡 + Grug 체크인 + 픽셀 카드 기록 |

---

## 3. 핵심 구현 방향

1. 지금 시간대에 맞는 안내를 보여준다.
2. 사용자가 현재 감정을 선택하고 짧은 호흡을 한다.
3. 그 결과를 Grug 메시지와 함께 픽셀 카드로 저장한다.

복잡한 AI보다 **작고 안정적인 사용자 흐름**을 우선한다.  
초기 버전에서 **하지 않음**: Gemini API, 로그인, 서버 DB, 결제, 오디오 재생.

---

## 4. 사용자 흐름

1. 앱 접속
2. 현재 시간 기준 시간대 판별
3. 시간대 안내 문구 표시
4. 감정 선택
5. 오늘의 한 줄 입력
6. 짧은 호흡 루틴
7. 시간대·감정에 맞는 Grug 메시지
8. 픽셀 카드 생성
9. 카드 저장 (`localStorage`)
10. 이전 카드 기록 열람

---

## 5. 화면 구성

### 5.1 메인 화면
| 요소 | 설명 |
|------|------|
| 앱 제목 | My Calm — Pixel Grug |
| 한 줄 소개 | 오늘의 마음을 1분 안에 픽셀 카드로 남기는 앱 |
| Grug 이미지 | `assets/anchor-grug.png` |
| 시간대 안내 문구 | 현재 시간대에 따라 변경 |
| 시작 버튼 | 체크인 화면으로 이동 |

### 5.2 체크인 화면
| 요소 | 설명 |
|------|------|
| 시간대 문구 | 아침, 낮잠, 저녁 등 |
| 감정 선택 버튼 | 평온, 지침, 불안, 감사, 집중, 회복, 시작 |
| 한 줄 입력창 | 현재 마음 짧게 입력 |
| 호흡 시작 버튼 | 짧은 호흡 루틴 실행 |

### 5.3 호흡 화면
텍스트 단계 + 간단한 카운트다운 (복잡한 애니메이션 없음)
1. 숨 들이쉬기  
2. 잠시 멈추기  
3. 천천히 내쉬기  

### 5.4 결과 카드 화면
| 요소 | 설명 |
|------|------|
| Grug 이미지 | `assets/anchor-grug.png` |
| 날짜 | 체크인 날짜 |
| 시간대 | morning / midday / nap / evening / night |
| 감정 | 선택 감정 |
| 사용자 한 줄 | 입력 문장 |
| Grug 메시지 | 감정·시간대 맞춤 문장 |
| 저장 버튼 | `localStorage` 저장 |

### 5.5 기록 목록 화면
| 요소 | 설명 |
|------|------|
| 카드 리스트 | 저장된 체크인 목록 |
| 정렬 | `createdAt` 내림차순 |
| 카드 삭제 | 선택 카드 삭제 |
| 전체 삭제 | 선택 사항 (초기 보류 가능) |

---

## 6. 시간대 구분 로직

| 시간 | 코드 | 의미 | 안내 방향 |
|------|------|------|-----------|
| 05:00–10:59 | `morning` | 아침 | 오늘 마음 확인 |
| 11:00–13:59 | `midday` | 점심 전후 | 흐름 점검 |
| 14:00–16:59 | `nap` | 낮잠/회복 | 쉬어도 됨 |
| 17:00–20:59 | `evening` | 저녁 | 하루 내려놓기 |
| 21:00–04:59 | `night` | 밤 | 생각 줄이기 |

```js
const timeGuides = {
  morning: "오늘 마음은 어떤가요?",
  midday: "잠깐 숨을 고르고 다시 흐름을 잡아볼까요?",
  nap: "짧게 쉬어도 괜찮아요.",
  evening: "오늘 하루를 천천히 내려놓아 볼까요?",
  night: "잠들기 전 마음을 가볍게 해볼까요?"
};
```

---

## 7. 감정 데이터 구조

```js
const emotions = [
  { id: "calm", label: "평온", description: "마음이 비교적 안정된 상태" },
  { id: "tired", label: "지침", description: "몸과 마음에 피로가 있는 상태" },
  { id: "anxious", label: "불안", description: "생각이 많고 마음이 흔들리는 상태" },
  { id: "grateful", label: "감사", description: "고마움이 느껴지는 상태" },
  { id: "focus", label: "집중", description: "다시 흐름을 잡고 싶은 상태" },
  { id: "recovery", label: "회복", description: "쉬고 다시 일어서고 싶은 상태" },
  { id: "start", label: "시작", description: "작게라도 다시 시작하고 싶은 상태" }
];
```

---

## 8. Grug 메시지 설계

AI API 없이, 감정(·시간대)에 따라 **미리 준비된 문구**를 사용한다.  
말투: 짧고 단순. 전문가 조언이 아니라 **옆에 앉은 동굴 친구**.

```js
const grugMessages = {
  calm: ["좋음. 지금 마음, 그냥 둬도 됨.", "하늘 맑음. Grug 도 조용히 앉음."],
  tired: ["Grug 도 오늘 조금 느림.", "큰 돌 많이 들었음. 잠깐 내려놔도 됨."],
  anxious: ["큰 돌 말고 작은 돌 하나만.", "생각 많음. 숨 하나 먼저."],
  grateful: ["고마운 마음, 작은 불씨 같음.", "Grug 도 고개 끄덕임."],
  focus: ["작은 돌 하나만 들자.", "멀리 말고 바로 앞만 봄."],
  recovery: ["쉬는 것도 동굴 친구의 일.", "잠깐 멈춤. 다시 걸으면 됨."],
  start: ["처음은 작은 발자국이면 됨.", "Grug 도 같이 감."]
};
```

---

## 9. 체크인 카드 데이터 구조

```js
{
  id: "card-20260710-213000",
  date: "2026-07-10",
  timeSlot: "night",
  emotionId: "tired",
  emotionLabel: "지침",
  userMessage: "오늘은 머리가 복잡했다.",
  grugMessage: "큰 돌 많이 들었음. 잠깐 내려놔도 됨.",
  imagePath: "assets/anchor-grug.png",
  createdAt: "2026-07-10T21:30:00.000Z"
}
```

---

## 10. localStorage 저장 명세

```js
const STORAGE_KEY = "my-calm-pixel-grug-cards";

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function loadCards() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function deleteCard(cardId) {
  const cards = loadCards().filter((card) => card.id !== cardId);
  saveCards(cards);
}
```

---

## 11. 주요 함수 명세

| 함수명 | 역할 |
|--------|------|
| `initApp()` | 앱 초기 실행 |
| `getCurrentTimeSlot()` | 현재 시간대 판별 |
| `renderTimeGuide()` | 시간대별 안내 문구 표시 |
| `selectEmotion(emotionId)` | 선택 감정 저장 |
| `startBreathing()` | 호흡 루틴 시작 |
| `updateBreathingStep()` | 호흡 단계 변경 |
| `getGrugMessage(emotionId, timeSlot)` | Grug 메시지 선택 |
| `createCheckInCard()` | 체크인 카드 객체 생성 |
| `saveCard(card)` | 카드 저장 |
| `loadCards()` | 카드 불러오기 |
| `renderCardList()` | 목록 렌더링 |
| `deleteCard(cardId)` | 카드 삭제 |
| `resetCheckIn()` | 체크인 상태 초기화 |
| `showScreen(screenId)` | 화면 전환 |

---

## 12. 파일 구조 (구현 예정)

```
groom_260710_pixel-grug/
├── index.html          # 화면 구조 (미구현)
├── style.css           # UI 스타일 (미구현)
├── script.js           # 동작 로직 (미구현)
├── README.md
├── VISUAL_IDENTITY.md
├── assets/
│   └── anchor-grug.png
└── docs/
    ├── planning.md
    ├── technical-spec.md
    ├── design.md
    ├── mission.md
    ├── requirements.md
    ├── prompts.md
    ├── workflow.md
    ├── roadmap.md
    └── benchmark-calm.md
```

> 현재 SDD 단계: `index.html` / `style.css` / `script.js`는 **아직 생성하지 않음**.

---

## 13. HTML 구조 명세

단일 페이지에서 섹션 전환 (라우터 없음).

```html
<body>
  <main class="app">
    <section id="home-screen" class="screen active"></section>
    <section id="checkin-screen" class="screen"></section>
    <section id="breathing-screen" class="screen"></section>
    <section id="result-screen" class="screen"></section>
    <section id="history-screen" class="screen"></section>
  </main>
</body>
```

---

## 14. CSS 스타일 방향

| 항목 | 방향 |
|------|------|
| 분위기 | 따뜻함, 조용함, 동굴 친구 감성 |
| 색상 | Warm Ivory, Grug Brown, muted earthy tone |
| 형태 | 둥근 카드, 부드러운 버튼 |
| 이미지 | 픽셀 선명도 유지 (`pixelated` / `crisp-edges`) |
| 톤 | 과한 명상 앱보다 **작은 기록장** |

```css
:root {
  --color-bg: #F0EEE6;
  --color-brown: #8B5A3C;
  --color-text: #2F241D;
  --color-card: #FFF8EC;
  --color-muted: #A58A72;
}
```

---

## 15. JavaScript 상태 관리

프레임워크 없이 전역 상태 객체:

```js
const appState = {
  currentScreen: "home",
  timeSlot: null,
  selectedEmotionId: null,
  userMessage: "",
  currentGrugMessage: "",
  cards: []
};
```

---

## 16. 화면 전환 방식

```css
.screen { display: none; }
.screen.active { display: block; }
```

```js
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
  appState.currentScreen = screenId;
}
```

---

## 17. 구현 우선순위

| 단계 | 작업 |
|------|------|
| 1 | 기본 화면: `index.html`, 메인, Grug, 시작 버튼 |
| 2 | 스타일: Warm Ivory, 카드 UI, 픽셀 렌더링 |
| 3 | 시간대 판별·안내 문구 |
| 4 | 감정 선택 |
| 5 | 호흡 루틴 (3단계 + 타이머) |
| 6 | Grug 메시지 |
| 7 | 카드 저장 (`localStorage`) |
| 8 | 기록 목록·삭제 |
| 9 | README 갱신, commit, GitHub Pages (주군 승인 후) |

---

## 18. 테스트 기준

| 테스트 항목 | 기대 결과 |
|-------------|-----------|
| 앱 접속 | 메인 화면 표시 |
| Grug 이미지 | `assets/anchor-grug.png` 표시 |
| 시간대 판별 | 현재 시간 맞는 문구 |
| 감정 선택 | 선택 버튼 활성화 |
| 한 줄 입력 | 결과 카드에 반영 |
| 호흡 루틴 | 3단계 순서 표시 |
| Grug 메시지 | 감정에 맞는 문구 |
| 카드 저장 | `localStorage` 저장 |
| 새로고침 | 카드 유지 |
| 기록 목록 | 최신순 표시 |
| 카드 삭제 | 선택 카드 삭제 |
| 모바일 | 버튼·카드 깨지지 않음 |

---

## 19. 예외 처리

| 상황 | 처리 |
|------|------|
| 감정 미선택 | “지금 마음을 하나 골라주세요.” |
| 한 줄 비어 있음 | 저장 가능, 기본 문구 사용 |
| `localStorage` 오류 | 빈 배열로 초기화 |
| 이미지 로딩 실패 | 대체 텍스트 |
| 카드 없음 | “아직 남긴 마음 카드가 없습니다.” |

---

## 20. 접근성 기준

- 이미지 `alt` 제공
- 버튼에 명확한 텍스트
- 배경·글자 대비 확보
- 키보드 포커스 가능
- 문장 짧고 읽기 쉽게

---

## 21. 제외 범위

- 로그인 / 회원가입 / 서버 DB / 결제 / 구독
- B2B / Health
- 오디오 / Sleep Stories / 셀럽 콘텐츠
- Gemini Nano Banana API / 실시간 이미지 생성 / 감정 분석 AI
- 푸시 알림 / 소셜 로그인

---

## 22. 향후 확장 방향

| 확장 | 설명 |
|------|------|
| 감정별 Grug 이미지 | 감정별 픽셀 캐릭터 |
| 카드 이미지 다운로드 | 카드 이미지 저장 |
| 월간 감정 리포트 | 한 달 흐름 시각화 |
| Gemini Nano Banana API | 문장 기반 픽셀 카드 |
| 모바일 PWA | 홈 화면 설치 |
| 테마팩 / 캐릭터팩 | 테마·친구 캐릭터 |

---

## 23. 완료 기준

- [ ] 앱 접속 가능
- [ ] 시간대 안내 표시
- [ ] 감정 선택·한 줄 입력
- [ ] 짧은 호흡 진행
- [ ] Grug 메시지·픽셀 카드 생성·저장
- [ ] 새로고침 후 유지
- [ ] GitHub Pages 실행 가능

---

## 24. 최종 구현 원칙

작게 만든다.  
짧게 사용하게 한다.  
감정을 고치려 하지 않는다.  
Grug가 대신 판단하지 않는다.  
사용자의 오늘 마음을 작은 카드로 남긴다.
