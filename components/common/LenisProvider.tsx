/**
 * @file Lenis Smooth Scroll Provider - Wraps page content in ReactLenis while respecting prefers-reduced-motion.
 */

"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export interface LenisProviderProps {
  readonly children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
