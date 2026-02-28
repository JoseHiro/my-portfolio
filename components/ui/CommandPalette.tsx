"use client";

import { useEffect, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderOpen,
  Wrench,
  Mail,
  Moon,
  Sun,
  Languages,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "hello@example.com";

const PROJECT_IDS = ["1", "2", "3", "4", "5", "6"] as const;
const PROJECT_LINKS: Record<string, string> = {
  "1": "#",
  "2": "#",
  "3": "#",
  "4": "#",
  "5": "#",
  "6": "#",
};

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const t = useTranslations("commandPalette");
  const tProjects = useTranslations("projects");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const switchLocale = useCallback(
    (locale: "en" | "ja") => {
      router.replace(pathname, { locale });
    },
    [router, pathname]
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          label="Command palette"
          overlayClassName={cn(
            "fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm",
            "transition-opacity duration-200 ease-out"
          )}
          contentClassName={cn(
            "fixed left-1/2 top-[15%] z-[101] w-full max-w-xl -translate-x-1/2",
            "rounded-xl border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-slate-900 shadow-2xl",
            "overflow-hidden transition-all duration-200 ease-out"
          )}
        >
          <CommandInput
            placeholder={t("placeholder")}
            className={cn(
              "h-12 w-full border-0 border-b border-gray-200 dark:border-gray-700",
              "bg-transparent px-4 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:ring-0 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            )}
          />
          <CommandList className="max-h-[min(70vh,400px)] overflow-auto p-2">
            <CommandEmpty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found.
            </CommandEmpty>

            <CommandGroup
              heading={
                <span className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {t("groups.navigation")}
                </span>
              }
              className="[&_[cmdk-group-heading]]:hidden"
            >
              <CommandItem
                value={t("nav.home")}
                keywords={["top", "home"]}
                onSelect={() => {
                  scrollToSection("top");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800",
                  "data-[disabled]:pointer-events-none"
                )}
              >
                <Home className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("nav.home")}
              </CommandItem>
              <CommandItem
                value={t("nav.about")}
                keywords={["about"]}
                onSelect={() => {
                  scrollToSection("about");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <User className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("nav.about")}
              </CommandItem>
              <CommandItem
                value={t("nav.work")}
                keywords={[t("nav.projects"), "work", "projects"]}
                onSelect={() => {
                  scrollToSection("work");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <Briefcase className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("nav.work")}
              </CommandItem>
              <CommandItem
                value={t("nav.services")}
                onSelect={() => {
                  scrollToSection("services");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <Wrench className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("nav.services")}
              </CommandItem>
              <CommandItem
                value={t("nav.contact")}
                onSelect={() => {
                  scrollToSection("contact");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <Mail className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("nav.contact")}
              </CommandItem>
            </CommandGroup>

            <CommandGroup
              heading={
                <span className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5">
                  <FolderOpen className="h-3.5 w-3.5" />
                  {t("groups.projects")}
                </span>
              }
              className="[&_[cmdk-group-heading]]:hidden"
            >
              {PROJECT_IDS.map((id) => {
                const title = tProjects(`items.${id}.title`);
                const link = PROJECT_LINKS[id] ?? "#";
                return (
                  <CommandItem
                    key={id}
                    value={title}
                    onSelect={() => {
                      setOpen(false);
                      window.location.href = link;
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                      "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                    )}
                  >
                    <FolderOpen className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                    {title}
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandGroup
              heading={
                <span className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5">
                  <Languages className="h-3.5 w-3.5" />
                  {t("groups.actions")}
                </span>
              }
              className="[&_[cmdk-group-heading]]:hidden"
            >
              <CommandItem
                value={t("actions.toggleDark")}
                keywords={["theme", "dark", "light"]}
                onSelect={() => {
                  toggleTheme();
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Moon className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                )}
                {t("actions.toggleDark")}
              </CommandItem>
              <CommandItem
                value={t("actions.switchEn")}
                keywords={["english", "en"]}
                onSelect={() => {
                  switchLocale("en");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <Languages className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("actions.switchEn")}
              </CommandItem>
              <CommandItem
                value={t("actions.switchJa")}
                keywords={["japanese", "ja", "日本語"]}
                onSelect={() => {
                  switchLocale("ja");
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <Languages className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("actions.switchJa")}
              </CommandItem>
              <CommandItem
                value={t("actions.copyEmail")}
                keywords={["email", "copy", "contact"]}
                onSelect={() => {
                  copyEmail();
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                  "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                )}
              >
                <Copy className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                {t("actions.copyEmail")}
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-end gap-4 border-t border-gray-200 dark:border-gray-700 px-3 py-2 text-xs text-gray-400 dark:text-gray-500">
            <span>{t("shortcut")}</span>
            <span>{t("shortcutEsc")}</span>
          </div>
        </CommandDialog>
      )}
    </AnimatePresence>,
    document.body
  );
}
