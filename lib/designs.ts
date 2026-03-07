/**
 * Design showcase: 8 business-type categories. Keep in sync with i18n (designShowcase.items).
 */
export const DESIGN_SLUGS = [
  "freelancer",
  "hair-salon",
  "restaurant",
  "small-business",
  "ecommerce",
  "saas",
  "creative-agency",
  "medical",
] as const;

export type DesignSlug = (typeof DESIGN_SLUGS)[number];

export const DESIGN_CONFIG: Record<
  DesignSlug,
  { imageSeed: string; domain: string; tags: readonly string[] }
> = {
  freelancer: {
    imageSeed: "freelancer1",
    domain: "jane-doe-portfolio.com",
    tags: ["Responsive", "Portfolio", "Contact"],
  },
  "hair-salon": {
    imageSeed: "salon1",
    domain: "salon-luxe.example.com",
    tags: ["Responsive", "Booking", "Gallery"],
  },
  restaurant: {
    imageSeed: "restaurant1",
    domain: "bistro-modern.example.com",
    tags: ["Menu", "Reservations", "Gallery"],
  },
  "small-business": {
    imageSeed: "smallbiz1",
    domain: "acme-services.com",
    tags: ["Responsive", "Quote", "Testimonials"],
  },
  ecommerce: {
    imageSeed: "ecom1",
    domain: "shop-boutique.example.com",
    tags: ["Cart", "Checkout", "Responsive"],
  },
  saas: {
    imageSeed: "saas1",
    domain: "app-startup.io",
    tags: ["Features", "Pricing", "Sign Up"],
  },
  "creative-agency": {
    imageSeed: "agency1",
    domain: "studio-creative.co",
    tags: ["Work", "Process", "Bold Design"],
  },
  medical: {
    imageSeed: "medical1",
    domain: "wellness-clinic.com",
    tags: ["Booking", "Team", "Patient Info"],
  },
};

export function isDesignSlug(s: string): s is DesignSlug {
  return DESIGN_SLUGS.includes(s as DesignSlug);
}

/** i18n key for designShowcase.items (e.g. hair-salon → hairSalon) */
export function designSlugToItemKey(slug: DesignSlug): string {
  return slug.replace(/(^|-)([a-z])/g, (_, _p, c) => c.toUpperCase());
}
