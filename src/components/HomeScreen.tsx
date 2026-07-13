import grugImage from "../assets/anchor-grug.png";

type HomeScreenProps = {
  timeGuide: string;
  onStart: () => void;
  onHistory: () => void;
};

export function HomeScreen({ timeGuide, onStart, onHistory }: HomeScreenProps) {
  return (
    <section className="screen active" aria-label="메인">
      <p className="eyebrow">My Calm</p>
      <h1 className="title">Pixel Grug</h1>
      <p className="tagline">오늘의 마음을 1분 안에 픽셀 카드로 남기는 앱</p>
      <img
        className="pixel-image grug-hero"
        src={grugImage}
        alt="Pixel Grug 동굴 친구 마스코트"
        width={220}
        height={220}
      />
      <p className="time-guide" aria-live="polite">
        {timeGuide}
      </p>
      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onStart}>
          시작하기
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHistory}>
          지난 카드 보기
        </button>
      </div>
    </section>
  );
}
