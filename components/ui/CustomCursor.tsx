"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { damping: 25, stiffness: 200 };
  const xSpring = useSpring(useTransform(x, (v) => v - 6), spring);
  const ySpring = useSpring(useTransform(y, (v) => v - 6), spring);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = () => setIsPointer(true);
    const onOut = () => setIsPointer(false);

    document.addEventListener("mousemove", onMove);
    document.body.addEventListener("pointerover", onOver, true);
    document.body.addEventListener("pointerout", onOut, true);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("pointerover", onOver, true);
      document.body.removeEventListener("pointerout", onOut, true);
    };
  }, [mounted, x, y]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block w-3 h-3"
      style={{
        x: xSpring,
        y: ySpring,
      }}
      aria-hidden
    >
      <motion.span
        className="block w-full h-full rounded-full bg-blue-500/80 dark:bg-blue-400/80"
        animate={{
          scale: isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.5 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
