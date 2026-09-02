import type { DocPage, DocParam, HttpMethod } from '@/types/documentation'

interface ApiEndpointConfig {
  method: HttpMethod
  path: string
  title: string
  description: string
  introBlocks?: DocPage['blocks']
  pathParams?: DocParam[]
  queryParams?: DocParam[]
  bodyData?: string
  bodyParams?: DocPage['blocks']
  responseData: string
  responseParams?: DocParam[]
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
  ]

  if (config.introBlocks?.length) {
    blocks.push(...config.introBlocks)
  }

  blocks.push(
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
  )

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

  if (config.bodyData) {
    blocks.push(
      { type: 'heading', level: 2, text: 'Body', id: 'body' },
      { type: 'code', language: 'json', code: config.bodyData },
    )
    if (config.bodyParams) {
      blocks.push(...config.bodyParams)
    }
  }

  blocks.push(
    { type: 'heading', level: 2, text: 'Response', id: 'response' },
    { type: 'code', language: 'json', code: config.responseData },
  )

  if (config.responseParams?.length) {
    blocks.push({
      type: 'param-table',
      hideRequired: true,
      params: config.responseParams,
    })
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

function responseFields(dataFields: DocParam[] = []): DocParam[] {
  return [
    {
      name: 'success',
      type: 'boolean',
      description: 'Indicates whether the request was processed successfully.',
    },
    { name: 'message', type: 'string', description: 'Result message of the request.' },
    ...dataFields,
  ]
}

export const operatorInfoPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/operator/info',
  title: '/v1/operator/info',
  description: 'Retrieve the authenticated operator profile, supported currencies, and integration settings.',
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "operatorCode": "OP10001",
    "name": "Demo Operator",
    "currencies": ["USD", "EUR"],
    "integrationMode": "seamless"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Authenticated operator profile and configuration.' },
    { name: 'data.operatorCode', type: 'string', description: 'Unique operator identifier.' },
    { name: 'data.name', type: 'string', description: 'Display name of the operator.' },
    { name: 'data.currencies', type: 'string[]', description: 'Supported currency codes.' },
    {
      name: 'data.integrationMode',
      type: 'string',
      description: 'Active integration mode: seamless or transfer.',
    },
  ]),
})

export const playerCreatePage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/player/create',
  title: '/v1/player/create',
  description:
    'Links an external player (identified by a unique ID on the operator side) to the Bull Play system. Required before launching games.',
  bodyData: `{
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
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "playerCode": 100000121
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Created player information.' },
    {
      name: 'data.playerCode',
      type: 'number',
      description: 'Unique integer identifier assigned within Bull Play.',
    },
  ]),
})

export const gameLaunchPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/game/launch',
  title: '/v1/game/launch',
  description: 'Launch a game session for a registered player and receive a URL to embed or redirect.',
  bodyData: `{
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
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "gameUrl": "https://games.bullplay.example/launch?token=abc123",
    "sessionId": "sess_9f2a1b"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Launch details for the game session.' },
    {
      name: 'data.gameUrl',
      type: 'string (URL)',
      description: 'URL to embed or redirect the player into the game.',
    },
    { name: 'data.sessionId', type: 'string', description: 'Identifier of the created game session.' },
  ]),
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
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "playerCode": 100000121,
    "playerExternalId": "playerId_onOperatorSide",
    "status": "active"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Player profile information.' },
    { name: 'data.playerCode', type: 'number', description: 'Unique integer identifier assigned within Bull Play.' },
    {
      name: 'data.playerExternalId',
      type: 'string',
      description: 'Unique player identifier from the operator system.',
    },
    { name: 'data.status', type: 'string', description: 'Current player status (e.g., active).' },
  ]),
})

