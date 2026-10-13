export default function Marquee() {
  const items = [
    "정산 자동 수집",
    "실질 마진 계산",
    "광고 비효율 감지",
    "재고 리스크 예측",
    "멀티채널 통합",
    "승인 기반 실행",
    "에이전트 오케스트레이션",
    "Human-in-the-loop",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="py-4 overflow-hidden bg-peach" aria-hidden>
      <div className="marquee-inner">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-ink text-[15px] font-semibold tracking-tight whitespace-nowrap px-6">{item}</span>
            <span className="text-ink/50 text-sm">♥</span>
          </div>
        ))}
      </div>
    </div>
  );
}
