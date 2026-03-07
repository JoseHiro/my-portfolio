"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useAnimation, useScroll, motionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const IMAGE_COUNT = 6;
const BOX_SIZE = 150;
const GAP = 12;

function getSpreadX(index: number) {
  const totalWidth = IMAGE_COUNT * BOX_SIZE + (IMAGE_COUNT - 1) * GAP;
  const start = -totalWidth / 2 + BOX_SIZE / 2;
  return start + index * (BOX_SIZE + GAP);
}

function ImageStack({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const controls = useAnimation();
  const [animDone, setAnimDone] = useState(false);
  const xMvs = useMemo(
    () => Array.from({ length: IMAGE_COUNT }, () => motionValue(0)),
    []
  );

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    async function sequence() {
      // Phase 1: all rise up together (stacked)
      await controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      });
      // Phase 2: spread out to sides
      await controls.start((i: number) => ({
        x: getSpreadX(i),
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
      }));
      // Switch to scroll-driven mode
      xMvs.forEach((mv, i) => mv.set(getSpreadX(i)));
      setAnimDone(true);
    }
    const timer = setTimeout(sequence, 900);
    return () => clearTimeout(timer);
  }, [controls, xMvs]);

  // Collapse on scroll as hero exits viewport
  useEffect(() => {
    if (!animDone) return;
    return scrollYProgress.on("change", (v) => {
      const collapse = 1 - Math.max(0, Math.min(1, (v - 0.3) / 0.5));
      xMvs.forEach((mv, i) => mv.set(getSpreadX(i) * collapse));
    });
  }, [animDone, scrollYProgress, xMvs]);

  return (
    <div className="relative flex justify-center mt-12" style={{ height: BOX_SIZE }}>
      {Array.from({ length: IMAGE_COUNT }).map((_, i) =>
        animDone ? (
          <motion.div
            key={i}
            style={{ x: xMvs[i], width: BOX_SIZE, height: BOX_SIZE }}
            className="absolute rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        ) : (
          <motion.div
            key={i}
            custom={i}
            animate={controls}
            initial={{ y: 60, x: 0, opacity: 0 }}
            style={{ width: BOX_SIZE, height: BOX_SIZE }}
            className="absolute rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        )
      )}
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
        "bg-white dark:bg-slate-900"
      )}
    >
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-center text-black dark:text-white px-6"
      >
        This is my art work.
      </motion.h1>

      <ImageStack heroRef={heroRef} />

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus-visible:outline-none transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
