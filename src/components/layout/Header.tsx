import { Link } from 'react-router-dom'
import { BookOpen, Menu } from 'lucide-react'
import { SITE_NAME, SITE_TAGLINE } from '@/data/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-doc-border bg-doc-bg/90 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-2 text-doc-muted hover:bg-doc-hover lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-doc-accent text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-doc-text">{SITE_NAME}</p>
            <p className="text-xs text-doc-muted">{SITE_TAGLINE}</p>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 md:inline">
            v1.0
          </span>
        </div>
      </div>
    </header>
  )
}
