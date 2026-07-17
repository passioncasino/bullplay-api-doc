import { Link } from 'react-router-dom'
import type { ContentBlock } from '@/types/documentation'
import { ApiEndpointHeader } from './ApiEndpointHeader'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { FeatureCards } from './FeatureCards'
import { ParamTable } from './ParamTable'
import { MethodBadge } from '@/components/ui/MethodBadge'

interface ContentRendererProps {
  blocks: ContentBlock[]
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div className="doc-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index}>{block.text}</p>

          case 'heading': {
            const id = block.id ?? slugify(block.text)
            const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4'
            return (
              <Tag key={index} id={id}>
                {block.text}
              </Tag>
            )
          }

          case 'list':
            if (block.ordered) {
              return (
                <ol key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              )
            }
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )

          case 'code':
            return (
              <CodeBlock
                key={index}
                code={block.code}
                language={block.language}
                title={block.title}
              />
            )

          case 'table':
            return (
              <div key={index} className="mt-4 overflow-hidden rounded-xl border border-doc-border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-doc-border text-sm">
                    <thead className="bg-doc-surface-muted">
                      <tr>
                        {block.headers.map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 text-left font-semibold text-doc-text"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-doc-border bg-doc-surface">
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 text-doc-muted">
                              {cell.startsWith('Bearer') || cell.startsWith('application/') ? (
                                <code className="rounded bg-doc-hover px-1.5 py-0.5 font-mono text-xs text-doc-text">
                                  {cell}
                                </code>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )

          case 'param-table':
            return <ParamTable key={index} title={block.title} params={block.params} />

          case 'api-endpoint':
            return (
              <ApiEndpointHeader
                key={index}
                method={block.method}
                path={block.path}
                description={block.description}
              />
            )

          case 'feature-cards':
            return <FeatureCards key={index} cards={block.cards} />

          case 'callout':
            return (
              <Callout key={index} variant={block.variant} title={block.title} text={block.text} />
            )

          case 'endpoint-list':
            return (
              <div key={index} className="mt-4 space-y-2">
                {block.endpoints.map((endpoint) => (
                  <Link
                    key={endpoint.pathLink}
                    to={endpoint.pathLink}
                    className="flex items-start gap-3 rounded-lg border border-doc-border bg-doc-surface p-4 transition hover:border-doc-accent/30 hover:bg-doc-active/40"
                  >
                    <MethodBadge method={endpoint.method} size="sm" />
                    <div className="min-w-0 flex-1">
                      <code className="font-mono text-sm font-medium text-doc-text">
                        {endpoint.path}
                      </code>
                      <p className="mt-1 text-sm text-doc-muted">{endpoint.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

export function extractHeadings(blocks: ContentBlock[]) {
  return blocks
    .filter((block): block is Extract<ContentBlock, { type: 'heading' }> => block.type === 'heading')
    .map((block) => ({
      id: block.id ?? slugify(block.text),
      text: block.text,
      level: block.level,
    }))
}
