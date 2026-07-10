# Benchmark: Calm → Pixel Grug

## 1. 조사 개요

| 항목 | 내용 |
|------|------|
| 목적 | Calm을 벤치마킹해 Pixel Grug의 **기능 기획·사업화 시사점** 도출 |
| 방식 | **공식 출처 우선** 조사 (복제 설계 아님) |
| 적용 원칙 | Calm 기능을 그대로 옮기지 않고, Pixel Grug에 맞는 최소 시사점만 추출 |
| 현재 Pixel Grug 자산 | `assets/anchor-grug.png` 1장 (1차 기준 이미지) |
| 이번 범위 | `docs/benchmark-calm.md`만 · 이미지 생성·앱 구현·commit·push **하지 않음** |
| 조사일 | 2026-07-10 |

### 출처 우선순위
1. [calm.com](https://www.calm.com/)
2. [health.calm.com](https://health.calm.com/)
3. [App Store — Calm](https://apps.apple.com/us/app/calm/id571800810)
4. [Google Play — Calm](https://play.google.com/store/apps/details?id=com.calm.android)
5. [Calm Support (Help Center)](https://support.calm.com/)

> 블로그·리서치 리포트 등 2차 자료는 본 문서의 수치·사업모델 근거로 사용하지 않음.

### 조사 체크리스트
- [x] 공식 사이트·스토어·Support로 기능·구독 구조 확인
- [x] Calm Health / Organizations 공식 페이지 확인
- [x] 수치·가격에 출처 병기
- [x] Pixel Grug 적용 시사점·차별화 도출
- [x] Business Model Canvas 9블록 정리
- [x] 강사 BMC 자료 기반 추가 인사이트·차용/버릴 것 정리
- [ ] 시사점을 `docs/requirements.md`에 반영 (다음 액션)
- [ ] MVP 기능 범위 확정 (다음 액션)

---

## 2. Calm 앱 개요

공식 포지션: **수면·명상·이완을 돕는 멘탈 헬스/웰니스 앱**.  
홈페이지는 “Stress less / Sleep more / Live mindfully”로 니즈를 나눈다.  
([calm.com](https://www.calm.com/))

| 구분 | 공식 요약 | 출처 |
|------|-----------|------|
| 정체성 | “#1 mental health app” — 스트레스 관리, 수면, 더 건강한 삶 | [calm.com FAQ](https://www.calm.com/) |
| 핵심 도구 | 가이드 명상, Sleep Stories®, 사운드스케이프, 호흡(Breathe Bubble 등), Daily 세션 | [calm.com](https://www.calm.com/), [App Store](https://apps.apple.com/us/app/calm/id571800810) |
| 시작 추천 | 명상 입문: *7 Days of Calm* → *21 Days of Calm* / 수면: Fall Asleep 컬렉션·Sleep Stories | [calm.com FAQ](https://www.calm.com/) |
| 평점(참고) | App Store 약 **4.8 / 2M+ ratings** · Google Play 약 **4.5 / 50M+ downloads** | [App Store](https://apps.apple.com/us/app/calm/id571800810), [Google Play](https://play.google.com/store/apps/details?id=com.calm.android) |
| Pixel Grug와의 거리 | Calm = 대규모 콘텐츠·구독 플랫폼 / Pixel Grug = 픽셀 캐릭터 중심의 **작은 따뜻한 앱** | — |

> 교육용 메모: Calm은 기능을 나열하기보다 **사용자 상태(스트레스·수면·마음챙김)** 로 진입점을 만든다. Pixel Grug도 동일하게 “상태 → 짧은 루틴”으로 기획하는 편이 낫다.

---

## 3. 주요 기능 분석

### 3.1 명상
| 항목 | Calm (공식) | 출처 | Pixel Grug 시사점 |
|------|-------------|------|-------------------|
| 형태 | 경험 수준별 가이드 명상, 주제(불안·스트레스·집중 등) | [App Store](https://apps.apple.com/us/app/calm/id571800810) | 초보용 **초단 세션** 1개부터 |
| 입문 | *7 Days of Calm*, *21 Days of Calm* | [calm.com FAQ](https://www.calm.com/) | “첫 성공” 프로그램 아이디어만 차용 (일수·콘텐츠 복제 X) |
| 무료 | 타이머 명상, 다일 프로그램의 **Day 1** | [Support — Free content](https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App) | 무료로도 “한 번 해보기”가 가능하게 |

### 3.2 수면
| 항목 | Calm (공식) | 출처 | Pixel Grug 시사점 |
|------|-------------|------|-------------------|
| Sleep Stories® | 성인·아동용 취침 스토리. 홈페이지는 **500+**, Support Premium 표는 **300+**로 표기(시점·문서 차이 가능) | [calm.com FAQ](https://www.calm.com/), [Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits) | **대량 스토리 제작은 비현실적** → 수면은 테마만 |
| 기타 | Sleep Music, soundscapes, sleep meditations, Sleep Check-In | [calm.com FAQ](https://www.calm.com/) | MVP에서는 짧은 이완 루틴으로 대체 |
| 무료 | 대표 스토리 *Blue Gold* 등 일부 | [Support — Free content](https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App) | “맛보기 1개” 구조만 참고 |

### 3.3 호흡
| 항목 | Calm (공식) | 출처 | Pixel Grug 시사점 |
|------|-------------|------|-------------------|
| 즉시 진정 | **60-second Breathe Bubble** — 급성 스트레스·불안에 즉시 사용 | [calm.com FAQ](https://www.calm.com/) | **MVP 1순위 후보** (짧고 시각적) |
| 무료 | 가이드 Breathing Exercise **1종** | [Support — Free content](https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App) | 핵심 루틴 1개를 무료로 완성도 있게 |
| Wear | Wear OS에서 호흡 빠른 시작 등 | [Google Play](https://play.google.com/store/apps/details?id=com.calm.android) | 초기엔 웹만으로 충분 |

### 3.4 음악
| 항목 | Calm (공식) | 출처 | Pixel Grug 시사점 |
|------|-------------|------|-------------------|
| 형태 | Focus / relax / sleep용 음악·사운드스케이프 | [calm.com FAQ](https://www.calm.com/), [App Store](https://apps.apple.com/us/app/calm/id571800810) | 자체 OST 대량 제작 부담 → 후순위 |
| Free vs Premium | Free: 제한 트랙·무료 Scenes / Premium: 전체 라이브러리 | [Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits), [Support — Free](https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App) | 초기엔 무음+비주얼 또는 단일 루프 |

### 3.5 Daily 콘텐츠
| 항목 | Calm (공식) | 출처 | Pixel Grug 시사점 |
|------|-------------|------|-------------------|
| Calm Dailies | 매일 약 **10분** 분량의 새 세션 (Daily Calm, Daily Jay, Daily Trip, Daily Move) | [Support — Dailies](https://support.calm.com/hc/en-us/articles/115005140414-What-are-the-Calm-Dailies-Daily-Meditations-Movement) | “매일 신규 오디오” 대신 **매일 같은 Grug 체크인** |
| 구독 | Dailies는 **Calm Premium 필요** | 동일 | 습관 루프는 배우되, 콘텐츠 생산 모델은 복제하지 않음 |
| 습관 | Streak, Mindful Minutes, 리마인더 | [Support — Dailies](https://support.calm.com/hc/en-us/articles/115005140414-What-are-the-Calm-Dailies-Daily-Meditations-Movement), [App Store](https://apps.apple.com/us/app/calm/id571800810) | streak/체크인 아이디어만 가볍게 |

### 3.6 멀티 디바이스
| 항목 | Calm (공식) | 출처 | Pixel Grug 시사점 |
|------|-------------|------|-------------------|
| 지원 | iOS, Android, Web + Apple TV, Apple Watch, Google WearOS, Samsung Health | [calm.com FAQ](https://www.calm.com/) | 초기 **웹 1곳** |
| Premium 이동 | 동일 계정으로 iOS / Android / Web | [Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits) | 계정·동기화는 후순위 |

### 기능 우선순위 체크리스트 (Pixel Grug용)
- [ ] 호흡 가이드 (짧고 시각적) — MVP 후보 ← Calm의 “즉시 진정” 구조만 참고
- [ ] Grug 체크인 / Daily 루틴 (콘텐츠 양 최소)
- [ ] 초단 이완·집중 세션 (명상 라이트)
- [ ] 수면 테마 (스토리 대량 X)
- [ ] 음악 라이브러리 (후순위)
- [ ] 멀티 디바이스 동기화 (후순위)

---

## 4. 사업 모델 분석

### 4.1 B2C 구독 모델
| 항목 | 공식 내용 | 출처 | Pixel Grug 시사점 |
|------|-----------|------|-------------------|
| 구조 | 앱 다운로드는 무료. 일부 콘텐츠 무료, 전체 라이브러리는 **유료 구독(Premium)** | [Google Play](https://play.google.com/store/apps/details?id=com.calm.android), [Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits) | 초기엔 **무료 MVP**로 루틴·캐릭터 검증 |
| 체험 | Free trial(예: 7일)로 Premium 전체 이용 가능 | [Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits) | 체험보다 “핵심 1루틴 무료 완성”이 소규모에 맞음 |
| 가격(App Store 고지) | 월 **$14.99**, 연 **$69.99**, Lifetime **$399.99** (자동갱신 구독 조건 문구) | [App Store — Calm](https://apps.apple.com/us/app/calm/id571800810) | 가격 경쟁 금지. 가치 = “Grug와 하는 짧은 의식” |
| 스토어 IAP 표기 | Premium 관련 인앱 상품이 여러 가격대($14.99~$79.99 등)로 노출 — **지역·프로모·플랜에 따라 변동** | [App Store](https://apps.apple.com/us/app/calm/id571800810) | 교육용 참고치. 최신 요금은 스토어에서 재확인 |

### 4.2 프리미엄 콘텐츠 구조
| Free (공식) | Premium (공식) | 출처 |
|-------------|----------------|------|
| 타이머 명상, 프로그램 Day 1, 호흡 1종, Sleep Story 일부(*Blue Gold*), 무료 Scenes | 전체 라이브러리 잠금 해제: Daily Calm, Sleep Stories 전체, 음악 전체, Masterclasses, Daily Move 등 | [Support — Free](https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App), [Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits) |

**Premium 접근 경로(공식):** 개인 구독(웹/Apple/Google) · 무료 체험 · **Employer Benefit(Calm Business)** · 파트너십 · Family Plan · Lifetime  
([Support — Premium](https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits))

| Calm의 해자 | Pixel Grug에 맞는 해석 |
|-------------|------------------------|
| 거대한 오디오 라이브러리 + 셀럽 내레이션 | 해자 = **캐릭터 IP·톤·단순 UX** (`anchor-grug.png` 기준) |
| Free는 맛보기, Premium이 본체 | 소규모는 **핵심 루틴 1~2개를 무료로 깊게** |

### 4.3 B2B / Calm Health 확장
| 축 | 공식 내용 | 출처 | Pixel Grug |
|----|-----------|------|------------|
| Calm for Organizations | 직원 **5–300**명 셀프 구매, 연간 선결제. 인원 많을수록 할인. **301+**는 세일즈 | [Support — Purchase for org](https://support.calm.com/hc/en-us/articles/360008713153-How-to-purchase-Calm-for-your-organization), [health.calm.com/calm-for-organizations](https://health.calm.com/calm-for-organizations/) | 초기 범위 밖. “팀 호흡 브레이크” 아이디어만 메모 |
| 조직 요금(공개 체크아웃) | Individual **/ year $70.00** 표시 (인원 슬라이더·할인 적용) | [Calm for Organizations](https://health.calm.com/calm-for-organizations/) | 구조 참고용. 실제 견적은 인원·시점에 따라 다름 |
| 조직 혜택 | Premium과 동일 인앱 경험 + Partner Portal·참여 리소스·라이선스당 가족/친구 최대 5명 등 | [Calm for Organizations](https://health.calm.com/calm-for-organizations/) | — |
| Calm Health | 고용주·헬스플랜·컨설턴트용. 임상 프로그램, 스크리닝, 맞춤 액션 플랜, 데이터 인사이트 | [health.calm.com](https://health.calm.com/) | **초기 범위 밖** (의료·규제) |
| Calm Health 공개 지표 | 등록자 중 임상 프로그램 참여 **38%**, 스크리닝 완료 **77%**, 중등도 이상 불안/우울 스크리닝 후 치료 참여 **37%*** (*national payer 결과) | [health.calm.com](https://health.calm.com/) | 벤치마크 수치로만 기록. Pixel Grug에 수치 목표로 쓰지 않음 |

### 사업 단계 체크리스트
- [ ] Phase 0: 캐릭터·톤·단일 루틴 검증 (현재: `assets/anchor-grug.png`만)
- [ ] Phase 1: 무료 웹 MVP
- [ ] Phase 2: 유료화 가설(구독 vs 일회성 vs 후원) 선택
- [ ] Phase 3: (선택) 소규모 B2B — Calm Health급 임상 확장은 보류

## Business Model Canvas 분석

Business Model Canvas(BMC) 9블록으로 Calm을 읽고, Pixel Grug가 **작게 차용할 구조만** 남긴다.  
초기 MVP 방향: **짧은 호흡 · Grug 체크인 · 픽셀 카드 기록**.  
현재 에셋: `assets/anchor-grug.png` 하나.

| BMC 블록 | Calm 분석 | Pixel Grug 적용 시사점 |
|----------|-----------|------------------------|
| **Customer Segments** | B2C: 수면·스트레스/불안·명상 초보·집중 니즈 사용자. B2B: 기업·헬스플랜(Organizations / Health) | 초기 타겟 = **명상 초보 + 짧은 진정이 필요한 사람**. 기업/Health는 **초기 범위 밖** |
| **Value Propositions** | “Stress less / Sleep more / Live mindfully” + 대규모 가이드 콘텐츠·즉시 호흡 도구 | 가치 = **동굴 친구 Grug와 하는 1분 의식**. 제안 3종만: 짧은 호흡 / Grug 체크인 / 픽셀 카드 기록 |
| **Channels** | App Store·Google Play·Web·웨어러블·기업 포털·헬스 채널 | 초기 채널 = **웹 1곳**. 스토어·웨어러블·B2B 채널은 후순위 |
| **Customer Relationships** | Daily 세션·streak·리마인더·Premium 라이브러리로 습관·재방문 | Daily **신규 오디오 제작은 초기 범위 밖**. 관계는 **Grug 체크인 + 픽셀 카드 기록**으로 가볍게 |
| **Revenue Streams** | B2C Premium 구독(월/연/Lifetime)·Family·조직 연간 좌석·Calm Health | **복잡한 구독 모델은 초기 범위 밖**. Phase 0~1은 무료 검증. 유료화는 루틴 사랑 이후 |
| **Key Resources** | 콘텐츠 라이브러리·브랜드·셀럽/전문가·플랫폼·B2B 계약 | 핵심 자원 = **`anchor-grug.png` + 시각 정체성 문서 + 단순 웹 루틴**. 대량 Sleep Stories는 **초기 범위 밖** |
| **Key Activities** | 콘텐츠 제작·큐레이션·구독 전환·조직 세일즈·임상 프로그램 운영 | 핵심 활동 = **호흡 UX / 체크인 / 카드 기록** 설계·검증. 매일 신규 오디오·B2B 영업은 하지 않음 |
| **Key Partners** | 앱스토어·셀럽/크리에이터·고용주·보험·헬스케어 파트너 | 초기 파트너 최소(호스팅·학습용 Git 정도). 셀럽·보험·임상 파트너는 **초기 범위 밖** |
| **Cost Structure** | 콘텐츠 제작비·라이선스·플랫폼·마케팅·B2B/Health 운영 | 비용을 **작게**: 문서·1앵커·단순 프론트. 콘텐츠 공장·구독 인프라·Health 운영비 회피 |

### BMC에서 명시하는 초기 범위 밖
| 항목 | 이유 |
|------|------|
| 대량 Sleep Stories 제작 | 콘텐츠 군비경쟁 · 소규모 비현실 |
| Daily 신규 오디오 콘텐츠 제작 | 매일 생산 비용 · MVP와 무관 |
| 초기 B2B / Health 사업 | 세일즈·규제·신뢰 비용 |
| 복잡한 구독 모델 | 검증 전 수익화 복잡도 |

### BMC → MVP 연결 체크리스트
- [ ] Value: 짧은 호흡 세션 1개
- [ ] Relationship: Grug 체크인 1회 흐름
- [ ] Relationship/Resource: 픽셀 카드 기록(오늘 상태·완료 표시)
- [ ] Channel: 웹 단일 진입
- [ ] Revenue: 당분간 무료 (구독 설계 보류)
- [ ] Resource: `assets/anchor-grug.png`만 사용 (추가 에셋은 승인 후)

## 강사 자료 기반 추가 인사이트

참고: `calm_business_model_canvas by Jun.md` (강사 제공 BMC 자료, 2026-07 기준).  
자료 내 매출·구독자·밸류에이션 등 **수치성 정보는 추정치가 포함**될 수 있어 `[추정]` / `[확인 필요]`로 표시한다.  
목적은 Calm 복제가 아니라, **작게 가져갈 전략만 선별**하는 것이다.

### 확장 경로 (세그먼트)
Calm은 **B2C 일반 소비자**에서 시작해 **B2C2B 기업복지**, **B2B2C 헬스케어**, **키즈/패밀리**로 확장한 구조를 가진다.  
(강사 자료 §1 Customer Segments)

| 단계 | Calm 구조 | Pixel Grug |
|------|-----------|------------|
| 1 | B2C 개인 구독으로 시작 | **지금 여기** — 개인·짧은 루틴만 |
| 2 | B2C2B 기업 복지 | 장기 가능성만 · **초기 범위 밖** |
| 3 | B2B2C Health | 장기 가능성만 · **초기 범위 밖** |
| 4 | Kids / Family | 초기 범위 밖 |

강사 자료의 규모 수치 예: B2B 조직 **4,000개 이상** `[추정/확인 필요]`, Calm Health 커버리지 **3,900만+** `[추정/확인 필요]`.  
→ Pixel Grug는 규모를 목표로 두지 않고, “B2C로 검증 후 채널 확장”이라는 **경로 아이디어만** 장기 메모한다.

### 가치 제안 = 결과 중심
Calm의 핵심은 단순 명상 기능이 아니라  
**“Sleep more. Stress less. Live better.”** 처럼 **사용자가 얻는 결과**를 파는 것이다.  
(강사 자료 §2 Value Propositions · 공식 톤과 동일 계열)

| Calm | Pixel Grug |
|------|------------|
| 결과: 더 자고, 덜 스트레스, 더 잘 살기 | 결과: **1분 만에 숨이 고르고, 오늘을 기록했다** |
| 수단: 대규모 라이브러리 | 수단: 짧은 호흡 + Grug 체크인 + 픽셀 카드 기록 |

### 해자 (Moat)
강사 자료 관점: Calm의 해자는 **기술 자체보다**  
**콘텐츠 IP · 습관 설계 · 브랜드 신뢰 · B2B 채널**에 있다.

| Calm 해자 | Pixel Grug가 작게 가져갈 해자 |
|-----------|-------------------------------|
| Sleep Stories·셀럽 IP | **Grug 캐릭터 IP** (`assets/anchor-grug.png` 기준) |
| Daily·프로그램형 습관 | **체크인 + 픽셀 카드**로 쌓이는 **감정/루틴 기록 데이터** |
| 카테고리 브랜드 | 작은 팬덤·따뜻한 톤 (규모 경쟁 X) |
| B2B 채널 | **초기 제외** · 장기 가능성만 |

> 바이브코딩 시대에는 기능 복제가 쉬우므로, **캐릭터 + 사용자 감정 기록**이 장기 해자 후보가 된다.

### 수익원 (다층 구조)
강사 자료 §5: Calm 수익은 대략 다음 층으로 다층화되어 있다.

1. 개인 구독 (핵심)
2. B2B 라이선스 (기업 복지)
3. 헬스케어 B2B2C (Calm Health)
4. 브랜드 파트너십 / 콘텐츠 라이선싱

참고 수치(강사 자료 · 비상장 추정 포함):  
유료 구독자 약 **350만~450만** `[추정]` · 2024~2025 매출 약 **2.1억~2.3억 달러** `[추정]` · 밸류에이션 **20억 달러**(2020 시리즈 C 기준) `[확인 필요]` · 2025 매출 전년 대비 하락 언급 `[추정]`.

**Pixel Grug:** 초기 수익모델은 **만들지 않거나 후순위**. 복잡한 구독·B2B/Health 수익은 **초기 범위 밖**.

### 비용 구조
강사 자료 §9 기준 Calm의 주요 비용:

| 비용 | 의미 | Pixel Grug |
|------|------|------------|
| 콘텐츠 제작·라이선싱 | 셀럽·IP 비용이 큼 | **회피** — 대량/셀럽 콘텐츠 안 함 |
| 고객획득비(CAC) | 마케팅 비중 | 초기엔 교육·바이브코딩 채널 수준 |
| B2B 영업비 | 엔터프라이즈 조직 | **초기 범위 밖** |
| 신사업 확장 비용 | Sleep 앱·리테일 등 | **초기 범위 밖** |

### Pixel Grug 적용 시사점 (강사 자료 반영)
- Calm처럼 **대형 콘텐츠 도서관**을 만들지 않는다.
- 초기 MVP는 **짧은 호흡 + Grug 체크인 + 픽셀 카드 기록**으로 유지한다.
- 초기 수익모델은 **만들지 않거나 후순위**로 둔다.
- **Grug 캐릭터**와 **사용자의 감정 기록 데이터**가 장기 해자가 될 수 있음을 명시한다.
- **B2B/Health** 확장은 장기 가능성으로만 두고, **초기 범위에서는 제외**한다.
- 현재 기준 에셋은 **`assets/anchor-grug.png` 하나**만 유지한다.

## Calm에서 차용할 것 / 버릴 것

| 구분 | Calm의 전략 | Pixel Grug 적용 판단 | 적용 이유 |
|------|-------------|----------------------|-----------|
| 차용 | Daily 루틴 (매일 접속 이유) | **차용 (가볍게)** | 신규 오디오 없이 Grug 체크인으로 매일 루프 |
| 차용 | 즉각 개입 기능 (예: 60초 호흡) | **차용** | MVP 핵심 = 짧은 호흡 |
| 차용 | 습관 설계 (온보딩·streak·리추얼) | **차용 (최소)** | 체크인 + 픽셀 카드로 “했다” 기록 |
| 차용 | 콘텐츠/캐릭터 자산화 | **차용** | Grug IP + 감정 기록이 장기 해자 후보 |
| 버림 | 대량 Sleep Stories 제작 | **버림** | 콘텐츠 군비 · 소규모 비현실 |
| 버림 | 셀럽 콘텐츠 | **버림** | 라이선스·비용 · Pixel Grug 톤과 불일치 |
| 버림 | 복잡한 구독 모델 | **버림 (초기)** | 검증 전 수익화 복잡도 |
| 버림 | 초기 B2B/Health 확장 | **버림 (초기)** | 세일즈·규제 비용 · 장기만 메모 |
| 버림 | 대규모 오디오 라이브러리 | **버림** | 도서관 경쟁 금지 · 소수 루틴만 |

### MVP 결론 (한 줄)
**Pixel Grug MVP = 짧은 호흡 + Grug 체크인 + 픽셀 카드 기록** (`assets/anchor-grug.png` 기준).  
도서관·구독·B2B/Health는 지금 만들지 않는다.

---

## 5. 타겟 고객

Calm 공식 메시지 축: **스트레스·불안 완화 / 수면 / 마음챙김·일상 회복력**  
([calm.com](https://www.calm.com/), [App Store](https://apps.apple.com/us/app/calm/id571800810))

| 타겟 | Calm의 공식 대응 예 | 출처 | Pixel Grug 적합도 |
|------|---------------------|------|-------------------|
| 수면 문제 사용자 | Sleep Stories, Sleep Music, Fall Asleep 컬렉션 | [calm.com FAQ](https://www.calm.com/) | 중 — 테마 가능, 콘텐츠 양 부담 |
| 스트레스/불안 사용자 | Breathe Bubble, Reduce Stress & Anxiety, Panic SOS 등 | [calm.com FAQ](https://www.calm.com/) | **높음** — 호흡+Grug |
| 명상 초보자 | 7/21 Days of Calm, 레벨별 명상 | [calm.com FAQ](https://www.calm.com/), [App Store](https://apps.apple.com/us/app/calm/id571800810) | **높음** — 캐릭터가 길잡이 |
| 집중이 필요한 사용자 | Focus 주제 명상·음악 | [App Store](https://apps.apple.com/us/app/calm/id571800810) | 중 — 단순 타이머+톤 |
| 기업/조직 | Calm for Organizations, Calm Health | [Organizations](https://health.calm.com/calm-for-organizations/), [Calm Health](https://health.calm.com/) | 낮음(초기) |

### 초기 타겟 제안 (Pixel Grug)
1. **명상 초보자** + **짧은 진정이 필요한 스트레스/불안 사용자**
2. “웰니스 앱이 너무 진지·무거워 부담”인 사람 → 픽셀·따뜻함으로 차별

---

## 6. Calm의 강점

| 강점 | 근거(공식) | 배울 점 | 따라 하지 말 점 |
|------|------------|---------|-----------------|
| 상태 기반 진입 | Stress / Sleep / Mindful | 상태 → 짧은 루틴 IA | 동일 카피·IA 복제 |
| 즉시 완화 도구 | 60초 Breathe Bubble | MVP에 “즉시 1분” | UI/이름 복제 |
| 습관 루프 | Dailies + Streak | 체크인·리마인더 아이디어 | 매일 신규 10분 콘텐츠 생산 |
| Free/Premium 분리 | Support 비교표 | 맛보기 vs 본체 구조 | 라이브러리 규모 경쟁 |
| 멀티 채널 수익 | B2C 구독 + Organizations + Health | 장기 확장 맵 | 초기에 B2B/임상 진입 |
| 브랜드·규모 | 스토어 평점·다운로드 규모 | 신뢰의 중요성 | 규모 따라 하기 |

---

## 7. Pixel Grug에 적용할 시사점

| # | 시사점 | 구체 적용 | Calm에서 배운 것 / 버린 것 |
|---|--------|-----------|---------------------------|
| 1 | 상태 기반으로 묶는다 | 진정하기 / 숨 고르기 / 오늘 체크인 | 배움: IA · 버림: 카테고리 전체 복제 |
| 2 | 첫 성공을 아주 짧게 | 60~180초 | 배움: Breathe Bubble 길이감 · 버림: 동일 UX |
| 3 | Daily = 루프이지 공장 아님 | Grug 인사 + 행동 1개 | 배움: streak · 버림: 매일 신규 오디오 |
| 4 | 호흡은 MVP 적합 | 시각 리듬 + 캐릭터 | 배움: 즉시성 · 에셋 확장은 승인 후 |
| 5 | 구독은 나중 | 먼저 사랑받을 루틴 1개 | 배움: Free/Paid 분리 · 버림: 조기 유료화 |
| 6 | Health/임상은 보류 | 규제·신뢰 비용 | 배움: B2B는 장기 옵션 |
| 7 | 문서와 실제 파일 일치 | 현재 에셋은 anchor 1장만 | — |

### 적용 체크리스트
- [ ] `requirements.md`에 MVP 후보(호흡·체크인) 반영
- [ ] “하지 않을 것”(Sleep Stories 대량, Calm UI 복제) 명시
- [ ] 감정·로고·배경은 `workflow.md` 승인 게이트 준수
- [ ] 사업은 Phase 0~1만 단기 목표

---

## 8. Pixel Grug와 Calm의 차별화 방향

| 축 | Calm | Pixel Grug |
|----|------|------------|
| 비주얼 | 실사·차분한 프리미엄 웰니스 | **픽셀·동굴 친구 Grug** (`assets/anchor-grug.png`) |
| 콘텐츠 | 대규모 오디오 라이브러리 | **소수 루틴 + 캐릭터 연출** |
| 톤 | 고요·세련 | 투박하지만 따뜻, cozy retro |
| 수익 | Premium 구독 + Org + Health | 초기 무료 검증 → 이후 가설 |
| 해자 | 콘텐츠·브랜드·B2B | 캐릭터 IP·단순함·바이브코딩 스토리 |
| 초기 범위 | 올인원 | **호흡 + 체크인** |

> 한 줄 차별화:  
> **Calm이 “웰니스 도서관”이라면, Pixel Grug는 “동굴 친구와 하는 1분 의식”이다.**

---

## 9. 다음 액션

| 순서 | 액션 | 상태 |
|------|------|------|
| 1 | 본 문서 주군 리뷰 | 대기 |
| 2 | 시사점을 `docs/requirements.md` / `docs/mission.md`에 반영 | 미착수 |
| 3 | MVP 기능 1~2개 확정 (호흡·체크인 후보) | 미착수 |
| 4 | 화면 구조 초안 — **구현은 승인 후** | 미착수 |
| 5 | 감정·로고·배경 에셋 — **승인 전 생성 금지** | 보류 |
| 6 | commit / push — **주군 승인 후** | 보류 |

### 하지 않을 것 (이번 전투)
- [x] Calm UI·콘텐츠 복제 설계
- [x] 감정별 이미지 생성
- [x] 앱 구현·배포
- [x] commit / push

---

## 부록 A. 공식 출처 목록

| # | 출처 | URL | 사용한 내용 |
|---|------|-----|-------------|
| 1 | Calm 공식 홈·FAQ | https://www.calm.com/ | 포지션, Sleep Stories 500+, Breathe Bubble, 디바이스, 입문 프로그램 |
| 2 | Calm Health | https://health.calm.com/ | B2B2C 임상·스크리닝·공개 참여 지표 |
| 3 | Calm for Organizations | https://health.calm.com/calm-for-organizations/ | 5–300 셀프구매, $70/year 표시, Partner Portal |
| 4 | App Store | https://apps.apple.com/us/app/calm/id571800810 | 기능 목록, 구독 가격 고지($14.99/$69.99/$399.99), 평점 |
| 5 | Google Play | https://play.google.com/store/apps/details?id=com.calm.android | 기능·무료/유료 안내, 다운로드·평점 규모 |
| 6 | Support — Premium vs Free | https://support.calm.com/hc/en-us/articles/360008536834-Calm-Premium-vs-Free-Features-Content-List-Benefits | Free/Premium 표, Premium 경로(Business 포함) |
| 7 | Support — Free content | https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App | 무료 콘텐츠 범위 |
| 8 | Support — Dailies | https://support.calm.com/hc/en-us/articles/115005140414-What-are-the-Calm-Dailies-Daily-Meditations-Movement | Daily 세션·Premium 요건·streak |
| 9 | Support — Org purchase | https://support.calm.com/hc/en-us/articles/360008713153-How-to-purchase-Calm-for-your-organization | 5–300 / 301+ 구매 경로 |

## 부록 B. 현재 Pixel Grug 에셋 상태

| 파일 | 상태 |
|------|------|
| `assets/anchor-grug.png` | 존재 · 1차 기준 · 승인됨 |
| 감정 캐릭터 / 로고 / 배경 / 소품 | **예정만** · 미생성 |
