/** Seconds each agent holds the stage, and how much of that is spent "working" before the result. */
export const STEP_SECONDS = 4.8;
export const WORK_SECONDS = 2.2;

export interface AgentLine {
  /** Shown while the agent is working, e.g. "납기 현황을 읽는 중". */
  readonly working: string;
  /** Shown once it has a result. */
  readonly result: string;
  /** When set, the result is a question and this is the human's approving answer. */
  readonly approve?: string;
}

/** One line per entry in AGENT_SHAPES, same order. Illustrative demo copy, not live data. */
export const AGENT_LINES: readonly AgentLine[] = [
  { working: "협력사 포털에서 납기 현황을 읽는 중", result: "납기 지연 3건, 메일로 보낼까요?", approve: "네, 보내 줘" },
  { working: "10월 영업 실적을 정리하는 중", result: "보고서를 PowerPoint와 Excel로 저장했어요" },
  { working: "휴대폰에서 받은 지시를 PC로 전달하는 중", result: "사무실 PC에서 작업을 시작했어요" },
  { working: "마켓별 정산 내역을 모으는 중", result: "정산 내역 4곳을 한 표로 합쳤어요" },
  { working: "상품별 실질 마진을 계산하는 중", result: "마진이 낮은 상품 5개를 찾았어요" },
  { working: "광고 지출 효율을 점검하는 중", result: "효율이 떨어진 캠페인을 멈출까요?", approve: "네, 멈춰 줘" },
  { working: "재고 수량을 확인하는 중", result: "품절이 임박한 상품 2개를 알렸어요" },
  { working: "에이전트 작업을 나누는 중", result: "3개 작업을 순서대로 배정했어요" },
];

/** The order agents take the stage, interleaved so the three products alternate. */
const ORDER: readonly number[] = [0, 3, 1, 5, 2, 4, 6, 7];

export type Stage = "working" | "result";

export interface ScriptPoint {
  /** Counts up forever; changes whenever the message should change. */
  readonly step: number;
  /** Index into AGENT_SHAPES / AGENT_LINES. */
  readonly agent: number;
  readonly stage: Stage;
  /** Seconds since this stage began. */
  readonly elapsed: number;
  /** 0..1 progress through this stage. */
  readonly progress: number;
}

/** What the demo is doing at a given time. Pure, so canvas and DOM stay in sync from one clock. */
export function scriptAt(time: number): ScriptPoint {
  const step = Math.floor(time / STEP_SECONDS);
  const local = time - step * STEP_SECONDS;
  const agent = ORDER[step % ORDER.length];
  if (local < WORK_SECONDS) return { step, agent, stage: "working", elapsed: local, progress: local / WORK_SECONDS };
  const elapsed = local - WORK_SECONDS;
  return { step, agent, stage: "result", elapsed, progress: elapsed / (STEP_SECONDS - WORK_SECONDS) };
}
