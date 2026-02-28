"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Globe, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_KEYS = ["website", "ai", "feature"] as const;
const ICONS = [Globe, Sparkles, Zap] as const;

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  }),
};

const headerItem = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
});

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function Services() {
  const t = useTranslations("services");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="services"
      className={cn(
        "py-24 px-6 md:px-12",
        "bg-slate-50 dark:bg-slate-900",
        "scroll-mt-24"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <motion.header
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={headerItem(0)}
            className={cn(
              "block text-sm font-medium uppercase tracking-widest mb-3",
              "text-blue-600 dark:text-blue-400"
            )}
          >
            {t("overline")}
          </motion.span>
          <motion.h2
            variants={headerItem(0.05)}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={headerItem(0.1)}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            {t("subtitle")}
          </motion.p>
        </motion.header>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SERVICE_KEYS.map((key, index) => {
            const Icon = ICONS[index];
            const tags = t(`${key}.tags`).split(", ");
            return (
              <motion.article
                key={key}
                custom={index}
                variants={cardItem}
                className={cn(
                  "group relative p-8 rounded-2xl",
                  "border border-gray-200 dark:border-gray-800",
                  "bg-transparent",
                  "hover:border-blue-400 dark:hover:border-blue-400",
                  "hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-transparent dark:hover:from-blue-900/10 dark:hover:to-transparent",
                  "hover:-translate-y-1",
                  "hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_0_24px_-6px_rgba(59,130,246,0.25)]",
                  "transition-all duration-300 ease-out"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                    "bg-blue-100 dark:bg-blue-900/50",
                    "text-slate-700 dark:text-slate-300",
                    "group-hover:scale-110 group-hover:rotate-[5deg] group-hover:text-blue-600 dark:group-hover:text-blue-400",
                    "transition-transform duration-300 ease-out"
                  )}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {t(`${key}.title`)}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {t(`${key}.description`)}
                </p>

                <div className="inline-flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      title={tag}
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full cursor-pointer inline-block",
                        "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
                        "hover:scale-105 hover:-translate-y-0.5 hover:bg-gray-300 dark:hover:bg-gray-700",
                        "transition-all duration-200 ease-out"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
