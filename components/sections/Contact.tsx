"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/contact/ContactForm";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
] as const;

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const socialBlock = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

const socialLabel = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const socialIconsWrap = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

const socialIcon = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Contact() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="contact"
      className={cn(
        "py-32 px-6 md:px-12 text-center scroll-mt-24",
        "bg-gradient-to-b from-white to-blue-50/80 dark:from-slate-900 dark:to-slate-900"
      )}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.span
          variants={item}
          className={cn(
            "block text-sm font-medium uppercase tracking-wide mb-4",
            "text-blue-600 dark:text-blue-400"
          )}
        >
          {t("overline")}
        </motion.span>

        <motion.h2
          variants={item}
          className={cn(
            "text-4xl md:text-6xl font-bold mb-6 gradient-text-hover",
            "bg-gradient-to-r from-black via-gray-600 to-gray-700 dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent"
          )}
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div variants={item} className="mb-10">
          <ContactForm />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-8"
        >
          <MagneticButton>
            <a
              href="mailto:hello@example.com"
              className="hover:text-blue-600 dark:hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded px-1"
              aria-label={t("ctaPrimary")}
            >
              {t("ctaPrimary")}
            </a>
          </MagneticButton>
          <span aria-hidden>·</span>
          <MagneticButton>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded px-1"
              aria-label={t("ctaSecondary")}
            >
              {t("ctaSecondary")}
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={socialBlock}
          className="mt-12"
        >
          <motion.p
            variants={socialLabel}
            className="text-sm text-gray-500 dark:text-gray-500 mb-4"
          >
            {t("socialLabel")}
          </motion.p>
          <motion.div
            variants={socialIconsWrap}
            className="flex items-center justify-center gap-4"
          >
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                variants={socialIcon}
                className={cn(
                  "min-h-[44px] min-w-[44px] w-11 h-11 rounded-full flex items-center justify-center",
                  "text-gray-600 dark:text-gray-400",
                  "hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500",
                  "hover:-translate-y-0.5 hover:rotate-[360deg] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  "transition-[color,background-color,transform] duration-400 ease-out"
                )}
              >
                <social.icon className="w-5 h-5" aria-hidden />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.footer
          variants={item}
          className={cn(
            "mt-24 pt-8 border-t border-gray-200 dark:border-gray-800",
            "flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-500"
          )}
        >
          <span>{tFooter("copyright")}</span>
          <span>{tFooter("builtWith")}</span>
        </motion.footer>
      </motion.div>
    </section>
  );
}
