# Prompts

## 프롬프트 사용 원칙
- Pinterest 등은 **무드보드 참고만**. 다운로드·복제 금지
- 특정 작가·게임·IP 스타일 직접 모방 금지
- 여러 픽셀 이미지의 **일반적 특징만** 추출해 Pixel Grug 독자 기준으로 생성
- 이미지 안 **글자·로고·워터마크 금지**
- 주군 승인 전에는 기준 이미지 외 추가 생성 금지

## Anchor 생성 프롬프트 (확정본)
사용 결과: `assets/anchor-grug.png` (승인됨)

```
subject: a cute tiny cave-friend mascot character for Pixel Grug
style: 16-bit pixel art, cozy retro RPG aesthetic
mood: warm, simple, friendly, comforting
character: small round body, big gentle eyes, soft smile, primitive cave-inspired outfit
color palette: Grug Brown #8B5A3C, warm ivory #F0EEE6, muted earthy tones
composition: centered full-body character, front-facing
background: plain warm ivory cream background
details: crisp pixel edges, simple silhouette, readable at small thumbnail size
aspect ratio: 1:1
no text, no logo, no watermark
filename: assets/anchor-grug.png
```

참고한 일반 특징: 작은 정사각 썸네일, 단순 실루엣, 큰 눈·작은 몸, 따뜻한 earth tone, 16-bit retro RPG, 단순한 배경, 작은 화면에서도 식별 가능.

## 이미지 생성 금지 원칙
1. anchor 승인 전 추가 이미지 생성 금지
2. 감정·로고·배경·소품은 **주군 승인 전 생성 금지**
3. 기존 이미지를 프로젝트에 다운로드해 넣지 않음
4. 특정 이미지와 동일한 캐릭터·구도·색 조합 재현 금지
5. 한 번에 여러 장 대량 생성하지 않음 — 기준 → 승인 → 확장

## 향후 감정 캐릭터 생성 템플릿 (미사용)
> 주군 승인 후에만 사용. 썸네일 가독성을 위해 **디테일 단순화**.

```
subject: Pixel Grug mascot, same character as assets/anchor-grug.png
style: 16-bit pixel art, cozy retro RPG, simplified details for small thumbnail
emotion: {기쁨 | 생각 | 성공}  ← 하나만
mood: warm, friendly, readable silhouette
character: small round body, big eyes, simple expression matching emotion
color palette: Grug Brown #8B5A3C, warm ivory #F0EEE6, muted earthy tones
composition: centered bust or full-body, front-facing
background: plain warm ivory cream
no text, no logo, no watermark
keep outfit simpler than anchor if needed for clarity
```

## 변경 이력
| 날짜 | 내용 |
|------|------|
| 2026-07-10 | Anchor 프롬프트 확정·이미지 승인 |
| 2026-07-10 | 금지 원칙·감정 템플릿 초안 기록 |
