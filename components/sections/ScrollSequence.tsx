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

const IMAGE_COUNT = 6;
const BOX = 130;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const DIAG_STEP_X = 22;
const DIAG_STEP_Y = 16;

// Hero spread: scale with viewport so images never clip off screen
function getHeroX(i: number, vw: number): number {
  const maxSpan = Math.min(vw * 0.88, IMAGE_COUNT * BOX + (IMAGE_COUNT - 1) * 14);
  const step = maxSpan / (IMAGE_COUNT - 1);
  return -maxSpan / 2 + i * step;
}

function getDiagX(i: number): number {
  return -((IMAGE_COUNT - 1) * DIAG_STEP_X) / 2 + i * DIAG_STEP_X;
}
function getDiagY(i: number): number {
  return -((IMAGE_COUNT - 1) * DIAG_STEP_Y) / 2 + i * DIAG_STEP_Y;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

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

  // ── Title motion values ─────────────────────────────────────
  // Wrapper positions title at ~38% from top (above center to leave room for images)
  // The motion y is relative to that wrapper position
  const titleOp = useMotionValue(0);
  const titleY  = useMotionValue(300); // starts well below wrapper position

  // ── Image motion values ─────────────────────────────────────
  // Images sit at top-1/2, so y=0 → image center at 50% of viewport
  // We want image center ~55% (just below screen center, below title)
  // so final y = +imageTargetY below center
  const IMAGE_FINAL_Y = 60; // px below 50% line (center of images in hero)
  const IMAGE_START_Y = 350; // off screen start position

  const xMvs  = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)), []);
  const yMvs  = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(IMAGE_START_Y)), []);
  const opMvs = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)), []);

  // ── Animation state ──────────────────────────────────────────
  const [animDone, setAnimDone] = useState(false);

  // Phase 1+2: time-based entrance
  useEffect(() => {
    let cancelled = false;

    async function run() {
      // 1. Title rises up from below to its centered position
      await Promise.all([
        animate(titleOp, 1, { duration: 0.75, ease: EASE }),
        animate(titleY,  0, { duration: 0.75, ease: EASE }),
      ]);

      if (cancelled) return;

      // 2. All images rise up together (still stacked)
      await Promise.all([
        ...yMvs.map((mv) => animate(mv, IMAGE_FINAL_Y, { duration: 0.55, ease: EASE })),
        ...opMvs.map((mv) => animate(mv, 1, { duration: 0.45, ease: EASE })),
      ]);

      if (cancelled) return;

      // 3. Split open to the sides
      await Promise.all(
        xMvs.map((mv, i) =>
          animate(mv, getHeroX(i, vw), { duration: 0.65, ease: EASE })
        )
      );

      if (cancelled) return;
      setAnimDone(true);
    }

    const timer = setTimeout(run, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase 3–5: scroll-driven
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!animDone) return;

    return scrollYProgress.on("change", (v) => {
      // Collapse (0 → 0.30): images fold back to center
      if (v <= 0.30) {
        const t = v / 0.30;
        xMvs.forEach((mv, i) => mv.set(getHeroX(i, vw) * (1 - t)));
        yMvs.forEach((mv) => mv.set(IMAGE_FINAL_Y));
        // title still visible
      }
      // Travel to right column (0.30 → 0.52): stack moves + title fades out
      else if (v <= 0.52) {
        const t = (v - 0.30) / 0.22;
        xMvs.forEach((mv) => mv.set(lerp(0, rightOffset, t)));
        yMvs.forEach((mv) => mv.set(lerp(IMAGE_FINAL_Y, yPitch, t)));
        titleOp.set(lerp(1, 0, t * 1.4)); // fade title out quickly
        titleY.set(lerp(0, -30, t));
      }
      // Diagonal spread (0.52 → 0.75): fan out
      else if (v <= 0.75) {
        const t = (v - 0.52) / 0.23;
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset, rightOffset + getDiagX(i), t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch, yPitch + getDiagY(i), t)));
        titleOp.set(0); // title is completely gone
      }
      // Final state
      else {
        xMvs.forEach((mv, i) => mv.set(rightOffset + getDiagX(i)));
        yMvs.forEach((mv, i) => mv.set(yPitch + getDiagY(i)));
        titleOp.set(0);
      }
    });
  }, [animDone, scrollYProgress, xMvs, yMvs, rightOffset, yPitch, vw, titleOp, titleY]);

  // Pitch text fades in during travel/spread
  const pitchOp = useTransform(scrollYProgress, [0.42, 0.65], [0, 1]);
  const pitchTY = useTransform(scrollYProgress, [0.42, 0.65], [20, 0]);

  // Scroll hint
  const hintOp = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.32], [0, 1, 1, 0]);

  return (
    <div ref={wrapperRef} style={{ height: "200vh" }}>
      <div
        className={cn(
          "sticky top-0 h-screen overflow-hidden",
          "bg-white dark:bg-slate-900"
        )}
      >
        {/* ── Hero title ──────────────────────────────────────────
            Wrapper is statically positioned at ~38% from top,
            centered horizontally. The inner h1 animates via
            motion values (no conflicting Tailwind transforms).  */}
        <div className="absolute top-[38%] left-0 right-0 flex justify-center pointer-events-none select-none">
          <motion.h1
            style={{ opacity: titleOp, y: titleY }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center text-black dark:text-white px-6 w-full"
          >
            This is my art work.
          </motion.h1>
        </div>

        {/* ── Images ─────────────────────────────────────────────
            Each starts stacked at (left:50%, top:50%) and then
            x/y motion values drive the animation.               */}
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

        {/* ── Pitch section text ──────────────────────────────────
            Mobile: centered at bottom
            Desktop: left half, vertically centered             */}
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