export const walletDepositPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/player/wallet/deposit',
  title: '/v1/player/wallet/deposit',
  description: 'Deposit funds into a player wallet. Available in Balance Transfer mode only.',
  bodyData: `{
  "playerCode": 100000121,
  "amount": 100.00,
  "currency": "USD",
  "transactionId": "dep_unique_001"
}`,
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "balance": 100.00,
    "currency": "USD"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Updated wallet balance after the deposit.' },
    { name: 'data.balance', type: 'number', description: 'Current player wallet balance.' },
    { name: 'data.currency', type: 'string', description: 'Currency code of the wallet.' },
  ]),
  notes: 'This endpoint is not used in Seamless integration mode.',
})

export const walletWithdrawPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/player/wallet/withdraw',
  title: '/v1/player/wallet/withdraw',
  description: 'Withdraw funds from a player wallet. Available in Balance Transfer mode only.',
  bodyData: `{
  "playerCode": 100000121,
  "amount": 50.00,
  "currency": "USD",
  "transactionId": "wd_unique_001"
}`,
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "balance": 50.00,
    "currency": "USD"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Updated wallet balance after the withdrawal.' },
    { name: 'data.balance', type: 'number', description: 'Current player wallet balance.' },
    { name: 'data.currency', type: 'string', description: 'Currency code of the wallet.' },
  ]),
})

export const operatorCreatePage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/operator/create',
  title: '/v1/operator/create',
  description: 'Create a new operator account in the Bull Play platform.',
  bodyData: `{
  "name": "New Operator",
  "currencies": ["USD"]
}`,
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "operatorCode": "OP10002"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Created operator information.' },
    { name: 'data.operatorCode', type: 'string', description: 'Unique operator identifier.' },
  ]),
})

export const operatorUpdatePage = createApiEndpointPage({
  method: 'PUT',
  path: '/v1/operator/update',
  title: '/v1/operator/update',
  description: 'Update operator configuration and integration settings.',
  bodyData: `{
  "name": "Updated Operator Name",
  "callbackUrl": "https://operator.example/wallet"
}`,
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {}
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Empty object when the operator update succeeds.' },
  ]),
})

export const operatorTransferBalancePage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/operator/transfer-balance',
  title: '/v1/operator/transfer-balance',
  description: 'Transfer balance between operator accounts.',
  bodyData: `{
  "fromOperatorCode": "OP10001",
  "toOperatorCode": "OP10002",
  "amount": 1000.00,
  "currency": "USD"
}`,
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "transferId": "trf_001"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Result of the balance transfer.' },
    { name: 'data.transferId', type: 'string', description: 'Unique identifier of the transfer.' },
  ]),
})

export const providerListPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/provider/list',
  title: '/v1/provider/list',
  description: 'List all game providers available to the operator.',
  responseData: `{
  "success": true,
  "message": "OK",
  "data": [
    {
      "providerId": 1,
      "providerName": "Pragmatic Play",
      "logo": "https://example.com/pragmatic.png",
      "status": 1
    }
  ]
}`,
  responseParams: responseFields([
    { name: 'data', type: 'array', description: 'List of game providers available to the operator.' },
    { name: 'data[].providerId', type: 'number', description: 'Unique identifier of the provider.' },
    { name: 'data[].providerName', type: 'string', description: 'Display name of the provider.' },
    { name: 'data[].logo', type: 'string (URL)', description: "URL of the provider's logo image." },
    {
      name: 'data[].status',
      type: 'number',
      description: 'Provider status (e.g., 1 = active, 0 = inactive).',
    },
  ]),
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
  bodyData: `{
    "settingvalue": true
  }`,  
  responseData: `{
    "success": true,
    "message": "OK",
    "data": {
      "settings": []
    }
  }`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Provider settings for the operator.' },
    { name: 'data.settings', type: 'array', description: 'List of provider-level setting entries.' },
  ]),
})

export const providerSettingsByIdPage = createApiEndpointPage({
  method: 'PUT',
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
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "providerId": "pragmatic",
    "currency": "USD",
    "enabled": true
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Settings for the specified provider and currency.' },
    { name: 'data.providerId', type: 'string', description: 'Identifier of the provider.' },
    { name: 'data.currency', type: 'string', description: 'Currency code these settings apply to.' },
    { name: 'data.enabled', type: 'boolean', description: 'Whether the provider is enabled for this currency.' },
  ]),
})

