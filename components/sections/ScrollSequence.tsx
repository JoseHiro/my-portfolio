"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  motionValue,
  animate,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const IMAGE_COUNT = 8; // 4×2 grid in section 3
const BOX = 110;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const DIAG_STEP_X = 62;
const DIAG_STEP_Y = 44;
const GRID_GAP = 12;

// ── Position helpers ───────────────────────────────────────────

// Section 1: hero horizontal spread
function getHeroX(i: number, vw: number): number {
  const maxSpan = Math.min(vw * 0.88, IMAGE_COUNT * BOX + (IMAGE_COUNT - 1) * 14);
  const step = maxSpan / (IMAGE_COUNT - 1);
  return -maxSpan / 2 + i * step;
}

// Section 2: diagonal fan
function getDiagX(i: number): number {
  return -((IMAGE_COUNT - 1) * DIAG_STEP_X) / 2 + i * DIAG_STEP_X;
}
function getDiagY(i: number): number {
  return -((IMAGE_COUNT - 1) * DIAG_STEP_Y) / 2 + i * DIAG_STEP_Y;
}

// Section 3: 4×2 grid (relative to the grid center)
function getGridPos(i: number): { x: number; y: number } {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const gridW = 4 * BOX + 3 * GRID_GAP;
  const gridH = 2 * BOX + GRID_GAP;
  return {
    x: -gridW / 2 + BOX / 2 + col * (BOX + GRID_GAP),
    y: -gridH / 2 + BOX / 2 + row * (BOX + GRID_GAP),
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

// ── Scroll phase boundaries (300vh wrapper, 0→1) ───────────────
// Section 1 (hero):     0    – 0.33
// S1→S2 transition:     0.17 – 0.35
// Section 2 (pitch):    0.35 – 0.55
// S2→S3 transition:     0.55 – 0.70
// Section 3 (grid):     0.70 – 1.0
const P = {
  collapseEnd:   0.20,  // images collapse back to center by here
  travelEnd:     0.35,  // stack arrived at right column + title gone
  diagEnd:       0.52,  // diagonal fully open (hold until diagHold)
  diagHold:      0.57,  // start collapsing diagonal
  collapseS3:    0.67,  // diagonal collapsed, ready for grid
  gridEnd:       0.88,  // 4×2 grid fully open
};

export function ScrollSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isDesktop = vw >= 1024;
  const rightOffset = isDesktop ? vw * 0.21 : 0;
  const yPitch = isDesktop ? 0 : -60;

  // ── Motion values ────────────────────────────────────────────
  const titleOp = useMotionValue(0);
  const titleY  = useMotionValue(300);

  const IMAGE_FINAL_Y = 55;
  const IMAGE_START_Y = 350;

  const xMvs  = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)), []);
  const yMvs  = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(IMAGE_START_Y)), []);
  const opMvs = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)), []);

  const [animDone, setAnimDone] = useState(false);

  // ── Phase 1+2: time-based entrance ──────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function run() {
      // Title rises from below
      await Promise.all([
        animate(titleOp, 1, { duration: 0.75, ease: EASE }),
        animate(titleY,  0, { duration: 0.75, ease: EASE }),
      ]);
      if (cancelled) return;

      // All images rise up stacked
      await Promise.all([
        ...yMvs.map((mv) => animate(mv, IMAGE_FINAL_Y, { duration: 0.55, ease: EASE })),
        ...opMvs.map((mv) => animate(mv, 1,             { duration: 0.45, ease: EASE })),
      ]);
      if (cancelled) return;

      // Split open to the sides
      await Promise.all(
        xMvs.map((mv, i) =>
          animate(mv, getHeroX(i, vw), { duration: 0.65, ease: EASE })
        )
      );
      if (cancelled) return;
      setAnimDone(true);
    }
    const timer = setTimeout(run, 150);
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Phase 3–8: scroll-driven ─────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!animDone) return;
    return scrollYProgress.on("change", (v) => {

      // ── S1: collapse hero spread ──────────────────────────────
      if (v <= P.collapseEnd) {
        const t = v / P.collapseEnd;
        xMvs.forEach((mv, i) => mv.set(getHeroX(i, vw) * (1 - t)));
        yMvs.forEach((mv)    => mv.set(IMAGE_FINAL_Y));
      }

      // ── S1→S2: travel to right + title fade ──────────────────
      else if (v <= P.travelEnd) {
        const t = (v - P.collapseEnd) / (P.travelEnd - P.collapseEnd);
        xMvs.forEach((mv)    => mv.set(lerp(0, rightOffset, t)));
        yMvs.forEach((mv)    => mv.set(lerp(IMAGE_FINAL_Y, yPitch, t)));
        titleOp.set(lerp(1, 0, Math.min(1, t * 1.6)));
        titleY.set(lerp(0, -28, t));
      }

      // ── S2: diagonal fan open ─────────────────────────────────
      else if (v <= P.diagEnd) {
        const t = (v - P.travelEnd) / (P.diagEnd - P.travelEnd);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset, rightOffset + getDiagX(i), t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch, yPitch + getDiagY(i), t)));
        titleOp.set(0);
      }

      // ── S2 hold ───────────────────────────────────────────────
      else if (v <= P.diagHold) {
        xMvs.forEach((mv, i) => mv.set(rightOffset + getDiagX(i)));
        yMvs.forEach((mv, i) => mv.set(yPitch + getDiagY(i)));
        titleOp.set(0);
      }

      // ── S2→S3: collapse diagonal back to center ───────────────
      else if (v <= P.collapseS3) {
        const t = (v - P.diagHold) / (P.collapseS3 - P.diagHold);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset + getDiagX(i), rightOffset, t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch + getDiagY(i), yPitch, t)));
        titleOp.set(0);
      }

      // ── S3: open into 4×2 grid ────────────────────────────────
      else if (v <= P.gridEnd) {
        const t = (v - P.collapseS3) / (P.gridEnd - P.collapseS3);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset, rightOffset + getGridPos(i).x, t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch, getGridPos(i).y, t)));
        titleOp.set(0);
      }

      // ── Final state ───────────────────────────────────────────
      else {
        xMvs.forEach((mv, i) => mv.set(rightOffset + getGridPos(i).x));
        yMvs.forEach((mv, i) => mv.set(getGridPos(i).y));
        titleOp.set(0);
      }
    });
  }, [animDone, scrollYProgress, xMvs, yMvs, rightOffset, yPitch, vw, titleOp, titleY]);

  // ── Text opacities via useTransform ──────────────────────────

  // Section 2 pitch text: fade in, then fade out before section 3
  const pitchOp = useTransform(
    scrollYProgress,
    [0.28, 0.42, P.diagHold, P.collapseS3],
    [0,    1,    1,           0]
  );
  const pitchTY = useTransform(scrollYProgress, [0.28, 0.42], [20, 0]);

  // Section 3 text: fade in when grid opens
  const s3Op = useTransform(scrollYProgress, [P.collapseS3, P.collapseS3 + 0.12], [0, 1]);
  const s3TY = useTransform(scrollYProgress, [P.collapseS3, P.collapseS3 + 0.12], [20, 0]);

  // Scroll hint
  const hintOp = useTransform(scrollYProgress, [0, 0.08, 0.20, 0.28], [0, 1, 1, 0]);

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
      <div className={cn("sticky top-0 h-screen overflow-hidden", "bg-white dark:bg-slate-900")}>

        {/* ── Hero title ──────────────────────────────────────── */}
        <div className="absolute top-[38%] left-0 right-0 flex justify-center pointer-events-none select-none">
          <motion.h1
            style={{ opacity: titleOp, y: titleY }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center text-black dark:text-white px-6 w-full"
          >
            This is my art work.
          </motion.h1>
        </div>

        {/* ── Images ─────────────────────────────────────────── */}
        {xMvs.map((xMv, i) => (
          <motion.div
            key={i}
            style={{
              x: xMv,
              y: yMvs[i],
              opacity: opMvs[i],
              width: BOX,
              height: BOX,
              marginLeft: -BOX / 2,
              marginTop: -BOX / 2,
            }}
            className="absolute top-1/2 left-1/2 rounded-xl bg-gray-200 dark:bg-gray-700 will-change-transform"
          />
        ))}

        {/* ── Section 2: pitch text ───────────────────────────
              Mobile: bottom center
              Desktop: left half vertically centered           */}
        <motion.div
          style={{ opacity: pitchOp, y: pitchTY }}
          className={cn(
            "absolute flex flex-col gap-5 pointer-events-none",
            "bottom-[10%] left-1/2 -translate-x-1/2 text-center items-center",
            "lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-[10%] lg:translate-x-0 lg:text-left lg:items-start lg:pointer-events-auto"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            I will make, built
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white">
            Beautify your
            <br />
            website
          </h2>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "inline-flex w-fit items-center justify-center px-7 py-3 rounded-lg",
              "bg-black dark:bg-white text-white dark:text-black",
              "text-sm font-medium hover:opacity-70 transition-opacity duration-150"
            )}
          >
            Contact
          </a>
        </motion.div>

        {/* ── Section 3: grid text ────────────────────────────
              Same responsive layout as section 2               */}
        <motion.div
          style={{ opacity: s3Op, y: s3TY }}
          className={cn(
            "absolute flex flex-col gap-5 pointer-events-none",
            "bottom-[10%] left-1/2 -translate-x-1/2 text-center items-center",
            "lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-[10%] lg:translate-x-0 lg:text-left lg:items-start lg:pointer-events-auto"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            My work
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white">
            Lorem ipsum
            <br />
            Lorem ipsum
          </h2>
        </motion.div>

        {/* ── Scroll hint ─────────────────────────────────────── */}
        <motion.div
          style={{ opacity: hintOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 pointer-events-none select-none"
        >
          <span className="text-xs font-medium">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" aria-hidden />
          </motion.span>
        </motion.div>

      </div>
    </div>
  );
}
