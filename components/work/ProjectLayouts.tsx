"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Shared: image placeholder grid ───────────────────────────────────────────

function ImageGrid({ images, count = 3, dark = false }: { images: string[]; count?: number; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const slots = Array.from({ length: count });

  return (
    <div ref={ref} className="flex gap-4 justify-center flex-wrap">
      {slots.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          className={cn(
            "rounded-2xl overflow-hidden shrink-0",
            i === 0 ? "w-full max-w-sm aspect-[4/3]" : "w-40 aspect-square",
            dark
              ? "bg-gray-700"
              : "bg-gray-200 dark:bg-gray-700"
          )}
        >
          {images[i] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={images[i]} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ── Back link ─────────────────────────────────────────────────────────────────

function BackLink({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/work"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60",
        dark ? "text-white/60" : "text-gray-400 dark:text-gray-500"
      )}
    >
      ← All work
    </Link>
  );
}

// ── Style 1: Editorial ────────────────────────────────────────────────────────
// Clean, magazine-style. Big numbered title, asymmetric image layout, feature grid.

export function EditorialLayout({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Nav */}
        <div className="pt-10 pb-6">
          <BackLink />
        </div>

        {/* Hero */}
        <header ref={heroRef} className="pt-8 pb-16 border-b border-gray-100 dark:border-gray-800">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4"
          >
            {project.year} · {project.tags.join(" · ")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed"
          >
            {project.description}
          </motion.p>
        </header>

        {/* Images */}
        <section className="py-16">
          <ImageGrid images={project.images} count={3} />
        </section>

        {/* Features */}
        <section className="py-16 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
            Features
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <p className="text-xs font-mono text-gray-300 dark:text-gray-600 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-base font-bold text-black dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

// ── Style 2: Split ────────────────────────────────────────────────────────────
// Dark hero, bold typography, alternating light/dark sections.

export function SplitLayout({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">

      {/* Dark hero */}
      <section className="bg-black dark:bg-gray-950 text-white min-h-[60vh] flex flex-col justify-end pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="pt-10 mb-10">
            <BackLink dark />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4"
          >
            {project.year} · {project.tags.join(" · ")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-5xl md:text-8xl font-bold leading-none mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Images — light section */}
      <section className="bg-gray-50 dark:bg-slate-800 py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ImageGrid images={project.images} count={3} />
        </div>
      </section>

      {/* Features — dark section */}
      <section className="bg-black dark:bg-gray-950 text-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-12">
            Features
          </p>
          <div className="divide-y divide-gray-800">
            {project.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-8 py-8"
              >
                <span className="text-sm font-mono text-gray-600 w-6 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

// ── Style 3: WIP ──────────────────────────────────────────────────────────────
// White base, green accents, in-progress feel.

export function WipLayout({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        <div className="pt-10 pb-6">
          <BackLink />
        </div>

        {/* Hero */}
        <header className="pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Currently building
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed"
          >
            {project.description}
          </motion.p>
        </header>

        {/* Dashed image placeholders */}
        <section className="py-10">
          <div className="flex gap-4 flex-wrap justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className={cn(
                  "rounded-2xl border-2 border-dashed border-emerald-200 dark:border-gray-600",
                  "flex items-center justify-center text-emerald-300 dark:text-gray-600 text-sm font-medium",
                  "overflow-hidden",
                  i === 0 ? "w-full max-w-sm aspect-[4/3]" : "w-40 aspect-square"
                )}
              >
                {project.images[i] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.images[i]} alt="" className="w-full h-full object-cover" />
                ) : (
                  "Coming soon"
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Planned features */}
        <section className="py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
            Planned features
          </p>
          <div className="flex flex-col gap-4">
            {project.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-xl",
                  "border border-emerald-100 dark:border-gray-700",
                  "bg-emerald-50/50 dark:bg-slate-800"
                )}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-black dark:text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
