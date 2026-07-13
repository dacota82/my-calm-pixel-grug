# React Migration Result

## Migrated Features

- 홈 화면 (브랜드, 태그라인, Grug 이미지, 시간대 안내, 시작하기, 지난 카드 보기)
- 체크인 화면 (감정 7종, aria-pressed, 한 줄 입력, 미선택 안내, 호흡 시작, 뒤로)
- 짧은 호흡 화면 (3-3-5 × 5회, 회차/단계/남은 초 표시)
- 결과 픽셀 카드 (날짜, 시간대, 감정, 한 줄, Grug 메시지)
- 카드 저장 / 중복 저장 방지 / “카드를 남겼어요.”
- 다시 체크인 / 기록 보기 / 홈으로
- 기록 목록 (최신순, Empty State, 삭제)
- localStorage Key `my-calm-pixel-grug-cards` 호환 저장·복원

## Component Structure

- `HomeScreen`: 홈 진입·시간대 안내·네비게이션
- `CheckInScreen`: 감정/한 줄 입력·호흡 시작 검증
- `EmotionSelector`: 감정 7종 선택 UI
- `BreathingScreen`: 호흡 화면 표시
- `ResultScreen`: 결과 카드·저장/다시/기록
- `PixelCard`: 결과 카드 시각화
- `HistoryScreen`: 기록 목록·삭제·홈 이동
- `useBreathingTimer`: 3-3-5 타이머·정리
- `cardStorage`: load/save/add/delete
- `calmContent`: 고정 문구·감정·시간대·호흡 상수
- `calm` types: ScreenId, TimeSlot, EmotionId, Emotion, BreathStep, CalmCard, DraftCard

## Data Compatibility

- localStorage Key: `my-calm-pixel-grug-cards`
- 기존 Schema 호환 여부: 예 (id, date, timeSlot, emotionId, emotionLabel, userMessage, grugMessage, imagePath, createdAt)
- 기존 데이터 테스트 결과: Playwright headless로 legacy 카드 주입 후 기록 화면 표시·삭제 후 유지 확인 성공

## Visual Compatibility

- 기존 디자인 유지 여부: 예 (`legacy-static/style.css`를 `src/index.css`로 이전)
- 변경된 부분과 변경 이유:
  - `.screen`를 React 조건부 렌더에 맞게 항상 `display: block`로 표시 (active 토글 대신 마운트 전환)
  - Vite Demo CSS/로고 제거 (미사용)
  - Grug 이미지는 `src/assets/anchor-grug.png` import 사용 (루트 `assets/`는 유지)

## Verification

- npm run lint: success (oxlint)
- npm run build: success
- npm run dev: success (`http://127.0.0.1:5173/`)
- Browser: Playwright headless로 시나리오 C/B/A/F/E/D 통과 (pageerror/console error 없음)
- Console: Playwright 수집 기준 오류 없음 (수동 DevTools UI는 Not verified)
- Mobile: Not verified (Responsive Mode 직접 확인 미수행)

## Deferred Features

- BGM
- Loudly API
- Freesound API
- Agent 기능
- Backend / Supabase
- 기타 후속 기능 (Router, Tailwind, Zustand, 결제, 알림 등)

## Open Issues

- Mobile Responsive Mode 직접 육안 확인: Not verified
- React StrictMode 개발 모드에서 effect 재실행으로 호흡 타이머가 한 번 재시작될 수 있음 (프로덕션 빌드에서는 해당 없음)
