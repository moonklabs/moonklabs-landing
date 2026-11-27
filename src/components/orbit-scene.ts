import { AGENT_SHAPES } from "@/components/agents";
import { scriptAt, type ScriptPoint } from "@/components/agent-script";

export interface OrbitState {
  size: number;
  tiltX: number;
  tiltY: number;
  targetX: number;
  targetY: number;
}

export interface AgentSpot {
  x: number;
  y: number;
  scale: number;
}

/*
 * Performance notes: every frame touches ~1,500 points, so nothing here allocates per point.
 * Points are projected into preallocated typed arrays, grouped into a few depth buckets and
 * drawn with one path + one fill per bucket instead of one fill per point.
 */

const INK = "10,10,10";
const ACCENT = "31,111,209";
const CORE_POINTS = 1100;
const CORE_BUCKETS = 6;
const RING_POINTS = 70;
const RING_BUCKETS = 3;
const DUST_COUNT = 70;
const APPROVE_PERIOD = 7;
const TWO_PI = Math.PI * 2;
const AGENT_COUNT = AGENT_SHAPES.length;

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/** Small deterministic pseudo-random so every run looks the same. */
function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Evenly spread points on a unit sphere (Fibonacci lattice), as xyz triples. */
function sphere(count: number): Float32Array {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out[i * 3] = Math.cos(i * golden) * r;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(i * golden) * r;
  }
  return out;
}

const CORE = sphere(CORE_POINTS);
const CORE_X = new Float32Array(CORE_POINTS);
const CORE_Y = new Float32Array(CORE_POINTS);
const CORE_BUCKET = new Uint8Array(CORE_POINTS);

const RING_SPECS = [
  { tilt: 1.15, speed: 0.32, offset: 0, radius: 1.5, rgb: hexToRgb(AGENT_SHAPES[1].color) },
  { tilt: -0.55, speed: -0.24, offset: 2, radius: 1.66, rgb: hexToRgb(AGENT_SHAPES[3].color) },
  { tilt: 0.1, speed: 0.18, offset: 4, radius: 1.82, rgb: hexToRgb(AGENT_SHAPES[0].color) },
];
const RINGS = RING_SPECS.map((spec) => {
  const base = new Float32Array(RING_POINTS * 3);
  for (let i = 0; i < RING_POINTS; i += 1) {
    const a = (i / RING_POINTS) * TWO_PI;
    base[i * 3] = Math.cos(a) * spec.radius;
    base[i * 3 + 1] = Math.sin(a) * spec.radius * Math.cos(spec.tilt);
    base[i * 3 + 2] = Math.sin(a) * spec.radius * Math.sin(spec.tilt);
  }
  return { ...spec, base, x: new Float32Array(RING_POINTS), y: new Float32Array(RING_POINTS), bucket: new Uint8Array(RING_POINTS) };
});

const DUST = (() => {
  const rand = seeded(42);
  return Array.from({ length: DUST_COUNT }, () => ({
    angle: rand() * TWO_PI,
    dist: 0.18 + rand() * 0.36,
    speed: (rand() - 0.5) * 0.1,
    phase: rand() * TWO_PI,
    radius: 0.5 + rand() * 1.1,
  }));
})();

const AGENT_RGB = AGENT_SHAPES.map((agent) => hexToRgb(agent.color));
const SPOTS: AgentSpot[] = AGENT_SHAPES.map(() => ({ x: 0, y: 0, scale: 1 }));

interface View {
  readonly cosY: number;
  readonly sinY: number;
  readonly cosX: number;
  readonly sinX: number;
}

/** Rotation terms shared by every point drawn this frame. */
function view(spin: number, st: OrbitState): View {
  const ay = spin + st.tiltY;
  const ax = 0.32 + st.tiltX;
  return { cosY: Math.cos(ay), sinY: Math.sin(ay), cosX: Math.cos(ax), sinX: Math.sin(ax) };
}

function drawDust(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, time: number) {
  ctx.fillStyle = `rgba(${INK},${0.09 + Math.sin(time * 0.9) * 0.04})`;
  ctx.beginPath();
  for (const d of DUST) {
    const a = d.angle + time * d.speed;
    const dist = d.dist + Math.sin(time * 0.4 + d.phase) * 0.02;
    const x = cx + Math.cos(a) * dist * size;
    const y = cy + Math.sin(a) * dist * size;
    ctx.rect(x - d.radius, y - d.radius, d.radius * 2, d.radius * 2);
  }
  ctx.fill();
}

