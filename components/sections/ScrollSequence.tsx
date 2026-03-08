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
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// ── Thumbnail images (fill first N slots, rest stay gray) ─────
const THUMBNAILS = [
  "/img/thumbnails/caralibro_thumbnail.webp",
  "/img/thumbnails/nihonkun_thumbnail.webp",
  "/img/thumbnails/realtime_chat_thumbnail.webp",
  "/img/thumbnails/seekr_thumbnail.webp",
  "/img/thumbnails/Ventri_thumbnail.webp",
  "/img/thumbnails/trust_wall_thumbnail.webp",
];

// ── Constants ─────────────────────────────────────────────────
const IMAGE_COUNT = 8;
const BOX = 110;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const DIAG_STEP_X = 62;
const DIAG_STEP_Y = 44;
const GRID_GAP = 12;

const CARD_W = 220;
const CARD_H = 200;
const CARD_GAP = 24;

const SERVICES = [
  {
    title: "Website Development",
    desc: "Full-stack web apps and platforms built with modern frameworks — fast, responsive, and scalable.",
    tags: "React · Next.js · TypeScript",
  },
  {
    title: "Landing Pages",
    desc: "Conversion-focused one-pagers with clean design, fast load times, and clear CTAs.",
    tags: "Next.js · Tailwind · SEO",
  },
  {
    title: "AI Projects",
    desc: "Custom chatbots and AI integrations that enhance user experience using the latest models.",
    tags: "OpenAI · LangChain · APIs",
  },
];

// ── Position helpers ──────────────────────────────────────────

function getHeroX(i: number, vw: number): number {
  const maxSpan = Math.min(vw * 0.88, IMAGE_COUNT * BOX + (IMAGE_COUNT - 1) * 14);
  return -maxSpan / 2 + i * (maxSpan / (IMAGE_COUNT - 1));
}
function getDiagX(i: number) {
  return -((IMAGE_COUNT - 1) * DIAG_STEP_X) / 2 + i * DIAG_STEP_X;
}
function getDiagY(i: number) {
  return -((IMAGE_COUNT - 1) * DIAG_STEP_Y) / 2 + i * DIAG_STEP_Y;
}
function getGridPos(i: number) {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const gW = 4 * BOX + 3 * GRID_GAP;
  const gH = 2 * BOX + GRID_GAP;
  return {
    x: -gW / 2 + BOX / 2 + col * (BOX + GRID_GAP),
    y: -gH / 2 + BOX / 2 + row * (BOX + GRID_GAP),
  };
}
// Service card x positions (3 cards centered)
function getCardX(i: number) {
  return (i - 1) * (CARD_W + CARD_GAP); // -1, 0, +1 × step
}
const CARD_Y = 165; // px below sticky-div center (below image + heading block)

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

// ── Scroll phase boundaries (400vh → 0–1) ─────────────────────
// S1 hero      0.00 – 0.25
// S1→S2        0.11 – 0.26
// S2 pitch     0.26 – 0.43
// S2→S3        0.43 – 0.51
// S3 grid      0.51 – 0.66
// S3→S4        0.66 – 0.76
// S4 services  0.76 – 1.00
const P = {
  collapseEnd:  0.15, // S1 collapse done
  travelEnd:    0.26, // stack at right column, title gone
  diagEnd:      0.40, // S2 diagonal fully open
  diagHold:     0.43, // hold diagonal
  collapseS3:   0.51, // S3 grid starts opening
  gridEnd:      0.66, // 4×2 grid fully open
  gridHold:     0.70, // hold grid
  collapseGrid: 0.76, // grid collapsed to center
  cardFadeIn:   0.80, // image boxes faded out, cards start spreading
  cardEnd:      0.93, // service cards fully spread
};

