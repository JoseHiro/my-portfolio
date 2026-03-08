"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("commandPalette.actions");
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ja" : "en";
  const handleToggle = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  const ariaLabel = locale === "en" ? t("switchJa") : t("switchEn");

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-150 ease-out",
        "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <Languages className="h-5 w-5" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
