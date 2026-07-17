export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface NavItem {
  title: string
  path: string
  description?: string
  badge?: string
  children?: NavItem[]
}

export interface DocParam {
  name: string
  type: string
  description: string
  required?: boolean
}

export interface FeatureCard {
  title: string
  subtitle: string
  path: string
  image: string
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; language: string; code: string; title?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'param-table'; title?: string; params: DocParam[] }
  | { type: 'api-endpoint'; method: HttpMethod; path: string; description?: string }
  | { type: 'feature-cards'; cards: FeatureCard[] }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip'; title?: string; text: string }
  | { type: 'endpoint-list'; endpoints: { method: HttpMethod; path: string; description: string; pathLink: string }[] }

export interface DocPage {
  title: string
  description?: string
  blocks: ContentBlock[]
}