export const gameListPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/game/list/:providerId',
  title: '/v1/game/list/:providerId',
  description: 'List all games available from a specific provider.',
  pathParams: [
    { name: 'providerId', type: 'number', description: 'Provider ID', required: true },
  ],
  responseData: `{
  "success": true,
  "message": "OK",
  "data": [
    {
      "gameID": "vswaysdogs",
      "gameName": "The Dog House Megaways",
      "gameImage": "https://contents.example.com/imgae/120*120/1.png",
      "gameType": 0,
      "inMaintenance": false
    }
  ]
}`,
  responseParams: responseFields([
    { name: 'data', type: 'array', description: 'List of games available from the provider.' },
    { name: 'data[].gameID', type: 'string', description: 'Game identifier used when launching a game.' },
    { name: 'data[].gameName', type: 'string', description: 'Display name of the game.' },
    { name: 'data[].gameImage', type: 'string (URL)', description: 'URL of the game thumbnail image.' },
    {
      name: 'data[].gameType',
      type: 'number',
      description: 'Game type (0 = Slot, 1 = Live, 2 = Other).',
    },
    {
      name: 'data[].inMaintenance',
      type: 'boolean',
      description: 'Whether the game is currently in maintenance.',
    },
  ]),
})

export const gameKickPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/game/kick',
  title: '/v1/game/kick',
  description: 'Force-disconnect a player from an active game session.',
  bodyData: `{
  "playerCode": 100000121
}`,
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {}
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Empty object when the kick request succeeds.' },
  ]),
})

export const transactionListPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/transaction/list',
  title: '/v1/transaction/list',
  description: 'Query transaction history with optional filters.',
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "transactions": [],
    "total": 0
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Paginated transaction history.' },
    { name: 'data.transactions', type: 'array', description: 'List of matching transactions.' },
    { name: 'data.total', type: 'number', description: 'Total number of transactions matching the query.' },
  ]),
})

export const transactionRoundPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/transaction/round',
  title: '/v1/transaction/round',
  description: 'Retrieve all transactions for a specific game round.',
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "roundId": "round_abc",
    "transactions": []
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Transactions belonging to the requested game round.' },
    { name: 'data.roundId', type: 'string', description: 'Identifier of the game round.' },
    { name: 'data.transactions', type: 'array', description: 'List of transactions in this round.' },
  ]),
})

