"use client";

import { useCallback, useRef } from "react";

export function useRipple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    container.appendChild(span);
    setTimeout(() => span.remove(), 600);
  }, []);

  return { containerRef, onClick };
}
