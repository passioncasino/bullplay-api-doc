import type { NavItem } from '@/types/documentation'

export const SITE_NAME = 'Bull Play Casino API'
export const SITE_TAGLINE = 'API Documentation'

export const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    path: '/',
    children: [
      { title: 'Welcome', path: '/' },
      { title: 'Introduction', path: '/introduction' },
    ],
  },
  {
    title: 'Fundamentals',
    path: '/fundamentals',
    children: [
      { title: 'Fundamentals', path: '/fundamentals' },
      { title: 'Seamless Integration', path: '/seamless-integration' },
      { title: 'Balance Transfer Integration', path: '/balance-transfer-integration' },
      { title: 'Bonus Call', path: '/bonus-call' },
    ],
  },
  {
    title: 'Main API',
    path: '/main-api',
    children: [
      { title: 'Overview', path: '/main-api' },
      { title: '/v1/operator/info', path: '/api/v1/operator/info' },
      { title: '/v1/operator/create', path: '/api/v1/operator/create' },
      { title: '/v1/operator/update', path: '/api/v1/operator/update' },
      { title: '/v1/operator/transfer-balance', path: '/api/v1/operator/transfer-balance' },
      { title: '/v1/player/create', path: '/api/v1/player/create' },
      { title: '/v1/player/info', path: '/api/v1/player/info' },
      {
        title: '/v1/player/wallet/deposit',
        path: '/api/v1/player/wallet/deposit',
        badge: 'Transfer',
      },
      {
        title: '/v1/player/wallet/withdraw',
        path: '/api/v1/player/wallet/withdraw',
        badge: 'Transfer',
      },
      { title: '/v1/provider/list', path: '/api/v1/provider/list' },
      { title: '/v1/provider/settings', path: '/api/v1/provider/settings' },
      {
        title: '/v1/provider/settings/:providerId/:currency',
        path: '/api/v1/provider/settings/{providerId}/{currency}',
      },
      { title: '/v1/game/list/:providerId', path: '/api/v1/game/list/{providerId}' },
      { title: '/v1/game/launch', path: '/api/v1/game/launch' },
      { title: '/v1/game/kick', path: '/api/v1/game/kick' },
      { title: '/v1/transaction/list', path: '/api/v1/transaction/list' },
      { title: '/v1/transaction/round', path: '/api/v1/transaction/round' },
      { title: '/v1/bonus-call/register', path: '/api/v1/bonus-call/register' },
      { title: '/v1/bonus-call/cancel', path: '/api/v1/bonus-call/cancel' },
      { title: '/v1/bonus-call/detail/:issueId', path: '/api/v1/bonus-call/detail/{issueId}' },
    ],
  },
  {
    title: 'Seamless Wallet API',
    path: '/seamless-wallet-api',
    children: [
      { title: 'Overview', path: '/seamless-wallet-api' },
      { title: 'Balance', path: '/seamless-wallet/balance' },
      { title: 'Bet', path: '/seamless-wallet/bet' },
      { title: 'Win', path: '/seamless-wallet/win' },
      { title: 'Cancel', path: '/seamless-wallet/cancel' },
    ],
  },
]

export function flattenNavItems(items: NavItem[] = navigation): NavItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenNavItems(item.children) : [])])
}

export function findNavItemByPath(path: string): NavItem | undefined {
  return flattenNavItems().find((item) => item.path === path)
}

const API_NAV_SECTIONS = ['Main API', 'Seamless Wallet API'] as const

export interface AdjacentPages {
  prev: NavItem | null
  next: NavItem | null
}

export function getAdjacentPages(path: string): AdjacentPages | null {
  for (const section of navigation) {
    if (!API_NAV_SECTIONS.includes(section.title as (typeof API_NAV_SECTIONS)[number])) {
      continue
    }

    const items = section.children ?? []
    const index = items.findIndex((item) => item.path === path)
    if (index === -1) continue

    return {
      prev: index > 0 ? items[index - 1] : null,
      next: index < items.length - 1 ? items[index + 1] : null,
    }
  }

  return null
}
