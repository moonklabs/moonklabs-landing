import { BarChart3, Boxes, FileSpreadsheet, Globe, Megaphone, Receipt, Smartphone, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ShapeKind } from "@/components/BrandShape";

export interface AgentShape {
  readonly name: string;
  readonly product: string;
  readonly color: string;
  readonly kind: ShapeKind;
  readonly icon: LucideIcon;
  readonly tilt: number;
}

/** The jobs Moonklabs agents take, one colored shape each. */
export const AGENT_SHAPES: readonly AgentShape[] = [
  { name: "브라우저 자동화", product: "MKbot.ai", color: "#5fb3a1", kind: "pebble", icon: Globe, tilt: -6 },
  { name: "보고서 작성", product: "MKbot.ai", color: "#4f5bd5", kind: "squircle", icon: FileSpreadsheet, tilt: 8 },
  { name: "모바일 지시", product: "MKbot.ai", color: "#7c5cf0", kind: "circle", icon: Smartphone, tilt: 0 },
  { name: "정산 수집", product: "장사왕", color: "#e2692d", kind: "circle", icon: Receipt, tilt: 0 },
  { name: "실질 마진", product: "장사왕", color: "#e99a3c", kind: "tile", icon: BarChart3, tilt: 5 },
  { name: "광고 점검", product: "장사왕", color: "#dc4a44", kind: "squircle", icon: Megaphone, tilt: -8 },
  { name: "재고 경보", product: "장사왕", color: "#3b74e8", kind: "pebble", icon: Boxes, tilt: 10 },
  { name: "에이전트 팀 조율", product: "Sprintable", color: "#d94a9a", kind: "circle", icon: Workflow, tilt: 0 },
];
