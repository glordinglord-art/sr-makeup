import React from "react";
import { cn } from "@/shared/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-stone-200/60 dark:bg-stone-800/60",
        shimmer && "skeleton-shimmer",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton para tarjetas de servicio en carga
 */
export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-rose-100/70 bg-white/80 p-7 shadow-xs backdrop-blur-xs space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-7 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />

        <div className="pt-4 space-y-2.5">
          <Skeleton className="h-4 w-11/12 rounded-md" />
          <Skeleton className="h-4 w-10/12 rounded-md" />
          <Skeleton className="h-4 w-8/12 rounded-md" />
        </div>
      </div>

      <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
        <div>
          <Skeleton className="h-3 w-16 mb-1 rounded-sm" />
          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton para tarjetas de citas en el Super Admin
 */
export function AdminAppointmentCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-rose-100/70 bg-white/90 shadow-xs space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-44 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-stone-100">
        <Skeleton className="h-8 w-28 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

