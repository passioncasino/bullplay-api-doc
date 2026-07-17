import type { DocParam } from '@/types/documentation'

interface ParamTableProps {
  title?: string
  params: DocParam[]
}

export function ParamTable({ title, params }: ParamTableProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-doc-border">
      {title && (
        <div className="border-b border-doc-border bg-doc-surface-muted px-4 py-2.5 text-sm font-medium text-doc-text">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-doc-border text-sm">
          <thead className="bg-doc-surface-muted">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-doc-text">Key</th>
              <th className="px-4 py-3 text-left font-semibold text-doc-text">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-doc-text">Description</th>
              <th className="px-4 py-3 text-left font-semibold text-doc-text">Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-doc-border bg-doc-surface">
            {params.map((param) => (
              <tr key={param.name} className="align-top">
                <td className="px-4 py-3 font-mono text-doc-accent">{param.name}</td>
                <td className="px-4 py-3 font-mono text-doc-muted">{param.type}</td>
                <td className="px-4 py-3 text-doc-muted">{param.description}</td>
                <td className="px-4 py-3 text-doc-muted">
                  {param.required ? (
                    <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
                      Required
                    </span>
                  ) : (
                    <span className="text-xs">Optional</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