/** Scanning wave: points near the wave plane turn blue, like a model "thinking" across the core. */
function drawCore(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, time: number, st: OrbitState) {
  const waveY = ((time % APPROVE_PERIOD) / 2.6) * 2.6 - 1.3;
  const v = view(time * 0.28, st);
  const unit = Math.max(0.8, (r / 120) * 1.5);
  const litBucket = CORE_BUCKETS;

  for (let i = 0; i < CORE_POINTS; i += 1) {
    const x = CORE[i * 3];
    const y = CORE[i * 3 + 1];
    const z = CORE[i * 3 + 2];
    const x1 = x * v.cosY + z * v.sinY;
    const z1 = -x * v.sinY + z * v.cosY;
    const y2 = y * v.cosX - z1 * v.sinX;
    const z2 = y * v.sinX + z1 * v.cosX;
    const persp = 1 / (1 - z2 * 0.22);
    CORE_X[i] = cx + x1 * persp * r;
    CORE_Y[i] = cy + y2 * persp * r;
    const depth = (z2 + 1) / 2;
    CORE_BUCKET[i] = Math.abs(y - waveY) < 0.2 ? litBucket : Math.min(CORE_BUCKETS - 1, (depth * CORE_BUCKETS) | 0);
  }

  for (let b = 0; b <= CORE_BUCKETS; b += 1) {
    const isLit = b === litBucket;
    const depth = isLit ? 0.85 : (b + 0.5) / CORE_BUCKETS;
    const dot = (0.55 + depth * 1.15 + (isLit ? 0.6 : 0)) * unit;
    // Tiny back-facing dots are cheap squares; only the larger front-facing ones are drawn as circles.
    const round = isLit || b >= CORE_BUCKETS - 2;
    ctx.fillStyle = isLit ? `rgba(${ACCENT},0.9)` : `rgba(${INK},${0.18 + depth * 0.7})`;
    ctx.beginPath();
    for (let i = 0; i < CORE_POINTS; i += 1) {
      if (CORE_BUCKET[i] !== b) continue;
      if (round) {
        ctx.moveTo(CORE_X[i] + dot, CORE_Y[i]);
        ctx.arc(CORE_X[i], CORE_Y[i], dot, 0, TWO_PI);
      } else {
        ctx.rect(CORE_X[i] - dot, CORE_Y[i] - dot, dot * 2, dot * 2);
      }
    }
    ctx.fill();
  }
}

function drawRings(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, time: number, st: OrbitState) {
  const unit = Math.max(0.8, (r / 120) * 1.5) * 0.8;
  for (const ring of RINGS) {
    const v = view(time * ring.speed + ring.offset, st);
    for (let i = 0; i < RING_POINTS; i += 1) {
      const x = ring.base[i * 3];
      const y = ring.base[i * 3 + 1];
      const z = ring.base[i * 3 + 2];
      const x1 = x * v.cosY + z * v.sinY;
      const z1 = -x * v.sinY + z * v.cosY;
      const y2 = y * v.cosX - z1 * v.sinX;
      const z2 = y * v.sinX + z1 * v.cosX;
      const persp = 1 / (1 - z2 * 0.22);
      ring.x[i] = cx + x1 * persp * r;
      ring.y[i] = cy + y2 * persp * r;
      ring.bucket[i] = Math.min(RING_BUCKETS - 1, (((z2 + 1) / 2) * RING_BUCKETS) | 0);
    }
    for (let b = 0; b < RING_BUCKETS; b += 1) {
      const depth = (b + 0.5) / RING_BUCKETS;
      const dot = (0.8 + depth * 1.2) * unit;
      ctx.fillStyle = `rgba(${ring.rgb},${0.12 + depth * 0.5})`;
      ctx.beginPath();
      for (let i = 0; i < RING_POINTS; i += 1) {
        if (ring.bucket[i] !== b) continue;
        ctx.rect(ring.x[i] - dot, ring.y[i] - dot, dot * 2, dot * 2);
      }
      ctx.fill();
    }
  }
}

function drawApprovalRing(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, time: number) {
  const t = ((time + 2.6) % APPROVE_PERIOD) / APPROVE_PERIOD;
  if (t > 0.55) return;
  const k = t / 0.55;
  ctx.strokeStyle = `rgba(${ACCENT},${0.35 * (1 - k)})`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, size * (0.16 + k * 0.3), 0, TWO_PI);
  ctx.stroke();
}

