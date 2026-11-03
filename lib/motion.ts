/**
 * @file Motion System Tokens - Centralized durations, cubic-bezier easings, and spring presets for SINTAS animations.
 */

import type { Transition, Variants } from "motion/react";

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.7,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring: Readonly<Record<"snappy" | "soft", Transition>> = {
  snappy: { type: "spring", stiffness: 400, damping: 32 },
  soft: { type: "spring", stiffness: 220, damping: 28 },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: ease.out,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};
