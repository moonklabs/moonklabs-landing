export const siteUrl = "https://moonklabs.com";
export const siteName = "뭉클랩";
export const siteTitle = "뭉클랩 — 당신의 업무를 위한 AI 에이전트";
export const contactEmail = "hello@moonklabs.com";
/** 사업자 정보. 장사왕·MKbot.ai 사이트 푸터와 동일한 값입니다. */
export const companyInfo = {
  legalName: "(주) 뭉클랩",
  ceo: "윤도선",
  businessNumber: "488-88-02579",
  address: "경기도 고양시 일산동구 무궁화로 20-38(로데오탑빌딩), 502호",
} as const;

export const lastUpdated = "2026-11-26";

export const siteSlogan = "당신의 업무를 위한 AI 에이전트";

export const siteDescription =
  "뭉클랩은 당신의 업무를 위한 AI 에이전트를 만듭니다. 사무 업무는 MKbot.ai가, 셀러의 반복 업무는 Beejet이, 커머스 운영은 장사왕이, 에이전트 팀 조율은 Sprintable이 맡고, 사람은 승인과 결정에 집중합니다.";

export const sellerkingUrl = "https://sellerking.io";
export const sellerkingBlogUrl = "https://www.sellerking.io/blog";
export const sprintableUrl = "https://sprintable.ai";
export const mkbotUrl = "https://mkbot.ai";
export const beejetUrl = "https://beejet.ai";
/** Inquiry endpoint (the Worker in contact-worker/). Override for local testing with NEXT_PUBLIC_CONTACT_ENDPOINT. */
export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "https://contact.moonklabs.com/contact";
/** Must match INTERESTS in contact-worker/src/contact.ts. */
export const contactInterests = ["MKbot.ai", "Beejet", "장사왕", "Sprintable", "기업 맞춤 Agent 자동화", "제휴 문의", "기타"] as const;
export const githubUrl = "https://github.com/moonklabs";

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Opens in a new tab (external sites). */
  readonly external?: boolean;
  readonly badge?: string;
}

/** Top menu. The "도입 문의" button is rendered separately. */
export const navLinks: readonly NavLink[] = [
  { label: "제품", href: "/products/", badge: "NEW" },
  { label: "회사", href: "/company/" },
  { label: "뉴스", href: "/news/" },
  { label: "블로그", href: "/blog/" },
  { label: "채용", href: "/careers/" },
];

export const contactHref = "/contact/";
export const partnerContactHref = "/contact/?type=partner";

export interface FooterGroup {
  readonly title: string;
  readonly links: readonly NavLink[];
}

export const footerGroups: readonly FooterGroup[] = [
  {
    title: "제품",
    links: [
      { label: "MKbot.ai", href: mkbotUrl, external: true },
      { label: "Beejet", href: beejetUrl, external: true },
      { label: "장사왕", href: sellerkingUrl, external: true },
      { label: "Sprintable", href: sprintableUrl, external: true },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "회사 소개", href: "/company/" },
      { label: "뉴스", href: "/news/" },
      { label: "블로그", href: "/blog/" },
      { label: "채용", href: "/careers/" },
      { label: "GitHub", href: githubUrl, external: true },
    ],
  },
  {
    title: "문의",
    links: [
      { label: "도입 문의", href: contactHref },
      { label: "제휴 문의", href: partnerContactHref },
      { label: "개인정보 처리방침", href: "/privacy/" },
    ],
  },
];

export const serviceList = [
  "MKbot.ai 기반 기업용 업무 자동화 봇 도입",
  "Beejet 기반 셀러 반복 업무 자동화(정산 수집·광고 키워드 정리·품절 확인)",
  "장사왕 기반 멀티채널 커머스 순이익·정산 자동화",
  "장사왕 광고·재고 Agent 기반 커머스 운영 자동화",
  "Sprintable 기반 AI Agent 팀 오케스트레이션",
  "커머스 기업 맞춤 Agent 자동화 설계·구축·정착 지원",
] as const;

export const productHighlights = [
  {
    name: "MKbot.ai",
    summary:
      "PC마다 한 대씩 일하는 기업용 업무 자동화 봇. 파일을 읽어 분석·보고서를 만들고, 내장 브라우저로 반복 웹 업무를 자동화하며, 제출·변경은 사람이 승인한 뒤에만 실행",
  },
  {
    name: "Beejet",
    summary:
      "온라인 셀러의 반복 업무를 대신하는 이커머스 업무 AI 봇. 내장 브라우저로 마켓과 소싱처 화면을 직접 열어 정산 엑셀 받기, 광고 키워드 정리, 품절 확인까지 끝내고, 마켓을 바꾸는 일은 승인받은 뒤에만 실행",
  },
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
    question: "MKbot.ai는 무엇인가요?",
    answer:
      "MKbot.ai는 PC마다 한 대씩 일하는 기업용 업무 자동화 봇입니다. 데스크톱 앱에서 파일을 읽어 분석하고 보고서를 만들며, 내장 브라우저로 사내 시스템과 협력사 포털의 반복 웹 업무를 대신 처리합니다. 제출·변경처럼 되돌리기 어려운 동작은 사람이 승인한 뒤에만 실행합니다. 자세한 내용은 mkbot.ai에서 확인할 수 있습니다.",
  },
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
