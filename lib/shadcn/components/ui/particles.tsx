"use client";

import {
  type ComponentProps,
  type CSSProperties,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/shadcn/lib/utils";

export interface ParticlesProps extends ComponentProps<"div"> {
  /**
   * How many specks in a 1440×900 box; other sizes get as many per area,
   * never more than 600.
   *
   * @default 300
   */
  count?: number;
  /** A steady push right (negative: left), in pixels per frame at 60 fps. @default 0 */
  driftX?: number;
  /** A steady push down (negative: up), in pixels per frame at 60 fps. @default 0 */
  driftY?: number;
  /** How far the specks lean toward the pointer. @default "medium" */
  intensity?: "subtle" | "medium" | "strong";
  /** Whether the specks lean toward the pointer, the near ones most. @default true */
  interactive?: boolean;
  /** The specks' color, any CSS color; the far ones take a cooler, fainter tint of it. @default "var(--foreground)" */
  particleColor?: string;
  /** The far specks' radius in pixels; the middle ones are 1.6 times it, the near ones 2.5 times. @default 1.2 */
  size?: number;
  /** Multiplies the specks' own slow drift and twinkle; `0` holds them still. @default 1 */
  speed?: number;
}

/** How far a speck of magnetism 1 follows the pointer, as a share of its distance from the centre. */
const PULL = { medium: 0.02, strong: 0.04, subtle: 0.01 } as const;

/**
 * The three depths, far to near: share of the specks, radius (× `size`),
 * opacity, drift and twinkle pace, and magnetism (parallax).
 */
// data
const TIERS = [
  { alpha: 0.5, drift: 0.45, pull: 0.4, r: 1, share: 0.48 },
  { alpha: 0.7, drift: 0.75, pull: 1.1, r: 1.6, share: 0.82 },
  { alpha: 0.9, drift: 1.1, pull: 2.4, r: 2.5, share: 1 },
];

/** Opacity steps a frame is drawn in: one fill per step and depth. */
const STEPS = 5;

/** A number in [0, 1) for draw `i` of stream `salt` (backgrounds.md): never Math.random. */
const hash = (i: number, salt: number) => {
  let p = (((i + 1) * 12.9898 + (salt + 1) * 78.233) * 0.1031) % 1;
  p *= p + 33.33;
  p *= p + p;
  return p % 1;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Specks of dust at three depths: tiny cool ones far away, brighter ones
 * in the middle and a few large, softly glowing ones up close. Each drifts
 * on its own and twinkles gently; with the pointer over the box they lean
 * toward it, the near ones most, so the field moves in parallax. A small
 * 2D canvas behind the content runs one frame loop while it's on screen;
 * with reduced motion it draws one still frame and ignores the pointer.
 *
 * @cssvar --particles-color The specks' color (the text color, `--foreground`).
 */
export const Particles = (props: ParticlesProps) => {
  const {
    count = 300,
    driftX = 0,
    driftY = 0,
    intensity = "medium",
    interactive = true,
    particleColor,
    size = 1.2,
    speed = 1,
    className,
    children,
    ...rest
  } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // The near specks' halo, drawn once per color and stamped on each.
    const halo = new OffscreenCanvas(64, 64).getContext("2d");
    if (!(root && canvas && ctx && halo)) {
      return;
    }
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    // The seeded stream: draw n of salt 0, the same field on every visit.
    const rand = () => {
      n += 1;
      return hash(n, 0);
    };
    let pointer: { x: number; y: number } | null = null;
    // The box in CSS pixels (not `w`/`h`: the loop's `resize` has those),
    // the colors (near and far) and the twinkle's clock.
    let [width, height, color, far, clock] = [0, 0, "", "", 0];
    const shape = halo.createRadialGradient(32, 32, 0, 32, 32, 32);
    for (const [at, a] of [
      [0, 0.45],
      [0.25, 0.2],
      [0.55, 0.06],
      [1, 0],
    ]) {
      shape.addColorStop(at, `rgb(0 0 0 / ${a})`);
    }

    // A speck: its depth, place, offset toward the pointer, opacity, drift,
    // magnetism, and twinkle phase and pace.
    const spawn = () => {
      const roll = rand();
      const tier = TIERS.findIndex((t) => roll < t.share);
      const { drift, pull } = TIERS[tier];
      const turn = rand() * Math.PI * 2;
      const pace = (0.06 + rand() * 0.1) * drift;
      const x = rand() * width;
      const y = rand() * height;
      return {
        a: TIERS[tier].alpha * (0.75 + rand() * 0.5),
        m: pull * (0.7 + rand() * 0.6),
        ox: 0,
        oy: 0,
        phase: rand() * Math.PI * 2,
        tier,
        twinkle: (0.004 + rand() * 0.008) * drift,
        vx: Math.cos(turn) * pace,
        vy: Math.sin(turn) * pace,
        x,
        y,
      };
    };
    const specks: ReturnType<typeof spawn>[] = [];
    // The first fit seeds the field; later ones rescale it and top it up
    // to the new area's count.
    const fit = (w: number, h: number) => {
      for (const s of specks) {
        s.x *= w / width;
        s.y *= h / height;
      }
      [width, height] = [w, h];
      const total = clamp(Math.round((count * w * h) / 1_296_000), 0, 600);
      specks.length = Math.min(specks.length, total);
      while (specks.length < total) {
        specks.push(spawn());
      }
    };
    const step = (dt: number) => {
      const ease = Math.min(dt / 50, 1);
      const pull = pointer ? PULL[intensity] : 0;
      const cx = ((pointer?.x ?? 0) - width / 2) * pull;
      const cy = ((pointer?.y ?? 0) - height / 2) * pull;
      clock += dt * speed;
      for (const s of specks) {
        const depth = TIERS[s.tier].drift;
        s.x += (s.vx * speed + driftX * depth) * dt;
        s.y += (s.vy * speed + driftY * depth) * dt;
        s.ox += (cx * s.m - s.ox) * ease;
        s.oy += (cy * s.m - s.oy) * ease;
        // Out past an edge, in again at the opposite one.
        s.x = ((s.x % (width + 40)) + width + 40) % (width + 40);
        s.y = ((s.y % (height + 40)) + height + 40) % (height + 40);
      }
    };
    // Per depth, each speck joins the path of its opacity step (twinkle
    // and the 30 px edge fade included): 15 fills, plus a halo per near one.
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const paths = Array.from({ length: 3 * STEPS }, () => new Path2D());
      for (const s of specks) {
        const [x, y] = [s.x - 20 + s.ox, s.y - 20 + s.oy];
        const edge = clamp(Math.min(x, y, width - x, height - y) / 30, 0, 1);
        const glint = 0.82 + 0.18 * Math.sin(s.phase + clock * s.twinkle);
        const a = Math.min(s.a * glint * edge, 1);
        const r = TIERS[s.tier].r * size;
        const path = paths[s.tier * STEPS + Math.floor(a * (STEPS - 0.01))];
        path.moveTo(x + r, y);
        path.arc(x, y, r, 0, Math.PI * 2);
        if (s.tier === 2 && a > 0.02) {
          ctx.globalAlpha = a;
          ctx.drawImage(halo.canvas, x - r * 5, y - r * 5, r * 10, r * 10);
        }
      }
      for (const [i, path] of paths.entries()) {
        ctx.globalAlpha = ((i % STEPS) + 0.5) / STEPS;
        ctx.fillStyle = i < STEPS ? far : color;
        ctx.fill(path);
      }
    };

    // The canvas loop (backgrounds.md): the same block in every canvas background.
    let [raf, last] = [0, 0];
    const paint = () => {
      const css = getComputedStyle(canvas);
      color = css.getPropertyValue("--particles-color");
      far = css.getPropertyValue("--particles-far-color");
      // The halo in the new color: the soft shape, then the color inside it.
      halo.globalCompositeOperation = "copy";
      halo.fillStyle = shape;
      halo.fillRect(0, 0, 64, 64);
      halo.globalCompositeOperation = "source-in";
      halo.fillStyle = color;
      halo.fillRect(0, 0, 64, 64);
      // Draw now, running or not: a resize cleared the canvas after this
      // frame's draw, and a theme switch must show while paused or still.
      draw();
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      const [w, h] = [root.clientWidth, root.clientHeight];
      if (!(w && h)) {
        return; // mounted hidden: wait for a real size
      }
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
      fit(w, h);
      paint();
    };
    const frame = (time: number) => {
      step(Math.min((time - last) / 16.7, 3)); // same speed at 60 and 120 Hz
      last = time;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (!entry.isIntersecting || still) {
        return; // offscreen or reduced motion: no loop
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    });
    const ro = new ResizeObserver(resize); // fires once on observe: the first fit and draw
    const mo = new MutationObserver(paint);
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !interactive || still) {
        return;
      }
      const box = root.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const leave = () => {
      pointer = null;
    };
    const off = new AbortController();
    io.observe(root);
    ro.observe(root);
    mo.observe(document.documentElement, {
      attributeFilter: ["class", "style", "data-theme"],
    });
    mo.observe(canvas, { attributeFilter: ["style"] }); // a color prop changed
    root.addEventListener("pointermove", move, { signal: off.signal });
    root.addEventListener("pointerleave", leave, { signal: off.signal });
    return () => {
      cancelAnimationFrame(raf);
      for (const observer of [io, ro, mo]) {
        observer.disconnect();
      }
      off.abort();
    };
  }, [count, driftX, driftY, intensity, interactive, size, speed]);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden [--particles-color:var(--foreground)]",
        className
      )}
      data-slot="particles"
      ref={rootRef}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        data-slot="particles-layer"
      >
        <canvas
          className="block size-full [--particles-far-color:color-mix(in_oklab,var(--particles-color)_72%,oklch(0.62_0.13_250))]"
          data-slot="particles-canvas"
          ref={canvasRef}
          style={{ "--particles-color": particleColor } as CSSProperties}
        />
      </div>
      {children}
    </div>
  );
};
