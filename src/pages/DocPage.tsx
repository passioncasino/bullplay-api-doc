import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { ContentRenderer, extractHeadings } from '@/components/content/ContentRenderer'
import { PageNavigation } from '@/components/layout/PageNavigation'
import { TableOfContents } from '@/components/layout/TableOfContents'
import { getAdjacentPages } from '@/data/navigation'
import { getPageByPath } from '@/data/pages'

export function DocPage() {
  const location = useLocation()
  const page = getPageByPath(location.pathname)

  const headings = useMemo(() => (page ? extractHeadings(page.blocks) : []), [page])
  const adjacentPages = useMemo(
    () => getAdjacentPages(location.pathname),
    [location.pathname],
  )

  if (!page) {
    return null
  }

  return (
    <div className="flex gap-10 px-4 py-8 lg:px-8 xl:px-12">
      <article className="min-w-0 flex-1 max-w-3xl">
        <header className="mb-8 border-b border-doc-border pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-doc-text">{page.title}</h1>
          {page.description && (
            <p className="mt-4 text-lg leading-8 text-doc-muted">{page.description}</p>
          )}
        </header>
        <ContentRenderer blocks={page.blocks} />
        {adjacentPages && (
          <PageNavigation prev={adjacentPages.prev} next={adjacentPages.next} />
        )}
      </article>
      <TableOfContents items={headings} />
    </div>
  )
}
