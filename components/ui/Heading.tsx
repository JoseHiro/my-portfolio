import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  /** Visual size / style; does not change the semantic level */
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}

const sizeStyles: Record<NonNullable<HeadingProps["size"]>, string> = {
  xl: "text-4xl font-bold tracking-tight sm:text-5xl",
  lg: "text-3xl font-bold tracking-tight sm:text-4xl",
  md: "text-2xl font-semibold tracking-tight",
  sm: "text-xl font-semibold",
};

const defaultLevelBySize: Record<NonNullable<HeadingProps["size"]>, HeadingLevel> = {
  xl: "h1",
  lg: "h2",
  md: "h3",
  sm: "h4",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, size = "lg", className, ...props }, ref) => {
    const Component = as ?? defaultLevelBySize[size];
    return (
      <Component
        ref={ref}
        className={cn(
          "text-slate-900 dark:text-slate-100",
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";
