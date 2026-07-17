import type { DocPage } from '@/types/documentation'

export const seamlessIntegrationPage: DocPage = {
  title: 'Seamless Integration',
  description: 'Workflow for integrating Bull Play in Seamless Wallet mode.',
  blocks: [
    {
      type: 'paragraph',
      text: 'In Seamless mode, your platform retains control of player balances. Bull Play sends wallet callbacks to your operator endpoints whenever a bet, win, or cancel event occurs.',
    },
    { type: 'heading', level: 2, text: 'Integration flow', id: 'integration-flow' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Create the player via POST /v1/player/create',
        'Configure your wallet callback URLs with Bull Play support',
        'Launch a game via POST /v1/game/launch',
        'Handle Balance, Bet, Win, and Cancel callbacks from Bull Play',
        'Use transaction endpoints to reconcile activity',
      ],
    },
    { type: 'heading', level: 2, text: 'Wallet callbacks', id: 'wallet-callbacks' },
    {
      type: 'paragraph',
      text: 'Your server must expose HTTPS endpoints that Bull Play can reach. Each callback includes player identification, transaction metadata, and amounts in the player currency.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Latency requirements',
      text: 'Wallet callbacks must respond within 3 seconds. Timeouts may cause bet rejections and degraded player experience.',
    },
  ],
}

export const balanceTransferPage: DocPage = {
  title: 'Balance Transfer Integration',
  description: 'Workflow for integrating Bull Play in Balance Transfer mode.',
  blocks: [
    {
      type: 'paragraph',
      text: 'In Balance Transfer mode, player funds are moved into Bull Play managed wallets before gameplay. Winnings and remaining balances are withdrawn back to your platform when the session ends.',
    },
    { type: 'heading', level: 2, text: 'Integration flow', id: 'integration-flow' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Create the player via POST /v1/player/create',
        'Deposit funds via POST /v1/player/wallet/deposit',
        'Launch a game via POST /v1/game/launch',
        'Withdraw remaining balance via POST /v1/player/wallet/withdraw',
        'Reconcile transactions using /v1/transaction/list',
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Deposit before launch',
      text: 'Players must have sufficient wallet balance in Bull Play before launching games. Deposits are not automatic.',
    },
  ],
}

export const bonusCallPage: DocPage = {
  title: 'Bonus Call',
  description: 'Overview of the Bonus Call feature in the Bull Play API.',
  blocks: [
    {
      type: 'paragraph',
      text: 'Bonus Call allows operators to register promotional free-round or bonus campaigns for specific players. Registered bonuses are applied when the player launches eligible games.',
    },
    { type: 'heading', level: 2, text: 'Lifecycle', id: 'lifecycle' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Register a bonus via POST /v1/bonus-call/register',
        'Player launches an eligible game',
        'Bonus rounds are consumed according to campaign rules',
        'Cancel unused bonuses via POST /v1/bonus-call/cancel if needed',
        'Query status via GET /v1/bonus-call/detail/:issueId',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Issue ID',
      text: 'Store the issueId returned from register calls — it is required for cancellation and status queries.',
    },
  ],
}

export const mainApiPage: DocPage = {
  title: 'Main API',
  description: 'All endpoints of the Bull Play Main API.',
  blocks: [
    {
      type: 'paragraph',
      text: 'The Main API covers operator configuration, player management, provider and game catalog access, wallet operations, transaction reporting, and bonus call management.',
    },
    { type: 'heading', level: 2, text: 'Operator', id: 'operator' },
    {
      type: 'endpoint-list',
      endpoints: [
        {
          method: 'GET',
          path: '/v1/operator/info',
          description: 'Retrieve operator profile and configuration',
          pathLink: '/api/v1/operator/info',
        },
        {
          method: 'POST',
          path: '/v1/operator/create',
          description: 'Create a new operator account',
          pathLink: '/api/v1/operator/create',
        },
        {
          method: 'PUT',
          path: '/v1/operator/update',
          description: 'Update operator settings',
          pathLink: '/api/v1/operator/update',
        },
        {
          method: 'POST',
          path: '/v1/operator/transfer-balance',
          description: 'Transfer balance between operator accounts',
          pathLink: '/api/v1/operator/transfer-balance',
        },
      ],
    },
    { type: 'heading', level: 2, text: 'Player', id: 'player' },
    {
      type: 'endpoint-list',
      endpoints: [
        {
          method: 'POST',
          path: '/v1/player/create',
          description: 'Register a player in the Bull Play system',
          pathLink: '/api/v1/player/create',
        },
        {
          method: 'GET',
          path: '/v1/player/info',
          description: 'Retrieve player details by player code',
          pathLink: '/api/v1/player/info',
        },
        {
          method: 'POST',
          path: '/v1/player/wallet/deposit',
          description: 'Deposit funds (Balance Transfer only)',
          pathLink: '/api/v1/player/wallet/deposit',
        },
        {
          method: 'POST',
          path: '/v1/player/wallet/withdraw',
          description: 'Withdraw funds (Balance Transfer only)',
          pathLink: '/api/v1/player/wallet/withdraw',
        },
      ],
    },
    { type: 'heading', level: 2, text: 'Game', id: 'game' },
    {
      type: 'endpoint-list',
      endpoints: [
        {
          method: 'GET',
          path: '/v1/game/list/:providerId',
          description: 'List games for a provider',
          pathLink: '/api/v1/game/list/{providerId}',
        },
        {
          method: 'POST',
          path: '/v1/game/launch',
          description: 'Launch a game session and receive a game URL',
          pathLink: '/api/v1/game/launch',
        },
        {
          method: 'POST',
          path: '/v1/game/kick',
          description: 'Force-disconnect a player from an active game',
          pathLink: '/api/v1/game/kick',
        },
      ],
    },
  ],
}

export const seamlessWalletOverviewPage: DocPage = {
  title: 'Seamless Wallet API',
  description: 'Endpoints your platform must implement when operating in Seamless mode.',
  blocks: [
    {
      type: 'paragraph',
      text: 'When using Seamless integration, Bull Play sends HTTP POST requests to your configured wallet endpoints. Your server validates each request, updates balances, and returns the updated balance.',
    },
    { type: 'heading', level: 2, text: 'Required endpoints', id: 'required-endpoints' },
    {
      type: 'endpoint-list',
      endpoints: [
        {
          method: 'POST',
          path: '/balance',
          description: 'Return current player balance',
          pathLink: '/seamless-wallet/balance',
        },
        {
          method: 'POST',
          path: '/bet',
          description: 'Debit player balance for a bet',
          pathLink: '/seamless-wallet/bet',
        },
        {
          method: 'POST',
          path: '/win',
          description: 'Credit player balance for a win',
          pathLink: '/seamless-wallet/win',
        },
        {
          method: 'POST',
          path: '/cancel',
          description: 'Reverse a previously accepted bet',
          pathLink: '/seamless-wallet/cancel',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Direction of calls',
      text: 'Unlike Main API endpoints, Seamless Wallet endpoints are implemented by you and called by Bull Play during gameplay.',
    },
  ],
}
