export const siteUrl = "https://moonklabs.com";
export const siteName = "뭉클랩";
export const siteTitle = "뭉클랩 — 에이전트가 일하는 커머스, Agent Commerce";
export const contactEmail = "hello@moonklabs.com";
export const lastUpdated = "2026-10-13";

export const siteDescription =
  "뭉클랩은 장사왕과 Sprintable로 에이전트 커머스를 만듭니다. 정산·마진·광고·재고 같은 커머스 운영은 AI 에이전트가 실행하고, 사람은 승인과 결정에 집중합니다.";

export const sellerkingUrl = "https://sellerking.io";
export const sprintableUrl = "https://sprintable.ai";
export const githubUrl = "https://github.com/moonklabs";

export const navLinks = [
  { label: "일하는 방식", href: "#approach" },
  { label: "제품", href: "#products" },
  { label: "숫자", href: "#numbers" },
  { label: "회사", href: "#story" },
  { label: "FAQ", href: "#faq" },
];

export const serviceList = [
  "장사왕 기반 멀티채널 커머스 순이익·정산 자동화",
  "장사왕 광고·재고 Agent 기반 커머스 운영 자동화",
  "Sprintable 기반 AI Agent 팀 오케스트레이션",
  "커머스 기업 맞춤 Agent 자동화 설계·구축·정착 지원",
] as const;

export const productHighlights = [
  {
    name: "장사왕",
    summary:
      "여러 커머스 플랫폼의 매출·정산 데이터를 자동으로 수집·표준화하고, 상품별·플랫폼별 실질 마진을 계산하는 이커머스 순이익 자동화 SaaS",
  },
  {
    name: "장사왕 광고·재고 Agent",
    summary:
      "광고 비효율과 품절·과재고 같은 운영 리스크를 먼저 감지하고, 셀러가 바로 승인할 수 있는 다음 액션을 제안하는 커머스 운영 Agent",
  },
  {
    name: "Sprintable",
    summary:
      "위임 → 보고 → 승인 → 실행 구조로 여러 AI Agent를 하나의 팀처럼 조율하고, 최종 승인은 사람이 쥐는 AI Agent OS",
  },
] as const;

/** 실제로 확인된 수치만 넣습니다. 고객 수치·로고·후기가 확보되면 여기에 추가하세요. */
export const companyStats = [
  { value: "약 9,000", label: "장사왕을 사용하는 셀러", note: "Sellerking" },
  { value: "2", label: "등록 특허", note: "커머스 플랫폼 통합 정산 관리 시스템 외" },
  { value: "10년+", label: "함께 일해 온 팀의 호흡", note: "데이터·시각화·풀스택·UX·마케팅" },
  { value: "100%", label: "최종 실행 전 사람의 승인", note: "Human-in-the-loop" },
] as const;

export const faqItems = [
  {
    question: "에이전트 커머스란 무엇인가요?",
    answer:
      "에이전트 커머스는 정산 확인, 마진 계산, 광고 조정, 재고 대응처럼 셀러가 매일 반복하는 커머스 운영을 AI 에이전트가 감지하고 실행하는 방식입니다. 뭉클랩은 에이전트가 일을 맡되 최종 결정은 사람이 승인하는 구조로 에이전트 커머스를 설계합니다.",
  },
  {
    question: "장사왕은 어떤 문제를 해결하나요?",
    answer:
      "여러 플랫폼에 입점한 셀러일수록 '얼마에 팔았는가'보다 '실제로 얼마가 남았는가'를 파악하기 어렵습니다. 장사왕은 플랫폼별 매출·정산 데이터를 자동으로 수집·표준화하고, 매입가·배송원가와 결합해 상품별·플랫폼별 실질 마진을 보여줍니다. 약 9,000명의 셀러가 사용하고 있습니다.",
  },
  {
    question: "장사왕의 광고·재고 Agent는 무엇을 하나요?",
    answer:
      "광고 Agent는 성과가 떨어지는 캠페인과 비효율 신호를, 재고 Agent는 품절·과재고·회전율 저하 같은 리스크를 먼저 감지합니다. 대시보드를 들여다보지 않아도 셀러가 바로 판단할 수 있도록 근거와 함께 다음 액션을 제안합니다.",
  },
  {
    question: "Sprintable은 커머스와 어떤 관계인가요?",
    answer:
      "Sprintable은 여러 AI Agent를 하나의 팀처럼 조율하는 AI Agent OS입니다. 위임 → 보고 → 승인 → 실행 흐름으로 에이전트에게 일을 맡기고 사람이 최종 승인합니다. 커머스 운영처럼 여러 에이전트가 함께 움직여야 하는 업무를 안전하게 굴리는 기반이자, 뭉클랩이 일하는 방식 그 자체입니다.",
  },
  {
    question: "기업 맞춤 Agent 자동화도 가능한가요?",
    answer:
      "가능합니다. 장사왕과 Sprintable을 운영하며 검증한 방식으로 권한 제어, 승인 가드레일, 실행 로그, 평가 체계를 갖춘 Agent 자동화를 설계하고, 도입 이후 교육과 정착까지 함께합니다.",
  },
] as const;
