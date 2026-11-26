import type { LucideIcon } from "lucide-react";

export type ShapeKind = "circle" | "squircle" | "pebble" | "tile";

interface BrandShapeProps {
  readonly color: string;
  readonly kind: ShapeKind;
  readonly icon: LucideIcon;
  readonly className?: string;
  readonly tilt?: number;
}

const RADIUS: Record<ShapeKind, string> = {
  circle: "50%",
  squircle: "34%",
  pebble: "58% 42% 46% 54% / 52% 44% 56% 48%",
  tile: "22%",
};

/** A colored shape with a white glyph. Stands for one agent or product. */
export default function BrandShape({ color, kind, icon: Icon, className = "", tilt = 0 }: BrandShapeProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex aspect-square items-center justify-center text-white ${className}`}
      style={{ background: color, borderRadius: RADIUS[kind], transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <Icon className="h-[46%] w-[46%]" strokeWidth={2.2} style={{ transform: tilt ? `rotate(${-tilt}deg)` : undefined }} />
    </span>
  );
}
