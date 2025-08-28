import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "chart"
}

export function LoadingSkeleton({ className, variant = "default" }: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 rounded"

  const variants = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    text: "h-3 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    chart: "h-64 w-full",
  }

  return <div className={cn(baseClasses, variants[variant], className)} />
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-6 w-32" />
        <LoadingSkeleton className="h-4 w-16" />
      </div>
      <LoadingSkeleton variant="card" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Cards skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <LoadingSkeleton className="h-6 w-24" />
          <LoadingSkeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingSkeleton className="h-48" />
          <LoadingSkeleton className="h-48" />
        </div>
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}
