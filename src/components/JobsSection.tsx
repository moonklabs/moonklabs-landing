"use client";

import { ChevronLeft, Mic, Monitor, Plus } from "lucide-react";
import { useState } from "react";
import BrandShape from "@/components/BrandShape";
import { AGENT_SHAPES, type AgentShape } from "@/components/agents";

interface Job {
  readonly shape: AgentShape;
  readonly label: string;
  readonly lead: string;
  readonly detail: string;
  readonly report: string;
  readonly proposalTitle: string;
  readonly proposal: readonly string[];
  readonly approve: string;
  readonly userReply: string;
  readonly done: string;
}

const JOBS: readonly Job[] = [
  {
    shape: AGENT_SHAPES[0],
    label: "납기 지연 정리",
    lead: "포털을 열어 직접 조회합니다.",
    detail: "협력사 포털에서 조건을 입력하고 표를 읽어, 지연 건만 엑셀로 정리한 뒤 보낼지 묻습니다.",
    report: "협력사 포털에서 10월 납기 지연 3건을 찾았어요.",
    proposalTitle: "담당자에게 메일로 보낼까요?",
    proposal: ["브래킷 어셈블리 지연 7일", "프레임 서브 지연 6일", "리클라이너 기어 지연 6일"],
    approve: "네, 보내 줘",
    userReply: "보내 줘. 엑셀도 첨부해",
    done: "메일을 보냈어요. 엑셀은 내 PC 폴더에 저장했어요.",
  },
  {
    shape: AGENT_SHAPES[1],
    label: "실적 보고서",
    lead: "분석 결과를 보고서로 만듭니다.",
    detail: "고른 파일을 읽어 표와 차트로 정리하고, 회사 보고 양식의 PowerPoint·Excel로 내보냅니다.",
    report: "10월 영업 실적을 정리했어요. 미달 팀은 2곳이에요.",
    proposalTitle: "보고용 PPT로 만들까요?",
    proposal: ["회사 월간 보고 양식", "편집 가능한 차트·표", "출처·기준 시점 자동 표기"],
    approve: "만들어 줘",
    userReply: "좋아, 그대로 만들어 줘",
    done: "PPT 4장을 만들었어요. 차트는 PowerPoint에서 바로 고칠 수 있어요.",
  },
  {
    shape: AGENT_SHAPES[3],
    label: "정산 수집",
    lead: "채널마다 다른 정산을 모읍니다.",
    detail: "여러 플랫폼의 매출·정산 데이터를 자동으로 수집·표준화해, 상품별·플랫폼별 실질 마진을 계산합니다.",
    report: "3개 채널 정산 데이터 수집을 마쳤어요.",
    proposalTitle: "마진이 낮은 채널이 있어요",
    proposal: ["채널 A 마진 22%", "채널 B 마진 14%", "채널 C 마진 6%"],
    approve: "가격 검토하기",
    userReply: "채널 C 가격 정책 검토해 줘",
    done: "수수료·배송비를 반영한 가격 검토안을 정리했어요.",
  },
  {
    shape: AGENT_SHAPES[5],
    label: "광고 점검",
    lead: "비효율 신호를 먼저 찾습니다.",
    detail: "성과가 떨어지는 캠페인을 감지하고, 근거와 함께 예산 재분배안을 올립니다.",
    report: "캠페인 B 전환 효율이 3일 연속 떨어졌어요.",
    proposalTitle: "예산 일부를 캠페인 A로 옮길까요?",
    proposal: ["캠페인 B 전환율 3일 연속 하락", "캠페인 A 예산 소진 정상", "재분배안 1건 준비됨"],
    approve: "승인",
    userReply: "승인. 내일 결과 알려 줘",
    done: "재분배를 실행했어요. 내일 오전에 결과를 보고할게요.",
  },
  {
    shape: AGENT_SHAPES[6],
    label: "재고 경보",
    lead: "품절과 과재고를 미리 알립니다.",
    detail: "품절, 과재고, 회전율 저하 같은 재고 리스크를 먼저 감지해 발주 수량을 제안합니다.",
    report: "SKU 0412가 7일 안에 품절될 것 같아요.",
    proposalTitle: "발주 수량을 제안할까요?",
    proposal: ["SKU 0412 7일 내 품절 예상", "SKU 1180 회전율 저하 · 과재고", "발주 제안 1건 준비됨"],
    approve: "제안 보기",
    userReply: "발주 제안 보여 줘",
    done: "발주 제안을 정리했어요. 확정은 승인한 뒤에만 진행해요.",
  },
  {
    shape: AGENT_SHAPES[7],
    label: "에이전트 팀 조율",
    lead: "여러 에이전트를 한 팀으로 묶습니다.",
    detail: "역할별 에이전트에게 일을 나눠 맡기고, 위임 → 보고 → 승인 → 실행 흐름으로 조율합니다.",
    report: "에이전트 4개의 오늘 작업을 조율했어요. 충돌은 없어요.",
    proposalTitle: "승인 대기 2건이 있어요",
    proposal: ["광고 Agent 예산 재분배안", "재고 Agent 발주 제안", "나머지 작업은 진행 중"],
    approve: "모아서 보기",
    userReply: "두 건 모아서 보여 줘",
    done: "두 건을 근거와 함께 한 화면에 모았어요.",
  },
];

