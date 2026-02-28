"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 150, damping: 15 };
const INFLUENCE_RADIUS = 50;
const MAX_DISPLACEMENT = 12;
const PULL_FACTOR = 0.25;

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, SPRING);
  const ySpring = useSpring(y, SPRING);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);
    const handler = () => setEnabled(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const update = useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current;
      if (!el || !enabled) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > INFLUENCE_RADIUS) {
        x.set(0);
        y.set(0);
        return;
      }
      let tx = deltaX * PULL_FACTOR;
      let ty = deltaY * PULL_FACTOR;
      const mag = Math.sqrt(tx * tx + ty * ty);
      if (mag > MAX_DISPLACEMENT) {
        const scale = MAX_DISPLACEMENT / mag;
        tx *= scale;
        ty *= scale;
      }
      x.set(tx);
      y.set(ty);
    },
    [enabled, x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onLeave = () => reset();
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, update, reset]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      className={cn("inline-flex", className)}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
