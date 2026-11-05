/**
 * @file Route Template - Ensures smooth page transition animation on route changes without blocking overlays.
 */

import type { ReactNode } from "react";

export default function Template({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="animate-page-enter flex-1 flex flex-col">{children}</div>;
}
