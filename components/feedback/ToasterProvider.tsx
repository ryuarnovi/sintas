/**
 * @file ToasterProvider Component - Client wrapper for Sonner toast notifications styled with SINTAS tokens.
 */

"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className:
          "!rounded-2xl !border !border-forest-900/15 !bg-forest-950 !text-paper-50 !font-sans !shadow-float",
      }}
    />
  );
}
