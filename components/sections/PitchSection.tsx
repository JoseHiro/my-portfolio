"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const DIAG_COUNT = 5;
const BOX_SIZE = 140;
const DIAG_STEP_X = 22;
const DIAG_STEP_Y = 16;

function DiagonalImages() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  // Center the whole diagonal group
  const groupOffsetX = -((DIAG_COUNT - 1) * DIAG_STEP_X) / 2;
  const groupOffsetY = -((DIAG_COUNT - 1) * DIAG_STEP_Y) / 2;
  const containerH = BOX_SIZE + (DIAG_COUNT - 1) * DIAG_STEP_Y + 20;

  return (
    <div
      ref={ref}
      className="relative flex justify-center"
      style={{ height: containerH }}
    >
      {Array.from({ length: DIAG_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  x: groupOffsetX + i * DIAG_STEP_X,
                  y: groupOffsetY + i * DIAG_STEP_Y,
                  opacity: 1,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute rounded-xl bg-gray-200 dark:bg-gray-700"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}
        />
      ))}
    </div>
  );
}

export function PitchSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className={cn(
        "min-h-screen flex items-center px-6 md:px-16",
        "bg-white dark:bg-slate-900"
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-6xl mx-auto">
        {/* Left: text */}
        <div className="flex flex-col justify-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500"
          >
            I will make, built
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white"
          >
            Beautify your
            <br />
            website
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "inline-flex items-center justify-center px-7 py-3 rounded-lg",
                "bg-black dark:bg-white text-white dark:text-black",
                "text-sm font-medium hover:opacity-75 transition-opacity duration-150"
              )}
            >
              Contact
            </a>
          </motion.div>
        </div>

        {/* Right: diagonal image stack */}
        <div className="flex items-center justify-center">
          <DiagonalImages />
        </div>
      </div>
    </section>
  );
}
