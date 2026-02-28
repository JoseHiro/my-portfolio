"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Sun, Moon, Globe, Share2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 300;
const SCROLL_TOP_DURATION = 800;

const fabVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const menuContainerVariants = {
  closed: {
    opacity: 0,
    pointerEvents: "none" as const,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  open: {
    opacity: 1,
    pointerEvents: "auto" as const,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const miniButtonVariants = {
  closed: { opacity: 0, y: 8, scale: 0.8 },
  open: { opacity: 1, y: 0, scale: 1 },
};

function scrollToTop() {
  const start = window.scrollY;
  const startTime = performance.now();
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SCROLL_TOP_DURATION, 1);
    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2; // ease-in-out
    window.scrollTo(0, start * (1 - ease));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function FloatingActionButton() {
  const [showFAB, setShowFAB] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as "en" | "ja";

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setShowFAB(y > SCROLL_THRESHOLD);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? Math.min((y / docHeight) * 100, 100) : 0);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const toggleLocale = useCallback(() => {
    router.replace(pathname, { locale: locale === "en" ? "ja" : "en" });
  }, [router, pathname, locale]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const title = document.title;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        await navigator.clipboard.writeText(url);
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }, []);

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {showFAB && (
        <motion.div
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end md:bottom-8 md:right-8 relative"
          aria-label="Back to top and quick actions"
        >
          {/* Optional: expanded mini buttons (desktop only) */}
          <motion.div
            className="absolute bottom-full right-0 hidden flex-col-reverse items-center gap-2 pb-2 md:flex"
            variants={menuContainerVariants}
            initial="closed"
            animate={expanded ? "open" : "closed"}
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
          >
            <motion.button
              type="button"
              variants={miniButtonVariants}
              onClick={handleShare}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-shadow",
                "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
              aria-label="Share page"
            >
              <Share2 className="h-5 w-5" strokeWidth={2} />
            </motion.button>
            <motion.button
              type="button"
              variants={miniButtonVariants}
              onClick={toggleLocale}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-shadow",
                "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
              aria-label="Switch language"
            >
              <Globe className="h-5 w-5" strokeWidth={2} />
            </motion.button>
            <motion.button
              type="button"
              variants={miniButtonVariants}
              onClick={toggleTheme}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-shadow",
                "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Moon className="h-5 w-5" strokeWidth={2} />
              )}
            </motion.button>
          </motion.div>

          {/* Main FAB with optional progress ring */}
          <motion.div
            className="relative"
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Progress ring (optional enhancement) */}
            <svg
              className="absolute inset-0 -m-[2px] h-12 w-12 -rotate-90 md:h-14 md:w-14"
              viewBox="0 0 56 56"
              aria-hidden
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-200/50 dark:text-slate-600/50"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="url(#fab-ring-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 * (1 - scrollProgress / 100)}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              />
              <defs>
                <linearGradient id="fab-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            <button
              type="button"
              onClick={scrollToTop}
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-shadow md:h-14 md:w-14",
                "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
                "text-white hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
              aria-label="Back to top"
            >
              <ChevronUp className="h-5 w-5 md:h-7 md:w-7" strokeWidth={2.5} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
