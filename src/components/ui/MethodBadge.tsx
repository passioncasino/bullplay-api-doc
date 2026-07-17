import type { HttpMethod } from '@/types/documentation'

const methodStyles: Record<HttpMethod, string> = {
  GET: 'bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800',
  POST: 'bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-800',
  PUT: 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800',
  PATCH: 'bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:ring-orange-800',
  DELETE: 'bg-red-100 text-red-800 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-800',
}

interface MethodBadgeProps {
  method: HttpMethod
  size?: 'sm' | 'md'
}

export function MethodBadge({ method, size = 'md' }: MethodBadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md font-mono font-semibold uppercase ring-1 ring-inset ${methodStyles[method]} ${sizeClass}`}
    >
      {method}
    </span>
  )
}
