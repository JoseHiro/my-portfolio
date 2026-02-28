/**
 * Merges class names. Pass base classes and optional className override.
 * Later entries take precedence for conflicting Tailwind classes when used in order.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
