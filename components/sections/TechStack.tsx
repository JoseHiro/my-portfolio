"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiAmazon,
} from "react-icons/si";
import { Section, Container } from "@/components/ui";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const ROW1 = [
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiHtml5, name: "HTML5" },
  { Icon: SiCss3, name: "CSS3" },
];

const ROW2 = [
  { Icon: SiPython, name: "Python" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiFirebase, name: "Firebase" },
  { Icon: SiGit, name: "Git" },
  { Icon: SiGithub, name: "GitHub" },
  { Icon: SiVercel, name: "Vercel" },
  { Icon: SiAmazon, name: "AWS" },
];

function MarqueeRow({
  items,
  direction,
  isPaused,
  isMobile,
}: {
  items: typeof ROW1;
  direction: "left" | "right";
  isPaused: boolean;
  isMobile: boolean;
}) {
  const animationClass = isMobile
    ? "animate-marquee-mobile"
    : direction === "left"
      ? "animate-marquee-left"
      : "animate-marquee-right";

  return (
    <div className="overflow-hidden py-2">
      <div
        className={cn("flex w-max gap-4", animationClass)}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {[...items, ...items].map(({ Icon, name }, i) => (
          <TechCard key={`${name}-${i}`} Icon={Icon} name={name} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

function TechCard({
  Icon,
  name,
  isMobile,
}: {
  Icon: (props: { className?: string; size?: number }) => React.ReactElement;
  name: string;
  isMobile: boolean;
}) {
  return (
    <motion.div
      className="group flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 w-20 h-20 md:w-24 md:h-24 cursor-default"
      whileHover={{
        y: -4,
        scale: 1.05,
        boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15), 0 4px 8px -4px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="flex items-center justify-center [&_svg]:shrink-0 grayscale group-hover:grayscale-0 transition-[filter] duration-300">
        <Icon size={40} className="text-slate-700 dark:text-slate-200" />
      </span>
      <span className="sr-only">{name}</span>
    </motion.div>
  );
}

export function TechStack() {
  const t = useTranslations("techStack");
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Section
      spacing="md"
      className="bg-slate-50 dark:bg-slate-900 py-12 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container maxWidth="full" className="px-0">
        <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">
          {t("title")}
        </p>

        {/* Desktop: two rows */}
        <div className="hidden md:block">
          <MarqueeRow
            items={ROW1}
            direction="left"
            isPaused={isPaused}
            isMobile={false}
          />
          <MarqueeRow
            items={ROW2}
            direction="right"
            isPaused={isPaused}
            isMobile={false}
          />
        </div>

        {/* Mobile: single row */}
        <div className="md:hidden">
          <MarqueeRow
            items={[...ROW1, ...ROW2]}
            direction="left"
            isPaused={isPaused}
            isMobile={true}
          />
        </div>
      </Container>
    </Section>
  );
}
