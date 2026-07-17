import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { NavItem } from '@/types/documentation'

interface PageNavigationProps {
  prev: NavItem | null
  next: NavItem | null
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Page navigation"
      className="mt-12 grid gap-4 border-t border-doc-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col rounded-xl border border-doc-border bg-doc-surface p-4 transition hover:border-doc-accent/30 hover:bg-doc-active/40"
        >
          <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-doc-muted">
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </span>
          <span className="mt-2 font-mono text-sm font-medium text-doc-text group-hover:text-doc-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex flex-col rounded-xl border border-doc-border bg-doc-surface p-4 text-right transition hover:border-doc-accent/30 hover:bg-doc-active/40 sm:col-start-2"
        >
          <span className="inline-flex items-center justify-end gap-1 text-xs font-medium uppercase tracking-wide text-doc-muted">
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-2 font-mono text-sm font-medium text-doc-text group-hover:text-doc-accent">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