export const bonusCallRegisterPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/bonus-call/register',
  title: '/v1/bonus-call/register',
  description:
    'Initiates a bonus call session for a user. This endpoint validates eligibility, executes the bonus logic, and returns an issue ID which can be used for tracking or further management.',
  introBlocks: [
    {
      type: 'paragraph',
      text: 'When registering a bonus call, you need to configure the gameCode field. You can define whether the bonus event should be triggered for specific games or for all games under the selected provider.',
    },
    {
      type: 'paragraph',
      text: 'If gameCode is configured as an array of game codes, the bonus event will be triggered when the player enters any one of the specified games. Multiple game codes can be added to the array, allowing the bonus to be activated by different games within the same provider.',
    },
    {
      type: 'code',
      language: 'json',
      code: `{
  "gameCode": ["vs20olympx", "vswaysdogs", "vs20fruitsw"]
}`,
    },
    {
      type: 'paragraph',
      text: 'In this example, the bonus event will be triggered when the player enters vs20olympx, vswaysdogs, or vs20fruitsw.',
    },
    {
      type: 'paragraph',
      text: 'If gameCode is configured as "all", the bonus event will be triggered when the player enters any game under the selected provider, without applying any game-specific filtering.',
    },
    {
      type: 'code',
      language: 'json',
      code: `{
  "gameCode": "all"
}`,
    },
    {
      type: 'paragraph',
      text: 'This option is recommended when the bonus should apply globally to all games provided by the selected provider.',
    },
    {
      type: 'callout',
      variant: 'info',
      text: 'Once a bonus call is completed in one of the selected games, it will not be triggered again for other selected games.',
    },
  ],
  bodyData: `{
  "providerId": 1,
  "gameCode": ["vs20olympx", "vswaysdogs", "vs20fruitsw"],
  "playerExternalId": "playerId_onOperatorSide",
  "currency": "USD",
  "bonusType": 1,
  "callAmount": 100.00,
  "expireAt": "2026-12-01 23:59:59"
}`,
  bodyParams: [
    {
      type: 'param-table',
      params: [
        {
          name: 'issueId',
          type: 'string',
          description: 'Unique ID for the issue or request',
          required: false,
        },
        { name: 'providerId', type: 'number', description: 'Game provider ID', required: true },
        {
          name: 'gameCode',
          type: 'string[] | string',
          description:
            'Specifies which games can trigger the bonus event. Use an array of game codes to trigger the bonus when the player enters any of those games, or "all" to trigger it for any game under the selected provider.',
          required: true,
        },
        {
          name: 'playerExternalId',
          type: 'string',
          description: "Player's unique ID on the operator side",
          required: true,
        },
        { name: 'currency', type: 'string', description: 'Currency code (e.g., USD)', required: true },
        {
          name: 'bonusType',
          type: 'number',
          description:
            'Type of bonus (1 = regular bonus call, 2 = free spin bonus). Free spin bonus (bonusType=2) is available only for Pragmatic Play and EGT Digital.',
          required: true,
        },
        {
          name: 'callAmount',
          type: 'number',
          description:
            'Amount related to the bonus call. If bonusType = 1, the player will win this amount. If bonusType = 2, this is the maximum win amount — the player cannot win more than callAmount.',
          required: true,
        },
        {
          name: 'expireAt',
          type: 'string',
          description: 'Expire timestamp (YYYY-MM-DD HH:mm:ss). For example, 2026-12-01 23:59:59',
          required: true,
        },
        {
          name: 'metaData',
          type: 'object',
          description: 'Object containing detailed bonus information. Required when bonusType = 2.',
          required: false,
        },
        {
          name: 'metaData.spinAmount',
          type: 'number',
          description: 'Number of free bonus spins. Min: 10, Max: 100',
          required: true,
        },
        {
          name: 'metaData.baseBetAmount',
          type: 'number',
          description: 'Base bet amount. Example: for a 2 USD free spin, use baseBetAmount: 2',
          required: true,
        },
      ],
    },
  ],
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "issueId": "issueId_001"
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Result of the bonus call registration.' },
    { name: 'data.issueId', type: 'string', description: 'Unique ID for the issue or request.' },
  ]),
})

export const bonusCallCancelPage = createApiEndpointPage({
  method: 'POST',
  path: '/v1/bonus-call/cancel',
  title: '/v1/bonus-call/cancel',
  description: 'Cancel a previously registered bonus call.',
  bodyData: `{
    "issueId": "bonus_001"
  }`,
  responseData: `{
    "success": true,
    "message": "OK"
  }`,
  responseParams: responseFields(),
})

export const bonusCallDetailPage = createApiEndpointPage({
  method: 'GET',
  path: '/v1/bonus-call/detail/:issueId',
  title: '/v1/bonus-call/detail/:issueId',
  description: 'Retrieve the status and details of a bonus call issue.',
  pathParams: [
    { name: 'issueId', type: 'string', description: 'Bonus call issue identifier', required: true },
  ],
  responseData: `{
  "success": true,
  "message": "OK",
  "data": {
    "issueId": "bonus_001",
    "status": "active",
    "roundsRemaining": 8
  }
}`,
  responseParams: responseFields([
    { name: 'data', type: 'object', description: 'Current status and details of the bonus call issue.' },
    { name: 'data.issueId', type: 'string', description: 'Unique ID for the issue or request.' },
    { name: 'data.status', type: 'string', description: 'Current status of the bonus call (e.g., active).' },
    {
      name: 'data.roundsRemaining',
      type: 'number',
      description: 'Number of bonus rounds still remaining.',
    },
  ]),
})
