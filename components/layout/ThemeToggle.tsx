"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const t = useTranslations("header");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const isDark = theme === "dark";

  // Desktop: w-20 (80px), indicator w-9 (36px), padding 4px → slide 36px
  // Mobile: w-16 (64px), indicator w-7 (28px), padding 4px → slide 28px
  const indicatorOffset = isDark ? (isMobile ? 28 : 36) : 0;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMobile(!mq.matches);
    const handler = () => setIsMobile(!window.matchMedia("(min-width: 768px)").matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  if (!mounted) {
    return (
      <div
        className="w-16 h-8 md:w-20 md:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-800"
        aria-hidden
      />
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {tooltip && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 text-xs font-medium whitespace-nowrap pointer-events-none z-10"
          >
            {isDark ? t("themeLight") : t("themeDark")}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={toggleTheme}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        onFocus={() => setTooltip(true)}
        onBlur={() => setTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative w-16 h-8 md:w-20 md:h-10 rounded-full border-2",
          "border-gray-200 dark:border-gray-700",
          "shadow-sm hover:shadow-md transition-shadow duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900",
          "cursor-pointer overflow-hidden"
        )}
        aria-label={isDark ? t("themeLight") : t("themeDark")}
      >
        {/* Split background */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-amber-50 dark:bg-amber-950/30" />
          <div className="bg-slate-800 dark:bg-indigo-950/50" />
        </div>

        {/* Icons - fixed positions, rotate on theme change */}
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
          <motion.span
            key={isDark ? "sun" : "sun-active"}
            initial={{ rotate: 0 }}
            animate={{ rotate: !isDark ? 360 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex"
          >
            <Sun
              className={cn(
                "h-3.5 w-3.5 md:h-4 md:w-4 transition-colors duration-300",
                !isDark ? "text-amber-500" : "text-gray-500"
              )}
              strokeWidth={2}
            />
          </motion.span>
          <motion.span
            key={isDark ? "moon-active" : "moon"}
            initial={{ rotate: 0 }}
            animate={{ rotate: isDark ? 360 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex"
          >
            <Moon
              className={cn(
                "h-3.5 w-3.5 md:h-4 md:w-4 transition-colors duration-300",
                isDark ? "text-indigo-300" : "text-gray-500"
              )}
              strokeWidth={2}
            />
          </motion.span>
        </div>

        {/* Sliding indicator */}
        <motion.div
          animate={{ x: indicatorOffset }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            "absolute top-1 left-1 w-7 h-7 md:w-9 md:h-9 rounded-full shadow-md",
            "flex items-center justify-center",
            isDark ? "bg-slate-800" : "bg-white"
          )}
        >
          {/* Small icon inside indicator for clarity (optional) */}
          <span className="sr-only">{isDark ? t("themeDark") : t("themeLight")}</span>
        </motion.div>
      </motion.button>
    </div>
  );
}
