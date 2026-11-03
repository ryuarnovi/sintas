/**
 * @file Root Loading UI - Suspense fallback skeleton for route transitions.
 */

import { Skeleton } from "@/components/feedback/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-paper-50 px-6 py-32">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton label="Memuat halaman SINTAS..." className="h-96 w-full" />
      </div>
    </div>
  );
}
