"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRipple } from "@/hooks/useRipple";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  primary:
    "bg-accent text-slate-900 hover:bg-accent/90 focus-visible:ring-accent dark:text-slate-900",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-200 dark:text-slate-300 dark:hover:bg-slate-800",
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const { containerRef, onClick: addRipple } = useRipple();
    return (
      <MagneticButton>
        <div ref={containerRef} className="btn-ripple inline-flex">
          <button
            ref={ref}
            disabled={disabled}
            onClick={(e) => {
              addRipple(e);
              onClick?.(e);
            }}
            className={cn(
              "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              variantStyles[variant],
              sizeStyles[size],
              className
            )}
            {...props}
          />
        </div>
      </MagneticButton>
    );
  }
);

Button.displayName = "Button";
