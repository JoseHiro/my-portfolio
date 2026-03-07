"use client";

import { useTranslations } from "next-intl";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  botGreeting: string;
  userExample: string;
  botReply: string;
  placeholder: string;
  sendLabel: string;
};

export function ChatDemoUI({
  botGreeting,
  userExample,
  botReply,
  placeholder,
  sendLabel,
}: Props) {
  const t = useTranslations("demo.chatbot");
  return (
    <div className="flex flex-col flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[320px]">
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 max-w-[85%]">
            {botGreeting}
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <div className="rounded-2xl rounded-tr-sm bg-blue-600 text-white px-4 py-3 text-sm max-w-[85%]">
            {userExample}
          </div>
          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 max-w-[85%]">
            {botReply}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800 p-3">
        <div className="flex gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3">
          <input
            type="text"
            disabled
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-slate-500 dark:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none cursor-not-allowed"
            aria-label={placeholder}
          />
          <button
            type="button"
            disabled
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-lg",
              "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400",
              "cursor-not-allowed"
            )}
          >
            {sendLabel}
          </button>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
          {t("demoNotice")}
        </p>
      </div>
    </div>
  );
}
