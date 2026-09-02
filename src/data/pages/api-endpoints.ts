import type { DocPage, DocParam, HttpMethod } from '@/types/documentation'

interface ApiEndpointConfig {
  method: HttpMethod
  path: string
  title: string
  description: string
  pathParams?: DocParam[]
  queryParams?: DocParam[]
  bodyExample?: string
  bodyParams?: DocPage['blocks']
  responseExample: string
  responseParams?: DocPage['blocks']
  notes?: string
}

function createApiEndpointPage(config: ApiEndpointConfig): DocPage {
  const blocks: DocPage['blocks'] = [
    {
      type: 'api-endpoint',
      method: config.method,
      path: config.path,
      description: config.description,
    },
    { type: 'heading', level: 2, text: 'Headers', id: 'headers' },
    {
      type: 'table',
      headers: ['Name', 'Value'],
      rows: [
        ['Authorization', 'Bearer <token>'],
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
      ],
    },
  ]

  if (config.pathParams?.length) {
    blocks.push(
      { type: 'heading', level: 2, text: 'Path Parameters', id: 'path-parameters' },
      { type: 'param-table', params: config.pathParams },
    )
  }

  if (config.queryParams?.length) {
    blocks.push(
      { type: 'heading', level: 2, text: 'Query Parameters', id: 'query-parameters' },
      { type: 'param-table', params: config.queryParams },
    )
  }

  if (config.bodyExample) {
    blocks.push(
      { type: 'heading', level: 2, text: 'Body', id: 'body' },
      { type: 'code', language: 'json', code: config.bodyExample },
    )
    if (config.bodyParams) {
      blocks.push(...config.bodyParams)
    }
  }

  blocks.push(
    { type: 'heading', level: 2, text: 'Response', id: 'response' },
    { type: 'code', language: 'json', code: config.responseExample },
  )

  if (config.responseParams) {
    blocks.push(...config.responseParams)
  }

  if (config.notes) {
    blocks.push({
      type: 'callout',
      variant: 'info',
      text: config.notes,
    })
  }

  return { title: config.title, description: config.description, blocks }
}

export const operatorInfoPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/operator/info',
  title: '/v1/operator/info',
  description: 'Retrieve the authenticated operator profile, supported currencies, and integration settings.',
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "operatorCode": "OP10001",
    "name": "Demo Operator",
    "currencies": ["USD", "EUR"],
    "integrationMode": "seamless"
  }
}`,
  responseParams: [
    {
      type: 'param-table',
      params: [
        { name: 'operatorCode', type: 'string', description: 'Unique operator identifier' },
        { name: 'name', type: 'string', description: 'Display name of the operator' },
        { name: 'currencies', type: 'string[]', description: 'Supported currency codes' },
        {
          name: 'integrationMode',
          type: 'string',
          description: 'Active integration mode: seamless or transfer',
        },
      ],
    },
  ],
})

export const playerCreatePage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/player/create',
  title: '/v1/player/create',
  description:
    'Links an external player (identified by a unique ID on the operator side) to the Bull Play system. Required before launching games.',
  bodyExample: `{
  "playerExternalId": "playerId_onOperatorSide"
}`,
  bodyParams: [
    {
      type: 'param-table',
      params: [
        {
          name: 'playerExternalId',
          type: 'string',
          description: 'Unique player identifier from the operator system',
          required: true,
        },
      ],
    },
  ],
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "playerCode": 100000121
  }
}`,
  responseParams: [
    {
      type: 'param-table',
      params: [
        { name: 'success', type: 'boolean', description: 'Whether the request succeeded' },
        { name: 'message', type: 'string', description: 'Result message' },
        {
          name: 'data.playerCode',
          type: 'number',
          description: 'Unique integer identifier assigned within Bull Play',
        },
      ],
    },
  ],
})

export const gameLaunchPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/game/launch',
  title: '/v1/game/launch',
  description: 'Launch a game session for a registered player and receive a URL to embed or redirect.',
  bodyExample: `{
  "playerExternalId": 100000121,
  "providerId": 1,
  "gameCode": "slot_fortune_tiger",
  "currency": "USD",
  "language": "en"
}`,
  bodyParams: [
    {
      type: 'param-table',
      params: [
        { name: 'playerExternalId', type: 'number', description: 'Bull Play player code', required: true },
        { name: 'providerId', type: 'number', description: 'provider id', required: true },
        { name: 'gameCode', type: 'string', description: 'Game identifier from game list', required: true },
        { name: 'currency', type: 'string', description: 'Player currency code', required: true },
        { name: 'language', type: 'string', description: 'ISO 639-1 language code', required: false },
      ],
    },
  ],
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "gameUrl": "https://games.bullplay.example/launch?token=abc123",
    "sessionId": "sess_9f2a1b"
  }
}`,
})

export const playerInfoPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/player/info',
  title: '/v1/player/info',
  description: 'Retrieve player profile information by player code or external ID.',
  queryParams: [
    { name: 'playerCode', type: 'number', description: 'Bull Play player code', required: false },
    {
      name: 'playerExternalId',
      type: 'string',
      description: 'Unique player identifier from the operator system',
      required: false,
    },
  ],
  notes: 'Pass playerCode or playerExternalId as a query parameter.',
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "playerCode": 100000121,
    "playerExternalId": "playerId_onOperatorSide",
    "status": "active"
  }
}`,
})

