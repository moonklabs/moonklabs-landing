/**
 * 회사 페이지에 보이는 사실 정보입니다.
 * 비어 있는 항목은 화면에서 통째로 숨겨지니, 확인된 값이 생기면 채우세요.
 */

export interface HistoryItem {
  readonly year: string;
  readonly title: string;
  readonly detail?: string;
}

export interface Leader {
  readonly name: string;
  readonly role: string;
  /** 약력 한 줄씩. */
  readonly career: readonly string[];
}

export const leaders: readonly Leader[] = [{ name: "윤도선", role: "대표", career: [] }];

/** 장사왕 사이트(sellerking.io)에 공개된 인증·투자 이력. */
export const recognitions: readonly { readonly title: string; readonly detail: string }[] = [
  { title: "스파크랩 20기 선정", detail: "투자 유치" },
  { title: "중소벤처기업부 TIPS 선정", detail: "2023년 9월" },
  { title: "중소벤처기업부 벤처기업 인증", detail: "벤처 인증" },
  { title: "NIPA 클라우드컴퓨팅 품질성능 검증", detail: "정보통신산업진흥원" },
  { title: "네이버 커머스솔루션마켓 공식 입점", detail: "장사왕" },
  { title: "커머스 플랫폼 통합 정산 관리 시스템 특허", detail: "등록 특허 2건" },
];

/** 연혁. 예: { year: "2019", title: "창업" } */
export const history: readonly HistoryItem[] = [
  { year: "2026.07", title: "커머스 통합 정산 특허 보도", detail: "등록 특허 2건 확보 (제10-2986191호, 2026.06 등록)" },
  { year: "2026.05", title: "기보벤처캠프 데모데이 우수기업 선정", detail: "참가 14개사 중 우수기업 4곳에 포함" },
  { year: "2026.05", title: "고양 ICT 중소기업 육성 지원 선정" },
  { year: "2026.05", title: "장사왕, 가격·광고 분석으로 확장", detail: "AI 판매가 최적화, 광고 효율 분석, 원가 상승 알림" },
  { year: "2026.04", title: "기보벤처캠프 18기 참여" },
  { year: "2024.10", title: "코리아 이커머스 페어 참가", detail: "쇼핑몰 정산 세미나 진행" },
  { year: "2024.06", title: "고양 중소기업 빅데이터 활용 사업 참여" },
  { year: "2023.11", title: "경기북부 스타트업 815 IR 참가", detail: "장사왕 사업 모델 발표" },
  { year: "2023.10", title: "고양 IR데이 혁신상 수상" },
];

/** 투자 유치 문구. 예: "선도 VC 등으로부터 누적 ○○억원 투자 유치" */
export const investment: string | null = null;

export interface OpenPosition {
  readonly title: string;
  readonly type: string;
  readonly href?: string;
}

/** 채용 중인 포지션. */
export const openPositions: readonly OpenPosition[] = [];

/** 복지·근무 문화. */
export const benefits: readonly string[] = [];
