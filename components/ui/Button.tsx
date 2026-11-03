/**
 * @file Button & ButtonLink Primitives - Clean rounded-xl agritech buttons in #014F2F, #65AF3E, and #FEFEFE.
 */

import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-xl font-sans font-semibold tracking-[-0.01em] transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65AF3E] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#014F2F] text-[#FEFEFE] shadow-[0_8px_20px_-6px_rgba(1,79,47,0.35)] hover:bg-[#0D2418]",
        primaryDark:
          "bg-[#FEFEFE] text-[#0D2418] hover:bg-[#EEF5EA]",
        accent:
          "bg-[#65AF3E] text-[#FEFEFE] hover:bg-[#014F2F]",
        secondary:
          "border border-[#014F2F]/15 bg-[#FEFEFE] text-[#0D2418] shadow-[0_6px_18px_-6px_rgba(1,79,47,0.12)] hover:border-[#65AF3E] hover:bg-[#F8FAF7]",
        secondaryDark:
          "border border-[#FEFEFE]/25 bg-[#FEFEFE]/10 text-[#FEFEFE] backdrop-blur-md hover:bg-[#FEFEFE]/20",
        ghost:
          "bg-transparent text-[#014F2F] hover:bg-[#EEF5EA]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-sm sm:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </button>
  );
}

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  readonly href: string;
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
}

export function ButtonLink({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
        <span>{children}</span>
        {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </a>
  );
}
