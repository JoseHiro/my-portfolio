"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useActiveSection, type SectionId } from "@/hooks/useActiveSection";

const SECTION_IDS: SectionId[] = ["about", "work", "services", "contact"];

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const t = useTranslations("header");
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(100);
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 80], [64, 56]);
  const boxShadow = useTransform(
    scrollY,
    [0, 80],
    [
      "0 0 0 rgba(0,0,0,0)",
      "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)",
    ]
  );

  const navLinks = [
    { label: t("about"), href: "#about", id: "about" as SectionId },
    { label: t("work"), href: "#work", id: "work" as SectionId },
    { label: t("services"), href: "#services", id: "services" as SectionId },
    { label: t("contact"), href: "#contact", id: "contact" as SectionId },
  ];

  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      style={{
        height: headerHeight,
        boxShadow,
      }}
      className={cn(
        "sticky top-0 z-50 flex w-full items-center justify-between",
        "border-b border-gray-200 dark:border-gray-800",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg",
        "px-6 md:px-12 transition-[background-color,border-color] duration-150"
      )}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="font-bold text-lg text-black dark:text-white shrink-0 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label={t("logo")}
      >
        {t("logo")}
      </a>

      <nav aria-label="Main navigation" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-8">
        {navLinks.map(({ label, href, id }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              smoothScrollTo(href);
            }}
            className={cn(
              "nav-link-underline text-sm font-medium min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md",
              "text-gray-700 dark:text-gray-300",
              "hover:text-blue-600 dark:hover:text-blue-400",
              "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              "transition-all duration-200 ease-out",
              activeSection === id && "text-blue-600 dark:text-blue-400 font-semibold nav-link-active"
            )}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3 shrink-0">
        <LanguageToggle />

        {mounted && <ThemeToggle />}

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className={cn(
            "md:hidden min-h-[44px] min-w-[44px] h-11 w-11 flex flex-col items-center justify-center gap-1.5 rounded-md",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-slate-100 dark:hover:bg-slate-800",
            "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            "transition-all duration-150 ease-out"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              "w-4 h-0.5 bg-current rounded-full transition-all duration-150",
              mobileOpen && "rotate-45 translate-y-1"
            )}
          />
          <span
            className={cn(
              "w-4 h-0.5 bg-current rounded-full transition-all duration-150",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "w-4 h-0.5 bg-current rounded-full transition-all duration-150",
              mobileOpen && "-rotate-45 -translate-y-1"
            )}
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 top-[64px] z-40 bg-black/20 dark:bg-black/40 md:hidden"
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <motion.nav
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="absolute left-0 right-0 top-full z-50 overflow-hidden md:hidden border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg"
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                smoothScrollTo(href);
              }}
              className={cn(
                "nav-link-underline min-h-[44px] py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg flex items-center",
                "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "transition-all duration-200 ease-out",
                activeSection === id && "text-blue-600 dark:text-blue-400 font-semibold nav-link-active"
              )}
            >
              {label}
            </a>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
