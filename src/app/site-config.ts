export const siteUrl = "https://moonklabs.com";
export const siteName = "뭉클랩";
export const siteTitle = "뭉클랩 — 기업을 위한 AI Agent 자동화 파트너";
export const contactEmail = "hello@moonklabs.com";
export const lastUpdated = "2026-04-06";

export const siteDescription =
  "뭉클랩은 Sprintable과 Sellerking을 개발·운영하며 축적한 경험을 바탕으로, 기업이 실제 업무 체계 안에 AI Agent 자동화를 도입할 수 있도록 돕는 B2B 파트너입니다.";

export const serviceList = [
  "엔터프라이즈 AI Agent 자동화 설계 및 구축",
  "Sprintable 기반 개발 조직 Agent Workflow 도입",
  "Sellerking 광고·재고 Agent 기반 커머스 운영 자동화",
  "도입 전략, 운영 설계, 교육·정착 지원",
] as const;

export const productHighlights = [
  {
    name: "Sprintable",
    status: "이번 주 오픈 예정",
    summary: "스프린트 계획, 실행, 검증, 문서화를 역할별 AI Agent로 조율하는 개발 조직용 Agent Workflow System",
  },
  {
    name: "Sellerking 광고 Agent",
    status: "현재 오픈",
    summary: "광고 성과와 비효율 신호를 빠르게 읽고 대응 포인트를 제안하는 이커머스 운영 Agent",
  },
  {
    name: "Sellerking 재고 Agent",
    status: "다음 주 오픈 예정",
    summary: "품절, 과재고, 회전율 저하 같은 재고 리스크를 미리 감지해 대응할 수 있도록 돕는 운영 Agent",
  },
] as const;

export const trustMetrics = [
  { value: 12000, suffix: "+", label: "누적 Agent 실행", note: "Sprintable · Sellerking 운영 기준" },
  { value: 8, suffix: "종", label: "운영 중인 Agent", note: "개발 · 광고 · 재고 · 리포트" },
  { value: 4, suffix: "주", label: "평균 파일럿 기간", note: "진단부터 첫 자동화 가동까지" },
  { value: 1, suffix: "영업일", label: "문의 회신 SLA", note: "도입 상담 요청 기준" },
] as const;

export const audienceTracks = [
  {
    tag: "FOR ENGINEERING TEAMS",
    title: "개발 조직",
    pain: "스프린트 계획, 티켓 정리, 리뷰, 문서화에 개발 시간의 절반이 사라집니다.",
    solution:
      "Sprintable의 역할별 Agent가 계획 · 실행 · 검증 · 문서화를 맡고, 사람은 우선순위와 최종 판단에 집중합니다.",
    product: "Sprintable",
    href: "#products",
  },
  {
    tag: "FOR COMMERCE OPERATORS",
    title: "커머스 운영",
    pain: "광고 비효율과 재고 리스크는 발견이 하루 늦을 때마다 그대로 손실이 됩니다.",
    solution:
      "Sellerking Agent가 광고 · 재고의 이상 신호를 상시 감시하고, 판단이 필요한 순간에만 사람을 호출합니다.",
    product: "Sellerking",
    href: "#work",
  },
  {
    tag: "FOR ENTERPRISE",
    title: "기업 맞춤 자동화",
    pain: "반복 업무는 많은데, 보안과 운영 체계 때문에 범용 AI 도구를 그대로 쓸 수 없습니다.",
    solution:
      "귀사의 업무 구조에 맞춘 Agent를 설계하고, 권한 · 가드레일 · 로그까지 갖춰 실제 운영에 올립니다.",
    product: "Custom Agent",
    href: "#contact",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "진단 워크숍",
    duration: "1주",
    description: "업무 흐름을 함께 분해해 자동화 대상과 기대 효과를 수치로 정의합니다. 무료로 진행합니다.",
  },
  {
    step: "02",
    title: "파일럿 구축",
    duration: "2–4주",
    description: "가장 효과가 큰 업무 하나를 골라 실제 운영 환경에서 Agent를 가동하고 성과를 검증합니다.",
  },
  {
    step: "03",
    title: "구축 · 확장",
    duration: "1–3개월",
    description: "검증된 파일럿을 기준으로 인접 업무로 자동화를 확장하고 운영 구조를 설계합니다.",
  },
  {
    step: "04",
    title: "정착 · 운영 지원",
    duration: "지속",
    description: "실무 교육, 운영 리뷰, 평가 체계 개선까지 — Agent가 팀의 일부로 자리 잡을 때까지 함께합니다.",
  },
] as const;

export const enterpriseItems = [
  {
    title: "권한 제어 · 접근 관리",
    description: "Agent별 최소 권한 원칙. 조직의 권한 체계와 승인 흐름을 그대로 반영합니다.",
  },
  {
    title: "운영 가드레일",
    description: "실행 범위 제한, 휴먼 리뷰 게이트, 회귀 방지 평가 하네스로 예측 가능한 자동화를 만듭니다.",
  },
  {
    title: "감사 로그 · 관측성",
    description: "모든 Agent 실행은 추적 가능한 로그로 남습니다. 무엇을, 왜 했는지 항상 설명할 수 있습니다.",
  },
  {
    title: "온프레미스 · 보안 요구사항",
    description: "망분리, 온프레미스, 데이터 반출 제한 등 기업 보안 요구사항에 맞춰 설계합니다.",
  },
] as const;

export const contactInterests = [
  "Sprintable — 개발 조직 자동화",
  "Sellerking — 커머스 운영 자동화",
  "기업 맞춤 Agent 자동화",
  "도입 전 진단 워크숍",
] as const;

export const faqItems = [
  {
    question: "뭉클랩은 어떤 기업을 위한 파트너인가요?",
    answer:
      "뭉클랩은 엔터프라이즈와 성장 기업이 실제 업무 체계 안에 AI Agent 자동화를 도입할 수 있도록 돕는 B2B 파트너입니다. 단순 데모보다 실제 운영에 들어가는 자동화와 Agent orchestration에 초점을 둡니다.",
  },
  {
    question: "Sprintable은 무엇인가요?",
    answer:
      "Sprintable은 개발 조직의 스프린트 계획, 실행, 검증, 문서화를 역할별 AI Agent로 생성·조율하는 워크플로우 시스템입니다. 사람이 우선순위와 최종 판단에 집중하고, 반복 실행은 Agent가 구조적으로 맡도록 설계했습니다.",
  },
  {
    question: "Sellerking은 어떤 문제를 해결하나요?",
    answer:
      "Sellerking은 이커머스 운영에서 놓치기 쉬운 광고 비효율과 재고 리스크를 빠르게 감지하고 대응할 수 있도록 돕는 Agent 제품군입니다. 대시보드를 넘어서 운영자가 바로 판단할 수 있는 액션 중심 신호를 제공하는 것이 핵심입니다.",
  },
  {
    question: "구축만 하나요, 교육과 정착 지원도 하나요?",
    answer:
      "구축만 하지 않습니다. 뭉클랩은 도입 전략, 운영 설계, 실무 교육, 파일럿 운영, 정착 지원까지 함께 진행합니다. 팀마다 다른 의사결정 구조와 운영 방식을 고려해 Agent 자동화가 실제로 자리 잡도록 돕습니다.",
  },
  {
    question: "엔터프라이즈 환경에서도 적용 가능한가요?",
    answer:
      "가능합니다. 권한 제어, 운영 가드레일, 로그, 평가 체계, 온프레미스 또는 보안 요구사항을 고려해 Agent 자동화가 엔터프라이즈 환경에서도 안전하게 동작하도록 설계합니다.",
  },
] as const;
