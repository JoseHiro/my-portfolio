"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = { damping: 30, stiffness: 100 };
const MOVE_PX = 40;

type OrbConfig = {
  size: number;
  colors: string;
  colorsDark: string;
  position: string;
  positionStyle?: React.CSSProperties;
  blur: number;
  opacity: number;
  opacityDark: number;
  moveX: number;
  moveY: number;
};

const ORBS: OrbConfig[] = [
  {
    size: 600,
    colors: "radial-gradient(circle, #87CEEB 0%, #00CED1 70%, transparent 100%)",
    colorsDark: "radial-gradient(circle, #4a7a8a 0%, #0d5a5c 70%, transparent 100%)",
    position: "left-0 top-0",
    positionStyle: { marginLeft: "-10%", marginTop: "-15%" },
    blur: 100,
    opacity: 0.3,
    opacityDark: 0.15,
    moveX: -1,
    moveY: -1,
  },
  {
    size: 500,
    colors: "radial-gradient(circle, #8B5CF6 0%, #EC4899 70%, transparent 100%)",
    colorsDark: "radial-gradient(circle, #5a3d99 0%, #8b2a5c 70%, transparent 100%)",
    position: "right-0 top-0",
    positionStyle: { marginRight: "-5%", marginTop: "-10%" },
    blur: 100,
    opacity: 0.25,
    opacityDark: 0.15,
    moveX: 1,
    moveY: -0.6,
  },
  {
    size: 700,
    colors: "radial-gradient(circle, #3B82F6 0%, #6366F1 70%, transparent 100%)",
    colorsDark: "radial-gradient(circle, #1e4a7a 0%, #3234a0 70%, transparent 100%)",
    position: "left-1/2 bottom-0 -translate-x-1/2",
    positionStyle: { marginBottom: "-30%" },
    blur: 120,
    opacity: 0.2,
    opacityDark: 0.12,
    moveX: -0.75,
    moveY: 1,
  },
];

function useThrottledMouse(throttleMs = 16) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const last = useRef(0);
  const raf = useRef<number | null>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const t = Date.now();
        if (t - last.current < throttleMs) return;
        last.current = t;
        const x = typeof window !== "undefined" ? e.clientX / window.innerWidth : 0.5;
        const y = typeof window !== "undefined" ? e.clientY / window.innerHeight : 0.5;
        mouseX.set(x);
        mouseY.set(y);
      });
    },
    [mouseX, mouseY, throttleMs]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [handleMove, handleLeave]);

  return { mouseX, mouseY };
}

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(true);
  const { mouseX, mouseY } = useThrottledMouse(16);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);
    const handler = () => setIsPointerFine(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const normalizedX = useTransform(mouseX, [0, 1], [-0.5, 0.5]);
  const normalizedY = useTransform(mouseY, [0, 1], [-0.5, 0.5]);

  const orb1X = useSpring(useTransform(normalizedX, (v) => v * ORBS[0].moveX * MOVE_PX), SPRING);
  const orb1Y = useSpring(useTransform(normalizedY, (v) => v * ORBS[0].moveY * MOVE_PX), SPRING);
  const orb2X = useSpring(useTransform(normalizedX, (v) => v * ORBS[1].moveX * MOVE_PX), SPRING);
  const orb2Y = useSpring(useTransform(normalizedY, (v) => v * ORBS[1].moveY * MOVE_PX), SPRING);
  const orb3X = useSpring(useTransform(normalizedX, (v) => v * ORBS[2].moveX * MOVE_PX), SPRING);
  const orb3Y = useSpring(useTransform(normalizedY, (v) => v * ORBS[2].moveY * MOVE_PX), SPRING);

  const orbStyles = [
    { x: orb1X, y: orb1Y },
    { x: orb2X, y: orb2Y },
    { x: orb3X, y: orb3Y },
  ] as const;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 min-h-screen overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {ORBS.map((orb, i) => (
        <Orb
          key={i}
          config={orb}
          motionStyle={orbStyles[i]}
          isPointerFine={isPointerFine}
        />
      ))}
    </div>
  );
}

function Orb({
  config,
  motionStyle,
  isPointerFine,
}: {
  config: OrbConfig;
  motionStyle: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> };
  isPointerFine: boolean;
}) {
  const { size, colors, colorsDark, position, positionStyle, blur, opacity, opacityDark } = config;

  return (
    <motion.div
      className={cn("absolute rounded-full will-change-transform", position)}
      style={{
        width: size,
        height: size,
        ...positionStyle,
        ...(isPointerFine ? { x: motionStyle.x, y: motionStyle.y } : {}),
      }}
      {...(!isPointerFine && {
        animate: {
          x: [0, 12, -8, 0],
          y: [0, -10, 6, 0],
        },
        transition: {
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      })}
    >
      <div
        className={cn("w-full h-full rounded-full dark:hidden transition-opacity duration-300")}
        style={{
          background: colors,
          filter: `blur(${blur}px)`,
          opacity,
          willChange: "transform",
        }}
      />
      <div
        className={cn("hidden dark:block w-full h-full rounded-full transition-opacity duration-300")}
        style={{
          background: colorsDark,
          filter: `blur(${blur}px)`,
          opacity: opacityDark,
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}
