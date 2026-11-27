import type { NewsPost } from "@/components/NewsCard";

export const PRESS_CATEGORY = "언론 보도";

// 썸네일(image)은 서로 다른 사진만 쓰세요. 같은 주소는 자동으로 건너뛰지만, 주소가 달라도 같은 사진이면 image를 null로 두세요(예: 머니투데이 5/22).
// 제목은 기사 내용을 요약한 것이며, 원문 헤드라인과 다를 수 있습니다. 날짜는 보도일(KST).
export const pressPosts: readonly NewsPost[] = [
  {
    title: "기보벤처캠프 데모데이 우수기업 4곳에 선정",
    outlet: "머니투데이",
    summary: "참가 14개사 중 우수기업 4곳에 포함. AI 에이전트 운영 체계를 소개했습니다.",
    url: "https://www.mt.co.kr/tech/2026/05/21/2026052104273330894",
    category: PRESS_CATEGORY,
    publishedAt: "2026-05-21T09:00:00+09:00",
    image: "https://thumb.mt.co.kr/cdn-cgi/image/w=1200,h=675,fit=cover,bg=white,f=auto,quality=high,sharpen=2,g=face/21/2026/05/2026052104273330894_1.jpg",
  },
  {
    title: "기보벤처캠프 데모데이, 뭉클랩 AI 에이전트 운영 체계 소개",
    outlet: "머니투데이",
    summary: "데모데이 우수기업 선정 후속 보도.",
    url: "https://www.mt.co.kr/future/2026/05/22/2026052120103785370",
    category: PRESS_CATEGORY,
    publishedAt: "2026-05-22T09:00:00+09:00",
    image: null,
  },
  {
    title: "고양 ICT 중소기업 육성 지원 사업 선정",
    outlet: "수원일보",
    summary: "선정 기업 10곳에 포함됐습니다.",
    url: "http://www.suwonilbo.kr/news/articleView.html?idxno=316035",
    category: PRESS_CATEGORY,
    publishedAt: "2026-05-20T09:00:00+09:00",
    image: "https://cdn.suwonilbo.kr/news/photo/202605/316035_220723_3515.jpg",
  },
  {
    title: "'장사왕', 정산에서 가격·광고 분석으로 확장",
    outlet: "머니투데이",
    summary: "순이익 자동 계산에 AI 판매가 최적화, 광고 효율 분석, 원가 상승 알림 기능이 더해졌습니다.",
    url: "https://www.mt.co.kr/future/2026/05/15/2026042909150988621",
    category: PRESS_CATEGORY,
    publishedAt: "2026-05-15T09:00:00+09:00",
    image: null,
  },
  {
    title: "기보벤처캠프 18기 참여",
    outlet: "머니투데이",
    summary: "커머스 수익 최적화 AI 에이전트를 제공하는 기업으로 소개됐습니다.",
    url: "https://www.mt.co.kr/future/2026/04/07/2026040611022367960",
    category: PRESS_CATEGORY,
    publishedAt: "2026-04-07T09:00:00+09:00",
    image: null,
  },
  {
    title: "뭉클랩, 커머스 통합 정산 핵심 특허 확보… 멀티채널 셀러 순이익 관리 효율 높인다",
    outlet: "APP저널",
    summary: "커머스 플랫폼 통합 정산 관리 시스템 특허(제10-2986191호) 등록. 뭉클랩은 등록 특허 2건을 확보했습니다.",
    url: "http://press.appjournal.kr/newsRead.php?no=1039018",
    category: PRESS_CATEGORY,
    publishedAt: "2026-07-21T09:00:00+09:00",
    image: "https://file.newswire.co.kr/data/datafile2/thumb_640/2026/07/3698957777_20260721150542_7372910866.png",
  },
  {
    title: "[그린·포용 스포츠] 뭉클랩, 커머스 통합 정산 핵심 특허 확보… 멀티채널 셀러 순이익 관리 효율 높인다",
    outlet: "스포츠피플타임즈",
    summary: "매출 데이터 자동 수집부터 상품별 마진 산출, 플랫폼별 정산 비교까지 자동화하는 순이익 관리 체계.",
    url: "http://www.sportpeopletimes.com/news/articleView.html?idxno=31847",
    category: PRESS_CATEGORY,
    publishedAt: "2026-07-21T09:00:00+09:00",
    image: null,
  },
  {
    title: "장사왕 2024 코리아 이커머스 페어 성료",
    outlet: "매거진한경",
    summary: "행사 결과. 쇼핑몰 정산 세미나를 진행했습니다.",
    url: "https://magazine.hankyung.com/business/article/202411014717b",
    category: PRESS_CATEGORY,
    publishedAt: "2024-11-03T09:00:00+09:00",
    image: null,
  },
  {
    title: "장사왕, '2024 코리아 이커머스 페어' 참가 및 세미나 발표",
    outlet: "아주경제",
    summary: "쿠팡·네이버 스마트스토어 데이터 통합과 순이익 분석 기능을 소개합니다.",
    url: "https://www.ajunews.com/view/20241025140259553",
    category: PRESS_CATEGORY,
    publishedAt: "2024-10-25T09:00:00+09:00",
    image: null,
  },
  {
    title: "고양 중소기업 빅데이터 활용 사업 참여",
    outlet: "이뉴스투데이",
    summary: "데이터 기반 마케팅 의사결정에 활용하겠다고 밝혔습니다.",
    url: "http://www.enewstoday.co.kr/news/articleView.html?idxno=2141644",
    category: PRESS_CATEGORY,
    publishedAt: "2024-06-19T09:00:00+09:00",
    image: null,
  },
  {
    title: "경기북부 스타트업 815 IR에서 '장사왕' 발표",
    outlet: "전자신문",
    summary: "참가 기업 4곳 중 하나로 장사왕 사업 모델을 발표했습니다.",
    url: "https://www.etnews.com/20231119000004",
    category: PRESS_CATEGORY,
    publishedAt: "2023-11-19T09:00:00+09:00",
    image: null,
  },
  {
    title: "경기북부 스타트업 815 IR 참가",
    outlet: "IT비즈뉴스",
    summary: "참가 기업 4곳 중 하나로 참여했습니다.",
    url: "https://www.itbiznews.com/news/articleView.html?idxno=118090",
    category: PRESS_CATEGORY,
    publishedAt: "2023-11-20T09:00:00+09:00",
    image: null,
  },
  {
    title: "고양 IR데이 혁신상 수상",
    outlet: "중부일보",
    summary: "커머스 정산·마진 관리 서비스 '장사왕'으로 혁신상을 받았습니다.",
    url: "http://www.joongboo.com/news/articleView.html?idxno=363616662",
    category: PRESS_CATEGORY,
    publishedAt: "2023-10-22T09:00:00+09:00",
    image: null,
  },
];

export interface Milestone {
  readonly stat: string;
  readonly label: string;
  readonly date: string;
  readonly url: string;
}

// 기사에서 확인되는 지원사업·IR·특허 성과만 담습니다. 투자·매출 수치는 기사로 확인되지 않아 제외했습니다.
export const milestones: readonly Milestone[] = [
  { stat: "우수 4곳", label: "기보벤처캠프 데모데이, 참가 14개사 중 선정", date: "2026.05", url: "https://www.mt.co.kr/tech/2026/05/21/2026052104273330894" },
  { stat: "2건", label: "커머스 통합 정산 관련 등록 특허", date: "2026.06", url: "http://press.appjournal.kr/newsRead.php?no=1039018" },
  { stat: "10곳", label: "고양 ICT 중소기업 육성 지원 선정", date: "2026.05", url: "http://www.suwonilbo.kr/news/articleView.html?idxno=316035" },
  { stat: "혁신상", label: "고양 IR데이 수상, 장사왕", date: "2023.10", url: "http://www.joongboo.com/news/articleView.html?idxno=363616662" },
];
