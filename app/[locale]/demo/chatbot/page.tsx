import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Bot, User } from "lucide-react";
import { ChatDemoUI } from "./ChatDemoUI";

export default async function ChatbotDemoPage() {
  const t = await getTranslations("demo.chatbot");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {t("backToWork")}
          </Link>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {t("title")}
          </span>
          <span className="w-20" aria-hidden />
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {t("subtitle")}
        </p>
        <ChatDemoUI
          botGreeting={t("botGreeting")}
          userExample={t("userExample")}
          botReply={t("botReply")}
          placeholder={t("placeholder")}
          sendLabel={t("send")}
        />
      </main>
    </div>
  );
}
