import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    setActiveId(items[0]?.id ?? '')
  }, [items])

  useEffect(() => {
    if (items.length === 0) return

    const headerOffset = 120

    const updateActiveHeading = () => {
      let currentId = items[0]?.id ?? ''

      for (const item of items) {
        const element = document.getElementById(item.id)
        if (!element) continue
        if (element.getBoundingClientRect().top - headerOffset <= 0) {
          currentId = item.id
        }
      }

      setActiveId(currentId)
    }

    updateActiveHeading()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveHeading)
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-wide text-doc-muted">On this page</p>
        <ul className="mt-3 space-y-2 border-l border-doc-border">
          {items.map((item) => {
            const isActive = item.id === activeId

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`block border-l-2 py-1 text-sm transition ${
                    item.level === 2 ? 'pl-4' : 'pl-6'
                  } ${
                    isActive
                      ? '-ml-px border-doc-accent font-medium text-doc-accent'
                      : '-ml-px border-transparent text-doc-muted hover:border-doc-accent hover:text-doc-accent'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
