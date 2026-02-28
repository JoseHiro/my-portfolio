"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en" as const, label: "EN" },
  { code: "ja" as const, label: "JP" },
] as const;

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (nextLocale: "en" | "ja") => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-0 text-sm">
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-0">
          {i > 0 && (
            <span className="px-1 text-gray-300 dark:text-gray-600">|</span>
          )}
          <button
            type="button"
            onClick={() => handleSwitch(code)}
            className={cn(
              "min-h-[44px] min-w-[44px] h-10 px-3 rounded-md font-medium transition-all duration-150 ease-out flex items-center justify-center",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              locale === code
                ? "font-bold text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-500"
            )}
            aria-label={locale === code ? `Current language: ${label}` : `Switch to ${label}`}
            aria-current={locale === code ? "true" : undefined}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
