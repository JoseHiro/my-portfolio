"use client";

import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroBackground } from "@/components/sections/HeroBackground";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function GradientOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      mouseX.set(deltaX);
      mouseY.set(deltaY);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full min-h-[280px] md:min-h-[400px] lg:min-h-0"
    >
      <motion.div
        style={{ x, y }}
        className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full select-none pointer-events-none"
        aria-hidden
      >
        {/* Outer blur layer */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-40",
            "bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-600",
            "dark:from-blue-500 dark:via-indigo-500 dark:to-blue-700",
            "blur-3xl"
          )}
        />
        {/* Middle glow */}
        <div
          className={cn(
            "absolute inset-2 rounded-full opacity-60",
            "bg-gradient-to-br from-blue-300 via-indigo-300 to-blue-500",
            "dark:from-blue-400 dark:via-indigo-400 dark:to-blue-600",
            "blur-xl"
          )}
        />
        {/* Core orb with pulse */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.85, 0.95, 0.85],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-4 md:inset-6 rounded-full",
            "bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-600",
            "dark:from-blue-500 dark:via-indigo-500 dark:to-blue-700",
            "blur-md"
          )}
        />
        {/* Inner highlight */}
        <div
          className={cn(
            "absolute inset-6 md:inset-10 rounded-full",
            "bg-gradient-to-tr from-white/30 to-transparent",
            "dark:from-white/20"
          )}
        />
      </motion.div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      aria-label="Hero"
      className={cn(
        "relative min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8",
        "items-center py-20 px-6 md:px-12 overflow-hidden",
        "bg-white dark:bg-slate-900"
      )}
    >
      <HeroBackground />
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col justify-center order-2 lg:order-1"
      >
        <motion.span
          custom={0}
          variants={item}
          className={cn(
            "inline-flex text-xs font-medium px-3 py-1 rounded-full w-fit",
            "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
          )}
        >
          {t("badge")}
        </motion.span>

        <motion.h1
          custom={1}
          variants={item}
          className={cn(
            "mt-4 text-5xl md:text-7xl font-bold leading-tight gradient-text-hover",
            "bg-gradient-to-r from-black via-gray-700 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent"
          )}
        >
          <span className="block">{t("headline1")}</span>
          <span className="block">{t("headline2")}</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={item}
          className={cn(
            "mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl"
          )}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div custom={3} variants={item} className="mt-8">
          <MagneticButton>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "inline-flex items-center justify-center min-h-[44px] h-10 px-6 text-sm font-medium rounded-lg",
                "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
                "text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
                "focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900",
                "transition-all duration-150 ease-out"
              )}
              aria-label={t("cta")}
            >
              {t("cta")}
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 order-1 lg:order-2 flex items-center justify-center"
      >
        <GradientOrb />
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="relative z-10 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:rounded-full focus-visible:outline-none transition-colors"
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