/** One comet-shaped packet travelling along a link. `head` runs 0 (core) to 1 (agent). */
function drawPacket(ctx: CanvasRenderingContext2D, sx: number, sy: number, ex: number, ey: number, head: number, tailLen: number, alpha: number) {
  const tail = Math.min(1, Math.max(0, head - tailLen));
  ctx.beginPath();
  ctx.moveTo(sx + (ex - sx) * tail, sy + (ey - sy) * tail);
  ctx.lineTo(sx + (ex - sx) * head, sy + (ey - sy) * head);
  ctx.globalAlpha = alpha;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/** Streams of packets between the core and each agent. The agent on stage gets a brighter, faster stream. */
function drawLinks(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, time: number, script: ScriptPoint) {
  const coreEdge = size * 0.2;
  const agentEdge = size * 0.075;
  ctx.lineCap = "round";

  for (let i = 0; i < AGENT_COUNT; i += 1) {
    const dx = SPOTS[i].x - cx;
    const dy = SPOTS[i].y - cy;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const sx = cx + ux * coreEdge;
    const sy = cy + uy * coreEdge;
    const ex = cx + ux * (len - agentEdge);
    const ey = cy + uy * (len - agentEdge);
    const rgb = AGENT_RGB[i];
    const onStage = i === script.agent;

    ctx.strokeStyle = `rgba(${rgb},${onStage ? 0.5 : 0.14})`;
    ctx.lineWidth = onStage ? 1.6 : 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // Background chatter: a slow trickle on every link so the whole network feels alive.
    ctx.strokeStyle = `rgb(${rgb})`;
    ctx.lineWidth = 2.2;
    for (let k = 0; k < 2; k += 1) {
      const t = (((time * 0.14 + k / 2 + i * 0.137) % 1) + 1) % 1;
      drawPacket(ctx, sx, sy, ex, ey, k === 0 ? t : 1 - t, 0.07, 0.75 * Math.sin(Math.PI * t));
    }

    if (!onStage) continue;
    // Stage traffic: tasks stream out while working, results stream back once done.
    ctx.lineWidth = 3.4;
    const outbound = script.stage === "working";
    for (let k = 0; k < 3; k += 1) {
      const t = (((script.elapsed / 0.75 + k / 3) % 1) + 1) % 1;
      drawPacket(ctx, sx, sy, ex, ey, outbound ? t : 1 - t, 0.12, Math.sin(Math.PI * t));
    }
  }
}

/** Progress ring while the agent works, then a burst when it has a result. */
function drawStageRing(ctx: CanvasRenderingContext2D, size: number, script: ScriptPoint) {
  const spot = SPOTS[script.agent];
  const rgb = AGENT_RGB[script.agent];
  const radius = size * 0.07 + 6;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  if (script.stage === "working") {
    ctx.strokeStyle = `rgba(${rgb},0.2)`;
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, radius, 0, TWO_PI);
    ctx.stroke();
    ctx.strokeStyle = `rgb(${rgb})`;
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, radius, -Math.PI / 2, -Math.PI / 2 + TWO_PI * script.progress);
    ctx.stroke();
    return;
  }
  const fade = Math.max(0, 1 - script.elapsed / 1.2);
  ctx.strokeStyle = `rgba(${rgb},${0.9 * fade})`;
  ctx.beginPath();
  ctx.arc(spot.x, spot.y, radius + script.elapsed * 14, 0, TWO_PI);
  ctx.stroke();
}

/** Where each agent sits this frame: a slow ring with a gentle individual drift. */
function placeAgents(cx: number, cy: number, size: number, time: number) {
  for (let i = 0; i < AGENT_COUNT; i += 1) {
    const a = (i / AGENT_COUNT) * TWO_PI - Math.PI / 2 + time * 0.07;
    const r = size * 0.385 * (1 + Math.sin(time * 0.5 + i * 1.7) * 0.035);
    SPOTS[i].x = cx + Math.cos(a) * r;
    SPOTS[i].y = cy + Math.sin(a) * r;
  }
}

/** Draws one frame and returns where the DOM agent shapes should go (the returned array is reused). */
export function drawOrbitFrame(ctx: CanvasRenderingContext2D, st: OrbitState, time: number): readonly AgentSpot[] {
  const { size } = st;
  ctx.clearRect(0, 0, size, size);
  const cx = size / 2;
  const cy = size / 2;
  const coreR = size * 0.19;

  const script = scriptAt(time);
  placeAgents(cx, cy, size, time);
  drawDust(ctx, cx, cy, size, time);
  drawLinks(ctx, cx, cy, size, time, script);
  drawStageRing(ctx, size, script);
  drawApprovalRing(ctx, cx, cy, size, time);
  drawRings(ctx, cx, cy, coreR, time, st);
  drawCore(ctx, cx, cy, coreR, time, st);
  for (let i = 0; i < AGENT_COUNT; i += 1) SPOTS[i].scale = 1;
  // The agent on stage grows a little when it is handed work, and settles while it works.
  SPOTS[script.agent].scale = 1 + 0.12 * Math.min(1, script.stage === "working" ? script.elapsed / 0.35 : 1 - script.progress * 0.3);
  return SPOTS;
}