export const walletDepositPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/player/wallet/deposit',
  title: '/v1/player/wallet/deposit',
  description: 'Deposit funds into a player wallet. Available in Balance Transfer mode only.',
  bodyExample: `{
  "playerCode": 100000121,
  "amount": 100.00,
  "currency": "USD",
  "transactionId": "dep_unique_001"
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "balance": 100.00,
    "currency": "USD"
  }
}`,
  notes: 'This endpoint is not used in Seamless integration mode.',
})

export const walletWithdrawPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/player/wallet/withdraw',
  title: '/v1/player/wallet/withdraw',
  description: 'Withdraw funds from a player wallet. Available in Balance Transfer mode only.',
  bodyExample: `{
  "playerCode": 100000121,
  "amount": 50.00,
  "currency": "USD",
  "transactionId": "wd_unique_001"
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "balance": 50.00,
    "currency": "USD"
  }
}`,
})

export const operatorCreatePage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/operator/create',
  title: '/v1/operator/create',
  description: 'Create a new operator account in the Bull Play platform.',
  bodyExample: `{
  "name": "New Operator",
  "currencies": ["USD"]
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "operatorCode": "OP10002"
  }
}`,
})

export const operatorUpdatePage = createApiEndpointPage({
  method: 'PUT',
  path: '/v1/operator/update',
  title: '/v1/operator/update',
  description: 'Update operator configuration and integration settings.',
  bodyExample: `{
  "name": "Updated Operator Name",
  "callbackUrl": "https://operator.example/wallet"
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {}
}`,
})

export const operatorTransferBalancePage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/operator/transfer-balance',
  title: '/v1/operator/transfer-balance',
  description: 'Transfer balance between operator accounts.',
  bodyExample: `{
  "fromOperatorCode": "OP10001",
  "toOperatorCode": "OP10002",
  "amount": 1000.00,
  "currency": "USD"
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "transferId": "trf_001"
  }
}`,
})

export const providerListPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/provider/list',
  title: '/v1/provider/list',
  description: 'List all game providers available to the operator.',
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "providers": [
      {   
        "status": 1,
        "providerId": 1, 
        "providerName": "Pragmatic Play",
        "logo": "https://example.com/pragmatic.png",
      }
    ]
  }
}`,
})

export const providerSettingsPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/provider/settings',
  title: '/v1/provider/settings',
  description: 'Retrieve provider-level settings for the operator.',
  queryParams: [
    { name: 'providerId', type: 'number', description: 'Provider ID', required: true },
    {
      name: 'currency',
      type: 'string',
      description: 'Currency code for the wallet transaction (e.g., USD)',
      required: true,
    },
  ],
  responseExample: `{
    "success": true,
    "message": "OK",
    "data": {
      "settings": []
    }
  }`,
})

export const providerSettingsByIdPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/provider/settings/:providerId/:currency',
  title: '/v1/provider/settings/:providerId/:currency',
  description: 'Retrieve provider settings for a specific provider and currency.',
  pathParams: [
    { name: 'providerId', type: 'number', description: 'Provider ID', required: true },
    {
      name: 'currency',
      type: 'string',
      description: 'Currency code for the wallet transaction (e.g., USD)',
      required: true,
    },
  ],
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "providerId": "pragmatic",
    "currency": "USD",
    "enabled": true
  }
}`,
})

export const gameListPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/game/list/:providerId',
  title: '/v1/game/list/:providerId',
  description: 'List all games available from a specific provider.',
  pathParams: [
    { name: 'providerId', type: 'number', description: 'Provider ID', required: true },
  ],
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "games": [
      { "gameCode": "slot_fortune_tiger", "name": "Fortune Tiger" }
    ]
  }
}`,
})

export const gameKickPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/game/kick',
  title: '/v1/game/kick',
  description: 'Force-disconnect a player from an active game session.',
  bodyExample: `{
  "playerCode": 100000121
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {}
}`,
})

export const transactionListPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/transaction/list',
  title: '/v1/transaction/list',
  description: 'Query transaction history with optional filters.',
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "transactions": [],
    "total": 0
  }
}`,
})

export const transactionRoundPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/transaction/round',
  title: '/v1/transaction/round',
  description: 'Retrieve all transactions for a specific game round.',
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "roundId": "round_abc",
    "transactions": []
  }
}`,
})

export const bonusCallRegisterPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/bonus-call/register',
  title: '/v1/bonus-call/register',
  description: 'Register a bonus call campaign for a player.',
  bodyExample: `{
  "playerCode": 100000121,
  "gameCode": "slot_fortune_tiger",
  "rounds": 10,
  "betAmount": 1.00,
  "currency": "USD"
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "issueId": "bonus_001"
  }
}`,
})

export const bonusCallCancelPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/bonus-call/cancel',
  title: '/v1/bonus-call/cancel',
  description: 'Cancel a previously registered bonus call.',
  bodyExample: `{
  "issueId": "bonus_001"
}`,
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {}
}`,
})

export const bonusCallDetailPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/bonus-call/detail/:issueId',
  title: '/v1/bonus-call/detail/:issueId',
  description: 'Retrieve the status and details of a bonus call issue.',
  pathParams: [
    { name: 'issueId', type: 'string', description: 'Bonus call issue identifier', required: true },
  ],
  responseExample: `{
  "success": true,
  "message": "OK",
  "data": {
    "issueId": "bonus_001",
    "status": "active",
    "roundsRemaining": 8
  }
}`,
})
