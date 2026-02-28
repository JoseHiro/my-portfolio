"use client";

import { useState, useEffect } from "react";

const SECTION_IDS = ["about", "work", "services", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(offset = 120): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset;
      let current: SectionId | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      // When at top of page, highlight About
      if (!current && window.scrollY < 400) current = "about";
      setActive(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [offset]);

  return active;
}
