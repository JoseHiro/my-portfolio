"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, Container, Heading } from "@/components/ui";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;
const TRANSITION_MS = 400;

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: TRANSITION_MS / 1000, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: TRANSITION_MS / 1000, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type TestimonialKey = "1" | "2" | "3" | "4";
const TESTIMONIAL_KEYS: TestimonialKey[] = ["1", "2", "3", "4"];

function TestimonialCard({
  index,
  quote,
  name,
  role,
  company,
  initial,
}: {
  index: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  initial: string;
}) {
  return (
    <motion.div
      layout
      className={cn(
        "mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800 md:p-12"
      )}
    >
      <Quote
        className="text-blue-500 dark:text-blue-400 mb-4 shrink-0 opacity-20"
        size={48}
        strokeWidth={1.5}
        aria-hidden
      />
      <blockquote className="text-lg leading-relaxed italic text-slate-700 dark:text-slate-300 md:text-xl line-clamp-4">
        {quote}
      </blockquote>
      <footer className="mt-8 flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-600 dark:bg-slate-600 dark:text-slate-200"
          aria-hidden
        >
          {initial}
        </div>
        <div>
          <cite className="not-italic font-semibold text-slate-900 dark:text-slate-100">
            {name}
          </cite>
          <p className="text-sm text-slate-600 dark:text-slate-400">{role}</p>
          <p className="text-sm text-slate-500 dark:text-slate-500">{company}</p>
        </div>
      </footer>
    </motion.div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(0);
  indexRef.current = index;

  const goTo = useCallback((nextIndex: number, nextDir?: number) => {
    const n = TESTIMONIAL_KEYS.length;
    const i = ((nextIndex % n) + n) % n;
    setDirection(nextDir ?? (nextIndex > indexRef.current ? 1 : -1));
    setIndex(i);
  }, []);

  const goPrev = useCallback(() => goTo(index - 1, -1), [index, goTo]);
  const goNext = useCallback(() => goTo(index + 1, 1), [index, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      const next = (indexRef.current + 1) % TESTIMONIAL_KEYS.length;
      setDirection(1);
      setIndex(next);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <Section
      id="testimonials"
      spacing="md"
      className="scroll-mt-24 bg-slate-50 dark:bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container maxWidth="lg">
        <header className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {t("overline")}
          </p>
          <Heading as="h2" size="lg" className="mb-3">
            {t("title")}
          </Heading>
          <p className="text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </header>

        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white md:h-12 md:w-12"
            aria-label={t("prevLabel")}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          </button>

          <div className="relative min-h-[280px] w-full overflow-hidden md:min-h-[320px]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              {TESTIMONIAL_KEYS.map((key, i) => {
                if (i !== index) return null;
                return (
                  <motion.div
                    key={key}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <TestimonialCard
                      index={i}
                      quote={t(`items.${key}.quote`)}
                      name={t(`items.${key}.name`)}
                      role={t(`items.${key}.role`)}
                      company={t(`items.${key}.company`)}
                      initial={t(`items.${key}.initial`)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white md:h-12 md:w-12"
            aria-label={t("nextLabel")}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIAL_KEYS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                i === index
                  ? "bg-blue-500 dark:bg-blue-400"
                  : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
              )}
              aria-label={t("goToLabel", { index: i + 1 })}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
