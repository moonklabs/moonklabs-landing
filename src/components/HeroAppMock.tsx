"use client";

import { ArrowUp, FileSpreadsheet, Globe, Laptop, Monitor, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import BrandShape from "@/components/BrandShape";

const BOTS = [
  { name: "사무실 PC 봇", color: "#5fb3a1", kind: "pebble", icon: Monitor },
  { name: "재택 노트북 봇", color: "#4f5bd5", kind: "squircle", icon: Laptop },
  { name: "봇 추가", color: "#c4c7cc", kind: "circle", icon: Plus },
] as const;

const RECENTS = [
  { title: "납기 지연 건 정리", note: "지연 3건을 엑셀로 정리했어요", color: "#3b74e8", icon: Globe },
  { title: "10월 실적 보고서", note: "보고용 PPT 4장 만들었어요", color: "#e2692d", icon: FileSpreadsheet },
  { title: "주간보고 취합", note: "5개 팀 자료를 모으는 중", color: "#6fbf73", icon: FileSpreadsheet },
] as const;

const SCRIPT = {
  botFirst: "좋은 아침이에요! 협력사 포털에서 10월 납기 지연 3건을 찾았어요. 브래킷 어셈블리 7일, 프레임 서브 6일, 리클라이너 기어 6일이에요.",
  userReply: "잘 찾았네. 엑셀로 정리하고 담당자에게 메일 초안도 만들어 줘",
  botSecond: "엑셀로 정리했어요. 메일은 초안만 만들어 뒀고, 보내기 전에 승인을 요청할게요.",
} as const;

const TYPE_INTERVAL_MS = 55;
const PAUSE_AFTER_TYPING_MS = 700;
const PAUSE_AFTER_REPLY_MS = 5200;
const START_DELAY_MS = 1400;

type Phase = "typing" | "sent" | "replied";

function useDemoLoop() {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setPhase("replied"), 0);
      return () => window.clearTimeout(id);
    }
    let id: number;
    if (phase === "typing") {
      const done = typed >= SCRIPT.userReply.length;
      id = window.setTimeout(
        () => (done ? setPhase("sent") : setTyped((n) => n + 1)),
        done ? PAUSE_AFTER_TYPING_MS : typed === 0 ? START_DELAY_MS : TYPE_INTERVAL_MS,
      );
    } else if (phase === "sent") {
      id = window.setTimeout(() => setPhase("replied"), PAUSE_AFTER_TYPING_MS * 2);
    } else {
      id = window.setTimeout(() => {
        setTyped(0);
        setPhase("typing");
      }, PAUSE_AFTER_REPLY_MS);
    }
    return () => window.clearTimeout(id);
  }, [typed, phase]);

  return { typedText: phase === "typing" ? SCRIPT.userReply.slice(0, typed) : "", phase };
}

/** The MKbot.ai desktop app drawn in code: bots on the left, a live chat on the right. */
export default function HeroAppMock() {
  const { typedText, phase } = useDemoLoop();

  return (
    <div
      role="img"
      aria-label="MKbot.ai 앱 화면 예시. 왼쪽에 연결된 봇과 최근 작업이, 오른쪽에 사무실 PC 봇과의 대화가 보인다."
      className="grid overflow-hidden rounded-3xl border border-line bg-card/70 text-left md:grid-cols-[18rem_1fr]"
    >
      <aside className="hidden flex-col border-r border-line p-4 md:flex">
        <div className="flex items-center justify-between">
          <span className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#ee6a5f]" />
            <span className="size-3 rounded-full bg-[#f5be4f]" />
            <span className="size-3 rounded-full bg-[#62c554]" />
          </span>
          <span className="flex gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-ink shadow-[var(--shadow-float)]">
              <Search className="size-4" />
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-ink shadow-[var(--shadow-float)]">
              <Plus className="size-4" />
            </span>
          </span>
        </div>
        <ul className="mt-5 grid grid-cols-3 gap-1">
          {BOTS.map((bot, i) => (
            <li key={bot.name} className={`flex flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center ${i === 0 ? "bg-pill" : ""}`}>
              <BrandShape color={bot.color} kind={bot.kind} icon={bot.icon} className="w-14" />
              <span className="text-[13px] leading-tight">{bot.name}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 space-y-1">
          {RECENTS.map((item) => (
            <li key={item.title} className="flex items-center gap-3 rounded-xl px-2 py-2">
              <BrandShape color={item.color} kind="circle" icon={item.icon} className="w-9 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-medium">{item.title}</span>
                <span className="block truncate text-sm text-mute">{item.note}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-3 pt-10">
          <Avatar name="김" color="#9aa0a6" className="size-8 text-xs" />
          <span className="text-sm">김지현 · 영업기획</span>
        </div>
      </aside>

      <div className="flex min-h-[26rem] flex-col p-4 md:min-h-[34rem] md:p-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sm font-medium shadow-[var(--shadow-float)]">
            <BrandShape color={BOTS[0].color} kind="pebble" icon={BOTS[0].icon} className="w-5" />
            {BOTS[0].name}
          </span>
          <span className="rounded-full bg-ink px-3 py-1.5 text-sm shadow-[var(--shadow-float)]">공유</span>
        </div>
        <p className="mt-5 text-center text-sm text-mute">금요일 오전 7:48</p>

        <div className="mt-3 flex flex-1 flex-col gap-3">
          <p className="max-w-[85%] rounded-2xl bg-pill px-4 py-3 text-[15px] leading-relaxed">{SCRIPT.botFirst}</p>
          {phase !== "typing" ? (
            <p className="rise-in max-w-[80%] self-end rounded-2xl bg-fg px-4 py-3 text-[15px] leading-relaxed text-ink">{SCRIPT.userReply}</p>
          ) : null}
          {phase === "replied" ? (
            <div className="rise-in max-w-[85%] space-y-2">
              <p className="rounded-2xl bg-pill px-4 py-3 text-[15px] leading-relaxed">{SCRIPT.botSecond}</p>
              <div className="flex items-center gap-3 rounded-2xl bg-ink p-3 shadow-[var(--shadow-float)]">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <FileSpreadsheet className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">10월_납기지연_정리.xlsx</span>
                  <span className="block text-xs text-mute">내 PC · 방금 만들었어요</span>
                </span>
                <span className="rounded-full bg-fg px-3 py-1.5 text-xs text-ink">열기</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-full border border-line bg-ink py-2 pl-2 pr-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card">
            <Plus className="size-4" />
          </span>
          <span className={`min-w-0 flex-1 truncate text-[15px] ${typedText ? "caret" : "text-mute"}`}>{typedText || "시킬 일을 말해 주세요"}</span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fg text-ink">
            <ArrowUp className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
