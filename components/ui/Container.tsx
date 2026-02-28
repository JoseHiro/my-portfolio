import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

const maxWidthStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[1400px]",
  full: "max-w-full",
} as const;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = "xl", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidthStyles[maxWidth],
        className
      )}
      {...props}
    />
  )
);

Container.displayName = "Container";
