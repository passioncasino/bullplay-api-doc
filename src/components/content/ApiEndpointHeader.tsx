import type { HttpMethod } from '@/types/documentation'
import { MethodBadge } from '@/components/ui/MethodBadge'

interface ApiEndpointHeaderProps {
  method: HttpMethod
  path: string
  description?: string
}

export function ApiEndpointHeader({ method, path, description }: ApiEndpointHeaderProps) {
  return (
    <div className="rounded-xl border border-doc-border bg-gradient-to-br from-doc-surface-muted to-doc-surface p-6">
      <div className="flex flex-wrap items-center gap-3">
        <MethodBadge method={method} />
        <code className="font-mono text-lg font-medium text-doc-text">{path}</code>
      </div>
      {description && <p className="mt-3 text-base leading-7 text-doc-muted">{description}</p>}
    </div>
  )
}
