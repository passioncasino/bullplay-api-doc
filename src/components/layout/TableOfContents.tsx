interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-wide text-doc-muted">On this page</p>
        <ul className="mt-3 space-y-2 border-l border-doc-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block border-l-2 py-1 text-sm transition hover:text-doc-accent ${
                  item.level === 2
                    ? '-ml-px border-transparent pl-4 text-doc-muted hover:border-doc-accent'
                    : '-ml-px border-transparent pl-6 text-doc-muted hover:border-doc-accent'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
