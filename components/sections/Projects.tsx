"use client";

import { useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurImage } from "@/components/ui/BlurImage";

const FALLBACK_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export type ProjectCategory = "website" | "ai" | "feature";
export type BentoSize = "1x1" | "1x2" | "2x1" | "2x2";

export interface Project {
  id: string;
  category: ProjectCategory;
  image: string;
  link: string;
  size: BentoSize;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  { id: "1", category: "website", image: "https://picsum.photos/seed/project1/800/800", link: "#", size: "2x2", featured: true },
  { id: "2", category: "website", image: "https://picsum.photos/seed/project2/600/450", link: "#", size: "1x1" },
  { id: "3", category: "ai", image: "https://picsum.photos/seed/project3/600/450", link: "#", size: "1x1" },
  { id: "4", category: "ai", image: "https://picsum.photos/seed/project4/600/450", link: "#", size: "1x2" },
  { id: "5", category: "feature", image: "https://picsum.photos/seed/project5/600/450", link: "#", size: "2x1" },
  { id: "6", category: "feature", image: "https://picsum.photos/seed/project6/600/450", link: "#", size: "1x1" },
];

const FILTER_KEYS: { value: "all" | ProjectCategory; key: string }[] = [
  { value: "all", key: "filterAll" },
  { value: "website", key: "filterWebsites" },
  { value: "ai", key: "filterAI" },
  { value: "feature", key: "filterFeatures" },
];

const cardExit = { opacity: 0, scale: 0.95, transition: { duration: 0.25 } };

const hoverBySize = {
  "2x2": "hover:scale-[1.02] hover:shadow-2xl",
  "1x2": "hover:-translate-y-1 hover:shadow-xl",
  "2x1": "hover:shadow-xl",
  "1x1": "hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/15",
};

function BentoCard({
  project,
  index,
  isInView,
  title,
  description,
  tags,
  categoryLabel,
  viewProject,
  blurDataURL,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  title: string;
  description: string;
  tags: string[];
  categoryLabel: string;
  viewProject: string;
  blurDataURL: string;
}) {
  const size = project.size;
  const isLarge = size === "2x2";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : { opacity: 0, y: 24 }
      }
      exit={cardExit}
      className={cn(
        "bento-span-" + size,
        "group relative rounded-2xl overflow-hidden min-h-[280px]",
        "border border-gray-200 dark:border-gray-800",
        "hover:border-blue-400/80 dark:hover:border-blue-400/60",
        hoverBySize[size],
        "transition-all duration-300 ease-out"
      )}
    >
      <MagneticButton className="absolute inset-0 block h-full w-full">
        <a href={project.link} className="block absolute inset-0 h-full w-full" aria-label={title}>
          <div className="absolute inset-0">
            <BlurImage
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              blurDataURL={blurDataURL}
              loading="lazy"
              className={cn(
                "object-cover",
                "group-hover:blur-[2px] group-hover:brightness-75 group-hover:scale-105",
                "transition-all duration-400 ease-out"
              )}
            />
          </div>

          {/* Overlay: always visible for large, on hover for others */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent",
              "p-4 md:p-5 lg:p-6 flex flex-col justify-end",
              isLarge
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
            )}
          >
            <h3
              className={cn(
                "font-bold text-white mb-1 md:mb-2",
                isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-gray-300 mb-2 md:mb-3",
                isLarge ? "text-sm md:text-base line-clamp-3" : "text-sm line-clamp-2"
              )}
            >
              {description}
            </p>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
              {tags.slice(0, isLarge ? undefined : 3).map((tag) => (
                <span
                  key={tag}
                  title={tag}
                  className="text-xs px-2 py-0.5 md:py-1 rounded-full bg-white/20 text-white cursor-pointer inline-block hover:bg-white/35 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-2 font-medium text-white/90 group-hover:text-white transition-colors duration-300",
                isLarge
                  ? "text-base md:text-lg px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 mt-1 w-fit"
                  : "text-sm"
              )}
            >
              {viewProject}
              <ArrowRight className={cn("transition-transform duration-300 group-hover:translate-x-0.5", isLarge ? "w-5 h-5" : "w-4 h-4")} />
            </span>
          </div>

          <span
            className={cn(
              "absolute top-3 right-3 md:top-4 md:right-4 text-xs font-medium px-2 py-0.5 md:px-3 md:py-1 rounded-full",
              "backdrop-blur-md bg-white/10 text-white"
            )}
          >
            {categoryLabel}
          </span>
        </a>
      </MagneticButton>
    </motion.article>
  );
}

const CATEGORY_KEYS: Record<ProjectCategory, string> = {
  website: "categoryWebsite",
  ai: "categoryAI",
  feature: "categoryFeature",
};

export function Projects({
  blurDataUrls = {},
}: {
  blurDataUrls?: Record<string, string>;
}) {
  const t = useTranslations("projects");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.12, once: true });
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section
      ref={ref}
      id="work"
      className={cn(
        "py-24 px-6 md:px-12",
        "bg-white dark:bg-slate-950",
        "scroll-mt-24"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <span
            className={cn(
              "block text-sm font-medium uppercase tracking-wide mb-3",
              "text-blue-600 dark:text-blue-400"
            )}
          >
            {t("overline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("filterLabel")}>
            {FILTER_KEYS.map(({ value, key }) => (
              <MagneticButton key={value}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === value}
                  aria-label={t(key)}
                  onClick={() => setFilter(value)}
                  className={cn(
                    "text-sm px-4 py-2 min-h-[44px] rounded-full font-medium transition-all duration-300 ease-out",
                    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    filter === value
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {t(key)}
                </button>
              </MagneticButton>
            ))}
          </div>
        </header>

        <motion.div
          role="tabpanel"
          aria-label={t("title")}
          className="bento-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <BentoCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                title={t(`items.${project.id}.title`)}
                description={t(`items.${project.id}.description`)}
                tags={t(`items.${project.id}.tags`).split(", ")}
                categoryLabel={t(CATEGORY_KEYS[project.category])}
                viewProject={t("viewProject")}
                blurDataURL={blurDataUrls[project.image] ?? FALLBACK_BLUR}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
