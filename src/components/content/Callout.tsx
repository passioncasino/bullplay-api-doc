import { Info, Lightbulb, TriangleAlert } from 'lucide-react'

interface CalloutProps {
  variant: 'info' | 'warning' | 'tip'
  title?: string
  text: string
}

const styles = {
  info: {
    container: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-200',
    text: 'text-blue-800 dark:text-blue-300',
    Icon: Info,
  },
  warning: {
    container: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50',
    icon: 'text-amber-600 dark:text-amber-400',
    title: 'text-amber-900 dark:text-amber-200',
    text: 'text-amber-800 dark:text-amber-300',
    Icon: TriangleAlert,
  },
  tip: {
    container: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50',
    icon: 'text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-900 dark:text-emerald-200',
    text: 'text-emerald-800 dark:text-emerald-300',
    Icon: Lightbulb,
  },
}

export function Callout({ variant, title, text }: CalloutProps) {
  const style = styles[variant]
  const Icon = style.Icon

  return (
    <div className={`mt-6 flex gap-3 rounded-xl border p-4 ${style.container}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.icon}`} />
      <div>
        {title && <p className={`font-semibold ${style.title}`}>{title}</p>}
        <p className={`${title ? 'mt-1' : ''} text-sm leading-6 ${style.text}`}>{text}</p>
      </div>
    </div>
  )
}
