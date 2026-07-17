import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { FeatureCard } from '@/types/documentation'

interface FeatureCardsProps {
  cards: FeatureCard[]
}

export function FeatureCards({ cards }: FeatureCardsProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.path}
          to={card.path}
          className="group overflow-hidden rounded-xl border border-doc-border bg-doc-surface shadow-sm transition hover:-translate-y-0.5 hover:border-doc-accent/30 hover:shadow-md"
        >
          <div className="aspect-[16/9] overflow-hidden bg-doc-surface-muted">
            <img
              src={card.image}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-doc-accent">
              {card.title}
            </p>
            <p className="mt-1 text-base font-medium text-doc-text">{card.subtitle}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-doc-accent">
              Read more
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
