import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "muted";
  className?: string;
}

const variantStyles = {
  default:
    "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  accent:
    "bg-accent/20 text-slate-900 dark:bg-accent/30 dark:text-slate-900",
  outline:
    "border border-slate-300 bg-transparent text-slate-700 dark:border-slate-600 dark:text-slate-300",
  muted:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
} as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
