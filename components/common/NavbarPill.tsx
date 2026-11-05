/**
 * @file NavbarPill Component - Clean modern Agritech header with official SINTAS logo, route-aware active underline (#65AF3E on Peta when on /peta), and Masuk (/login) CTA.
 */

"use client";

import { useLenis } from "lenis/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/constants/nav";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function NavbarPill() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { activeSectionId, isCompact } = useSectionTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  const effectiveActiveId = isHomePage ? activeSectionId : "";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) {
      setMobileOpen(false);
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    setMobileOpen(false);

    if (lenis) {
      lenis.scrollTo(target, { offset: -20 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        !isHomePage || isCompact
          ? "bg-[#FEFEFE]/96 backdrop-blur-md border-b border-[#C4DEC9] py-3 shadow-[0_8px_30px_rgba(1,79,47,0.06)]"
          : "bg-gradient-to-b from-[#FEFEFE]/95 via-[#FEFEFE]/75 to-transparent py-4 sm:py-5"
      )}
    >
      <div className="mx-auto max-w-[1560px] px-6 sm:px-10 lg:px-16">
        <nav
          aria-label="Navigasi Utama SINTAS"
          className="flex items-center justify-between gap-6"
        >
          {/* Left: Official SINTAS Brand Logo + Tagline */}
          <Link
            href="/"
            aria-label="SINTAS - Kembali ke beranda"
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative size-10 sm:size-11 shrink-0">
              <Image
                src="/brand/sintas-ikon.png"
                alt="Logo SINTAS"
                fill
                sizes="44px"
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#014F2F] leading-none">
                SINTAS
              </span>
              <span className="text-[11px] font-medium text-[#355242] tracking-tight mt-0.5">
                AI Niaga & Alokasi Sayur
              </span>
            </div>
          </Link>

          {/* Center: Clean Horizontal Nav Links with Active Green Underline */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = effectiveActiveId === item.id;
              const isRoute = item.href.startsWith("/");
              const resolvedHref =
                !isRoute && !isHomePage
                  ? item.href === "#beranda"
                    ? "/"
                    : `/${item.href}`
                  : item.href;

              const linkClasses = cn(
                "relative py-1.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-[#072E1B] font-bold"
                  : "text-[#355242] hover:text-[#014F2F]"
              );

              const content = (
                <>
                  <span>{item.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={spring.snappy}
                      className="absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-[#65AF3E]"
                    />
                  ) : null}
                </>
              );

              return (
                <li key={item.id}>
                  {isRoute || !isHomePage ? (
                    <Link href={resolvedHref} className={linkClasses}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={resolvedHref}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      className={linkClasses}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right: Masuk Button */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#014F2F] px-5 py-2.5 text-sm font-semibold text-[#FEFEFE] shadow-[0_8px_20px_-4px_rgba(1,79,47,0.35)] transition-all hover:bg-[#072E1B]"
            >
              <span>Masuk</span>
              <ArrowRight aria-hidden="true" className="size-4 text-[#65AF3E]" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex lg:hidden size-10 items-center justify-center rounded-xl border border-[#C4DEC9] bg-[#FEFEFE] text-[#014F2F] transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={spring.snappy}
              className="mt-3 rounded-2xl border border-[#C4DEC9] bg-[#FEFEFE] p-4 shadow-xl lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = effectiveActiveId === item.id;
                  const isRoute = item.href.startsWith("/");
                  const resolvedHref =
                    !isRoute && !isHomePage
                      ? item.href === "#beranda"
                        ? "/"
                        : `/${item.href}`
                      : item.href;

                  const itemClass = cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#EBF4EC] text-[#014F2F] font-bold"
                      : "text-[#072E1B] hover:bg-[#EBF4EC]/60"
                  );

                  return (
                    <li key={item.id}>
                      {isRoute || !isHomePage ? (
                        <Link
                          href={resolvedHref}
                          onClick={() => setMobileOpen(false)}
                          className={itemClass}
                        >
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <a
                          href={resolvedHref}
                          onClick={(e) => handleAnchorClick(e, item.href)}
                          className={itemClass}
                        >
                          <span>{item.label}</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 pt-3 border-t border-[#C4DEC9]">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#014F2F] px-5 text-sm font-semibold text-[#FEFEFE]"
                >
                  <span>Masuk</span>
                  <ArrowRight aria-hidden="true" className="size-4 text-[#65AF3E]" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
