import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Search, X } from 'lucide-react'
import { navigation } from '@/data/navigation'
import type { NavItem } from '@/types/documentation'

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const location = useLocation()
  const isActive = location.pathname === item.path

  return (
    <Link
      to={item.path}
      onClick={onNavigate}
      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition ${
        isActive
          ? 'bg-doc-active font-medium text-doc-accent'
          : 'text-doc-muted hover:bg-doc-hover hover:text-doc-text'
      }`}
    >
      <span className="truncate font-mono text-[13px]">{item.title}</span>
      {item.badge && (
        <span className="ml-2 shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

function NavSection({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const location = useLocation()
  const isSectionActive = useMemo(() => {
    const paths = [item.path, ...(item.children?.map((child) => child.path) ?? [])]
    return paths.some((path) => location.pathname === path)
  }, [item, location.pathname])

  const [open, setOpen] = useState(isSectionActive)

  if (!item.children?.length) {
    return <NavLink item={item} onNavigate={onNavigate} />
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold text-doc-text hover:bg-doc-hover"
      >
        {item.title}
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-1 space-y-0.5 border-l border-doc-border pl-3">
          {item.children.map((child) => (
            <NavLink key={child.path} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const [query, setQuery] = useState('')

  const filteredNavigation = useMemo(() => {
    if (!query.trim()) return navigation

    const lowerQuery = query.toLowerCase()

    return navigation
      .map((section) => {
        if (!section.children) {
          return section.title.toLowerCase().includes(lowerQuery) ? section : null
        }

        const children = section.children.filter((child) =>
          child.title.toLowerCase().includes(lowerQuery),
        )

        if (children.length === 0) return null

        return { ...section, children }
      })
      .filter(Boolean) as NavItem[]
  }, [query])

  const sidebarContent = (
    <>
      <div className="border-b border-doc-border p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-doc-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search docs..."
            className="w-full rounded-lg border border-doc-border bg-doc-surface py-2 pl-9 pr-3 text-sm text-doc-text outline-none ring-doc-accent transition placeholder:text-doc-muted focus:ring-2"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-4">
        {filteredNavigation.map((item) => (
          <NavSection key={item.title} item={item} onNavigate={onClose} />
        ))}
      </nav>
    </>
  )

  return (
    <>
      <aside className="hidden w-72 shrink-0 flex-col border-r border-doc-border bg-doc-sidebar lg:flex">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-label="Close sidebar"
          />
          <aside className="relative flex h-full w-80 max-w-[85vw] flex-col bg-doc-sidebar shadow-xl">
            <div className="flex items-center justify-end border-b border-doc-border p-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-doc-muted hover:bg-doc-hover"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
