import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding size */
  spacing?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const spacingStyles = {
  none: "py-0",
  sm: "py-8 sm:py-10",
  md: "py-12 sm:py-16",
  lg: "py-20 sm:py-24",
} as const;

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ spacing = "md", className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(spacingStyles[spacing], className)}
      {...props}
    />
  )
);

Section.displayName = "Section";
