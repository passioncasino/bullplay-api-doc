import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-doc-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold text-doc-text">Page not found</h1>
      <p className="mt-3 max-w-md text-doc-muted">
        The documentation page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-doc-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-doc-accent-hover"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Welcome
      </Link>
    </div>
  )
}