export function ScrollSequence() {
  const t = useTranslations("hero");
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

  // ── Image motion values ───────────────────────────────────
  const titleOp = useMotionValue(0);
  const titleY  = useMotionValue(300);

  const IMAGE_FINAL_Y = 55;
  const IMAGE_START_Y = 350;

  const xMvs  = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)), []);
  const yMvs  = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(IMAGE_START_Y)), []);
  const opMvs = useMemo(() => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)), []);

  // ── Service card motion values ────────────────────────────
  const cxMvs = useMemo(() => Array.from({ length: 3 }, () => motionValue(0)), []);
  const cyMvs = useMemo(() => Array.from({ length: 3 }, () => motionValue(CARD_Y)), []);
  const copMvs= useMemo(() => Array.from({ length: 3 }, () => motionValue(0)), []);

  // "What I Build" heading
  const wibOp = useMotionValue(0);
  const wibY  = useMotionValue(20);

  const [animDone, setAnimDone] = useState(false);

  // ── Time-based entrance ───────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function run() {
      await Promise.all([
        animate(titleOp, 1, { duration: 0.75, ease: EASE }),
        animate(titleY,  0, { duration: 0.75, ease: EASE }),
      ]);
      if (cancelled) return;
      await Promise.all([
        ...yMvs.map((mv) => animate(mv, IMAGE_FINAL_Y, { duration: 0.55, ease: EASE })),
        ...opMvs.map((mv) => animate(mv, 1,             { duration: 0.45, ease: EASE })),
      ]);
      if (cancelled) return;
      await Promise.all(
        xMvs.map((mv, i) => animate(mv, getHeroX(i, vw), { duration: 0.65, ease: EASE }))
      );
      if (cancelled) return;
      setAnimDone(true);
    }
    const timer = setTimeout(run, 150);
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll-driven animation ───────────────────────────────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!animDone) return;
    const handler = (v: number) => {

      // S1: hero collapse
      if (v <= P.collapseEnd) {
        const t = v / P.collapseEnd;
        xMvs.forEach((mv, i) => mv.set(getHeroX(i, vw) * (1 - t)));
        yMvs.forEach((mv)    => mv.set(IMAGE_FINAL_Y));
        opMvs.forEach((mv)   => mv.set(1));
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S1→S2: travel right + title fade
      else if (v <= P.travelEnd) {
        const t = (v - P.collapseEnd) / (P.travelEnd - P.collapseEnd);
        xMvs.forEach((mv)    => mv.set(lerp(0, rightOffset, t)));
        yMvs.forEach((mv)    => mv.set(lerp(IMAGE_FINAL_Y, yPitch, t)));
        opMvs.forEach((mv)   => mv.set(1));
        titleOp.set(lerp(1, 0, Math.min(1, t * 1.6)));
        titleY.set(lerp(0, -28, t));
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S2: diagonal fan
      else if (v <= P.diagEnd) {
        const t = (v - P.travelEnd) / (P.diagEnd - P.travelEnd);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset, rightOffset + getDiagX(i), t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch, yPitch + getDiagY(i), t)));
        opMvs.forEach((mv)   => mv.set(1));
        titleOp.set(0);
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S2 hold
      else if (v <= P.diagHold) {
        xMvs.forEach((mv, i) => mv.set(rightOffset + getDiagX(i)));
        yMvs.forEach((mv, i) => mv.set(yPitch + getDiagY(i)));
        opMvs.forEach((mv)   => mv.set(1));
        titleOp.set(0);
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S2→S3: collapse diagonal
      else if (v <= P.collapseS3) {
        const t = (v - P.diagHold) / (P.collapseS3 - P.diagHold);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset + getDiagX(i), rightOffset, t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch + getDiagY(i), yPitch, t)));
        opMvs.forEach((mv)   => mv.set(1));
        titleOp.set(0);
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S3: 4×2 grid open
      else if (v <= P.gridEnd) {
        const t = (v - P.collapseS3) / (P.gridEnd - P.collapseS3);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset, rightOffset + getGridPos(i).x, t)));
        yMvs.forEach((mv, i) => mv.set(lerp(yPitch, getGridPos(i).y, t)));
        opMvs.forEach((mv)   => mv.set(1));
        titleOp.set(0);
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S3 hold
      else if (v <= P.gridHold) {
        xMvs.forEach((mv, i) => mv.set(rightOffset + getGridPos(i).x));
        yMvs.forEach((mv, i) => mv.set(getGridPos(i).y));
        opMvs.forEach((mv)   => mv.set(1));
        titleOp.set(0);
        wibOp.set(0); wibY.set(20);
        copMvs.forEach((mv)  => mv.set(0));
      }

      // S3→S4: collapse grid + image boxes fade out
      else if (v <= P.collapseGrid) {
        const t = (v - P.gridHold) / (P.collapseGrid - P.gridHold);
        xMvs.forEach((mv, i) => mv.set(lerp(rightOffset + getGridPos(i).x, 0, t)));
        yMvs.forEach((mv, i) => mv.set(lerp(getGridPos(i).y, 0, t)));
        opMvs.forEach((mv)   => mv.set(lerp(1, 0, t)));
        titleOp.set(0);
        cxMvs.forEach((mv)   => mv.set(0));
        copMvs.forEach((mv)  => mv.set(0));
        // WIB heading starts to fade in
        wibOp.set(lerp(0, 0.5, t));
        wibY.set(lerp(20, 0, t));
      }

      // S4: service cards spread open (image boxes already gone)
      else if (v <= P.cardEnd) {
        const t = (v - P.collapseGrid) / (P.cardEnd - P.collapseGrid);
        opMvs.forEach((mv)   => mv.set(0));
        cxMvs.forEach((mv, i) => mv.set(lerp(0, getCardX(i), t)));
        cyMvs.forEach((mv)    => mv.set(CARD_Y));
        copMvs.forEach((mv)   => mv.set(Math.min(1, t * 1.4)));
        wibOp.set(Math.min(1, lerp(0.5, 1, t)));
        wibY.set(0);
        titleOp.set(0);
      }

      // S4 final
      else {
        opMvs.forEach((mv)    => mv.set(0));
        cxMvs.forEach((mv, i) => mv.set(getCardX(i)));
        cyMvs.forEach((mv)    => mv.set(CARD_Y));
        copMvs.forEach((mv)   => mv.set(1));
        wibOp.set(1);
        wibY.set(0);
        titleOp.set(0);
      }
    };
    const unsubscribe = scrollYProgress.on("change", handler);
    handler(scrollYProgress.get()); // sync current position immediately
    return unsubscribe;
  }, [animDone, scrollYProgress, xMvs, yMvs, opMvs, cxMvs, cyMvs, copMvs,
      rightOffset, yPitch, vw, titleOp, titleY, wibOp, wibY]);

  // ── useTransform for section text opacities ───────────────

  // S2 pitch text
  const pitchOp = useTransform(
    scrollYProgress,
    [0.20, 0.32, P.diagHold, P.collapseS3],
    [0,    1,    1,           0]
  );
  const pitchTY = useTransform(scrollYProgress, [0.20, 0.32], [20, 0]);

  // S3 text
  const s3Op = useTransform(
    scrollYProgress,
    [P.collapseS3, P.collapseS3 + 0.09, P.gridHold, P.collapseGrid],
    [0,            1,                    1,           0]
  );
  const s3TY = useTransform(scrollYProgress, [P.collapseS3, P.collapseS3 + 0.09], [20, 0]);

  // Scroll hint
  const hintOp = useTransform(scrollYProgress, [0, 0.07, 0.17, 0.24], [0, 1, 1, 0]);

  return (
    <div ref={wrapperRef} style={{ height: "400vh" }}>
      <div className={cn("sticky top-0 h-screen overflow-hidden", "bg-white dark:bg-slate-900")}>

        {/* ── Hero title ─────────────────────────────────────── */}
        <div className="absolute top-[38%] left-0 right-0 flex justify-center pointer-events-none select-none">
          <motion.h1
            style={{ opacity: titleOp, y: titleY }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center text-black dark:text-white px-6 w-full"
          >
            This is my art work.
          </motion.h1>
        </div>

        {/* ── Image boxes (sections 1–3) ─────────────────────── */}
        {xMvs.map((xMv, i) => (
          <motion.div
            key={i}
            style={{
              x: xMv, y: yMvs[i], opacity: opMvs[i],
              width: BOX, height: BOX,
              marginLeft: -BOX / 2, marginTop: -BOX / 2,
            }}
            className="absolute top-1/2 left-1/2 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 will-change-transform"
          >
            {THUMBNAILS[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={THUMBNAILS[i]}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        ))}

        {/* ── Section 4: illustration + heading (stacked) ───────── */}
        <div className="absolute top-[8%] left-0 right-0 flex justify-center pointer-events-none select-none z-10">
          <motion.div style={{ opacity: wibOp, y: wibY }} className="flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/IMG_8886.webp"
              alt="Josey at laptop"
              width={140}
              height={168}
              className="object-contain drop-shadow-sm"
            />
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Services
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white">
                What I Build
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ── Section 4: service cards ───────────────────────── */}
        {cxMvs.map((cxMv, i) => (
          <motion.div
            key={`card-${i}`}
            style={{
              x: cxMv, y: cyMvs[i], opacity: copMvs[i],
              width: CARD_W, height: CARD_H,
              marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2,
            }}
            className={cn(
              "absolute top-1/2 left-1/2 will-change-transform",
              "rounded-2xl border border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-slate-800 p-6 flex flex-col gap-3"
            )}
          >
            <h3 className="text-base font-bold text-black dark:text-white leading-snug">
              {SERVICES[i].title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
              {SERVICES[i].desc}
            </p>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {SERVICES[i].tags}
            </span>
          </motion.div>
        ))}

        {/* ── Section 2: pitch text ──────────────────────────── */}
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
            Beautify your<br />website
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

        {/* ── Section 3: grid text ───────────────────────────── */}
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
            {t("headline1")}<br />{t("headline2")}
          </h2>
          <a
            href="/work"
            className={cn(
              "pointer-events-auto inline-flex items-center justify-center px-7 py-3 rounded-lg",
              "bg-black dark:bg-white text-white dark:text-black",
              "text-sm font-medium hover:opacity-70 transition-opacity duration-150"
            )}
          >
            View all work
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