export default function JobsSection() {
  const [active, setActive] = useState(0);
  const job = JOBS[active];

  return (
    <section aria-labelledby="jobs-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-24">
        <div className="lg:pt-6">
          <h2 id="jobs-title" className="display-md">
            에이전트마다 맡은 일
          </h2>
          <div role="tablist" aria-label="에이전트가 맡는 일" className="mt-7 flex flex-wrap gap-2.5">
            {JOBS.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  id={`job-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="job-panel"
                  onClick={() => setActive(i)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[17px] transition-colors ${
                    selected ? "border-transparent" : "border-line-strong text-mute hover:text-fg"
                  }`}
                  style={selected ? { background: `${item.shape.color}22`, color: item.shape.color } : undefined}
                >
                  {selected ? <BrandShape color={item.shape.color} kind="circle" icon={item.shape.icon} className="w-6" /> : null}
                  {item.label}
                </button>
              );
            })}
          </div>
          <p id="job-panel" role="tabpanel" aria-labelledby={`job-tab-${active}`} className="mt-10 max-w-xl text-lg leading-relaxed">
            <span className="font-medium">{job.lead}</span> <span className="text-mute">{job.detail}</span>
          </p>
          <p className="mt-4 text-sm text-mute">{job.shape.product} · 예시 대화 · 샘플 데이터</p>
        </div>

        <div aria-hidden className="mx-auto w-[19rem] rounded-[2.75rem] border-[5px] border-fg bg-card p-3">
          <div className="mx-auto h-6 w-24 rounded-full bg-fg" />
          <div className="mt-4 flex items-center justify-between">
            <span className="flex size-9 items-center justify-center rounded-full bg-ink shadow-[var(--shadow-float)]">
              <ChevronLeft className="size-4" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sm font-medium shadow-[var(--shadow-float)]">
              <BrandShape color={job.shape.color} kind="circle" icon={job.shape.icon} className="w-5" />
              {job.label}
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-ink shadow-[var(--shadow-float)]">
              <Monitor className="size-4" />
            </span>
          </div>

          <div key={job.label} className="mt-5 flex min-h-[25rem] flex-col gap-3 text-[15px] leading-snug">
            <p className="rise-in max-w-[88%] rounded-2xl bg-pill px-3.5 py-2.5">{job.report}</p>
            <div className="rise-in rounded-2xl bg-pill p-3" style={{ animationDelay: "0.15s" }}>
              <p className="font-medium">{job.proposalTitle}</p>
              <ul className="mt-2 space-y-1.5 rounded-xl bg-ink p-3 text-sm">
                {job.proposal.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="mt-3 flex gap-2 text-sm">
                <span className="rounded-full bg-fg px-3.5 py-1.5 text-ink">{job.approve}</span>
                <span className="rounded-full bg-ink px-3.5 py-1.5">먼저 볼게요</span>
              </div>
            </div>
            <p className="rise-in max-w-[85%] self-end rounded-2xl bg-fg px-3.5 py-2.5 text-ink" style={{ animationDelay: "0.3s" }}>
              {job.userReply}
            </p>
            <p className="rise-in max-w-[88%] rounded-2xl bg-pill px-3.5 py-2.5" style={{ animationDelay: "0.45s" }}>
              {job.done}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink shadow-[var(--shadow-float)]">
              <Plus className="size-4" />
            </span>
            <span className="flex h-10 flex-1 items-center justify-between rounded-full bg-ink px-4 text-sm text-mute shadow-[var(--shadow-float)]">
              메시지 보내기 <Mic className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
