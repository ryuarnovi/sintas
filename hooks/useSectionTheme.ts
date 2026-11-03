/**
 * @file Section Theme & Scroll-Spy Hook - Tracks the active section ID, underlying theme tone at top:40px, and scroll compaction state.
 */

"use client";

import { useEffect, useState } from "react";
import { SECTION_THEME_REGISTRY } from "@/constants/nav";
import type { ThemeTone } from "@/types/common";

export interface SectionNavigationState {
  readonly activeSectionId: string;
  readonly currentTheme: ThemeTone;
  readonly isCompact: boolean;
}

export function useSectionTheme(): SectionNavigationState {
  const [state, setState] = useState<SectionNavigationState>({
    activeSectionId: "beranda",
    currentTheme: "light",
    isCompact: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const evaluateViewport = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY + 4;
      const scrollingUp = currentScrollY < lastScrollY - 4;
      lastScrollY = currentScrollY;

      const probeY = 44; // 44px from top viewport edge (inside floating pill navbar band)
      let matchedId = "beranda";
      let matchedTheme: ThemeTone = "light";

      for (const entry of SECTION_THEME_REGISTRY) {
        const element = document.getElementById(entry.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          matchedId = entry.id;
          matchedTheme = entry.theme;
          break;
        }
      }

      // Also determine active nav item using a slightly deeper reading line
      const spyY = Math.min(window.innerHeight * 0.28, 260);
      let spyId = matchedId;
      if (currentScrollY < 100) {
        spyId = "beranda";
      } else {
        for (const entry of SECTION_THEME_REGISTRY) {
          const element = document.getElementById(entry.id);
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          if (rect.top <= spyY && rect.bottom > spyY) {
            spyId = entry.id;
            break;
          }
        }
      }

      setState((prev) => {
        const nextCompact =
          currentScrollY <= 120
            ? false
            : scrollingDown
              ? true
              : scrollingUp
                ? false
                : prev.isCompact;

        if (
          prev.activeSectionId === spyId &&
          prev.currentTheme === matchedTheme &&
          prev.isCompact === nextCompact
        ) {
          return prev;
        }
        return {
          activeSectionId: spyId,
          currentTheme: matchedTheme,
          isCompact: nextCompact,
        };
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateViewport);
        ticking = true;
      }
    };

    evaluateViewport();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}
