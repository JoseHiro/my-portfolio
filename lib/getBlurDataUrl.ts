import { getPlaiceholder } from "plaiceholder";

const FALLBACK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const cache = new Map<string, string>();

/**
 * Generates a blur data URL from an image URL (server-side only).
 * Results are cached by URL to avoid regeneration.
 */
export async function getBlurDataUrl(src: string): Promise<string> {
  const cached = cache.get(src);
  if (cached) return cached;

  try {
    const res = await fetch(src, { next: { revalidate: 86400 } });
    if (!res.ok) return FALLBACK;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    cache.set(src, base64);
    return base64;
  } catch {
    return FALLBACK;
  }
}

/**
 * Pre-generate blur data URLs for multiple image sources (e.g. at build time).
 */
export async function getBlurDataUrls(
  sources: string[]
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    sources.map(async (src) => [src, await getBlurDataUrl(src)] as const)
  );
  return Object.fromEntries(entries);
}
