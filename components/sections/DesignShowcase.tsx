"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Section, Container, Heading } from "@/components/ui";
import {
  DESIGN_SLUGS,
  DESIGN_CONFIG,
  designSlugToItemKey,
  type DesignSlug,
} from "@/lib/designs";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function DesignCard({
  slug,
  index,
  isInView,
}: {
  slug: DesignSlug;
  index: number;
  isInView: boolean;
}) {
  const t = useTranslations("designShowcase");
  const config = DESIGN_CONFIG[slug];
  const itemKey = designSlugToItemKey(slug);
  const templateName = t(`items.${itemKey}.templateName`);
  const industry = t(`items.${itemKey}.industry`);
  const badge = t(`items.${itemKey}.badge`);
  const viewDemo = t("viewDemo");

  const imageUrl = `https://picsum.photos/seed/${config.imageSeed}/640/400`;

  return (
    <motion.article
      variants={cardItem}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <Link
        href={`/designs/${slug}`}
        aria-label={`${viewDemo}: ${templateName}`}
        className={cn(
          "block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700",
          "bg-slate-100 dark:bg-slate-800",
          "shadow-lg hover:shadow-2xl hover:-translate-y-2",
          "transition-all duration-300 ease-out",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        )}
      >
        {/* Browser frame mockup - 16:10 */}
        <div className="relative aspect-[16/10] overflow-hidden bg-white dark:bg-slate-900">
          {/* Browser chrome - macOS style */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex gap-1.5">
              <Circle className="h-2.5 w-2.5 fill-red-500 stroke-red-500" strokeWidth={0} />
              <Circle className="h-2.5 w-2.5 fill-amber-500 stroke-amber-500" strokeWidth={0} />
              <Circle className="h-2.5 w-2.5 fill-emerald-500 stroke-emerald-500" strokeWidth={0} />
            </div>
            <div className="ml-4 flex flex-1 items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-600 dark:bg-slate-700">
              <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                https://{config.domain}
              </span>
            </div>
          </div>
          {/* Screenshot area */}
          <div className="absolute inset-0 top-9 overflow-hidden">
            <Image
              src={imageUrl}
              alt=""
              width={640}
              height={400}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            {/* Hover overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "flex flex-col justify-between p-4"
              )}
            >
              <span className="self-start rounded-md bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {badge}
              </span>
              <div className="flex flex-col items-center gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-slate-900 text-sm",
                    "translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  )}
                >
                  {viewDemo}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {config.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Info below card */}
        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {templateName}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {industry}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["React", "Tailwind", "Responsive", "Animations"].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function DesignShowcase() {
  const t = useTranslations("designShowcase");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  return (
    <Section
      ref={ref}
      id="design-showcase"
      spacing="md"
      className="scroll-mt-24 bg-slate-50 dark:bg-slate-900/50"
    >
      <Container maxWidth="lg">
        <motion.header
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 text-center"
        >
          <motion.p
            variants={cardItem}
            className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400"
          >
            {t("overline")}
          </motion.p>
          <Heading as="h2" size="lg" className="mb-3">
            {t("title")}
          </Heading>
          <motion.p
            variants={cardItem}
            className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400"
          >
            {t("subtitle")}
          </motion.p>
        </motion.header>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {DESIGN_SLUGS.map((slug, index) => (
            <DesignCard
              key={slug}
              slug={slug}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
