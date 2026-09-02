import type { DocPage, DocParam } from '@/types/documentation'

interface StatusCode {
  code: string
  reason: string
}

interface WalletCallbackConfig {
  title: string
  description: string
  warning?: string
  requestExample: string
  requestParams: DocParam[]
  responseExample: string
  responseParams: DocParam[]
  errorExample: string
  statusCodes: StatusCode[]
  statusNote: string
  timeoutNote?: string
}

const idempotentWarning =
  'This is an idempotent operation. If the wallet receives more than one request with the same transactionId, the transaction must be registered only once in the wallet.'

function createWalletCallbackPage(config: WalletCallbackConfig): DocPage {
  const blocks: DocPage['blocks'] = [
    {
      type: 'api-endpoint',
      method: 'POST',
      path: '{operatorCallbackURL}',
      description: config.description,
    },
  ]

  if (config.warning) {
    blocks.push({ type: 'callout', variant: 'warning', text: config.warning })
  }

  blocks.push(
    {
      type: 'table',
      headers: ['Property', 'Value'],
      rows: [
        ['URL', '{operatorCallbackURL}'],
        ['Method', 'POST'],
        ['Headers', 'X-Request-Signature, Content-Type, Accept'],
      ],
    },
    { type: 'heading', level: 2, text: 'Request', id: 'request' },
    { type: 'code', language: 'json', code: config.requestExample },
    { type: 'param-table', params: config.requestParams },
    { type: 'heading', level: 2, text: 'Response', id: 'response' },
    { type: 'code', language: 'json', code: config.responseExample },
    { type: 'param-table', params: config.responseParams },
    { type: 'heading', level: 2, text: 'Possible Status Codes', id: 'possible-status-codes' },
    {
      type: 'table',
      headers: ['Status codes', 'Reason'],
      rows: config.statusCodes.map((item) => [item.code, item.reason]),
    },
    { type: 'paragraph', text: config.statusNote },
  )

  if (config.timeoutNote) {
    blocks.push({ type: 'callout', variant: 'info', text: config.timeoutNote })
  }

  blocks.push(
    { type: 'heading', level: 2, text: 'Example', id: 'example' },
    { type: 'heading', level: 3, text: 'Request', id: 'example-request' },
    { type: 'code', language: 'json', code: config.requestExample },
    { type: 'heading', level: 3, text: 'OK Response', id: 'example-ok-response' },
    { type: 'code', language: 'json', code: config.responseExample },
    { type: 'heading', level: 3, text: 'Error Response', id: 'example-error-response' },
    { type: 'code', language: 'json', code: config.errorExample },
  )

  return { title: config.title, description: config.description, blocks }
}

export const balanceCallbackPage = createWalletCallbackPage({
  title: 'Balance',
  description:
    "Bull Play sends this callback when a player launches or enters a game, and every minute during gameplay, to update the player's balance. Verify that the player's session is still active and authenticated before processing the request.",
  requestExample: `{
  "command": "balance",
  "playerId": "1101",
  "currency": "EUR",
  "timestamp": 1586335186372
}`,
  requestParams: [
    { name: 'command', type: 'string', description: 'Indicates the request type.', required: true },
    {
      name: 'playerId',
      type: 'string',
      description: "Unique identifier of the player from the operator's system.",
      required: true,
    },
    {
      name: 'currency',
      type: 'string',
      description: 'Player currency, according to ISO-4217 (EUR, USD, ...).',
      required: true,
    },
    { name: 'timestamp', type: 'number', description: 'Timestamp of the request.', required: true },
  ],
  responseExample: `{
  "balance": 19839891,
  "statusCode": "OK"
}`,
  responseParams: [
    { name: 'balance', type: 'number', description: 'Player balance.', required: false },
    { name: 'statusCode', type: 'string', description: 'Status code of the execution.', required: true },
  ],
  errorExample: `{
  "statusCode": "ERR_INVALID_ACCOUNT"
}`,
  statusCodes: [
    { code: 'OK', reason: 'Request successful' },
    {
      code: 'ERR_INVALID_ACCOUNT',
      reason: 'The player currency does not match the currency code provided in the request.',
    },
    { code: 'ERR_NOT_AUTHENTICATED', reason: 'Player is not authenticated' },
    { code: 'ERR_INVALID_PLAYER_ID', reason: 'Invalid player ID' },
    { code: 'ERR_INTEGRITY_CHECK_FAILED', reason: 'Message integrity check failed.' },
    { code: 'ERR_UNKNOWN', reason: 'Internal server error' },
  ],
  statusNote:
    'If statusCode is different from "OK", the request is treated as unsuccessful. No retry schedule is created for any error type. The current process flow is terminated and an error message is presented to the player.',
})

export const betCallbackPage = createWalletCallbackPage({
  title: 'Bet',
  description:
    "When a player places a bet, Bull Play sends this callback to deduct the bet amount from the player's balance and retrieve the updated balance.",
  warning: idempotentWarning,
  requestExample: `{
  "command": "bet",
  "transactionId": "SP215202",
  "playerId": "1101",
  "roundId": "65215842315484512",
  "providerId": 2,
  "providerName": "EGT Digital",
  "gameCode": "FSHBLSlot",
  "gameName": "40 Burning Hot Bell Link",
  "currency": "EUR",
  "amount": 10,
  "isRoundFinished": true,
  "isCall": false,
  "timestamp": 1586335186372
}`,
  requestParams: [
    { name: 'command', type: 'string', description: 'Indicates the request type.', required: true },
    {
      name: 'transactionId',
      type: 'string',
      description: 'Unique reference of the transaction created in the Bull Play API.',
      required: true,
    },
    {
      name: 'playerId',
      type: 'string',
      description: "Unique identifier of the player from the operator's system.",
      required: true,
    },
    { name: 'roundId', type: 'string', description: 'Unique reference of the game round.', required: true },
    {
      name: 'providerId',
      type: 'number',
      description: 'Unique identifier of the provider in the Bull Play API.',
      required: true,
    },
    { name: 'providerName', type: 'string', description: 'The name of the provider.', required: true },
    {
      name: 'gameCode',
      type: 'string',
      description: 'Unique identifier of the game in the Bull Play API.',
      required: true,
    },
    { name: 'gameName', type: 'string', description: 'The name of the game.', required: true },
    {
      name: 'currency',
      type: 'string',
      description: 'Player currency, according to ISO-4217 (EUR, USD, ...).',
      required: true,
    },
    { name: 'amount', type: 'number', description: 'Transfer amount.', required: true },
    {
      name: 'isRoundFinished',
      type: 'boolean',
      description:
        'Indicates whether the round is finished. If true, no win callback will be sent after this callback. If false, further callbacks (for example a win) will follow. If the player loses, this value is true.',
      required: true,
    },
    {
      name: 'isCall',
      type: 'boolean',
      description: 'If true, the player is undergoing a bonus call event.',
      required: true,
    },
    { name: 'timestamp', type: 'number', description: 'Timestamp of the request.', required: true },
  ],
  responseExample: `{
  "balance": 19839891,
  "statusCode": "OK"
}`,
  responseParams: [
    { name: 'balance', type: 'number', description: 'Player balance.', required: true },
    { name: 'statusCode', type: 'string', description: 'Status code of the execution.', required: true },
  ],
  errorExample: `{
  "statusCode": "ERR_NOT_ENOUGH_MONEY",
  "balance": 19839895
}`,
  statusCodes: [
    { code: 'OK', reason: 'Request successful' },
    { code: 'ERR_NOT_AUTHENTICATED', reason: 'Player is not authenticated' },
    {
      code: 'ERR_NOT_ENOUGH_MONEY',
      reason: 'Player account does not have sufficient funds to complete the operation.',
    },
    { code: 'ERR_INTEGRITY_CHECK_FAILED', reason: 'Message integrity check failed.' },
    { code: 'ERR_UNKNOWN', reason: 'Internal server error' },
  ],
  statusNote:
    'If statusCode is different from "OK", the request is treated as unsuccessful. An unsuccessful bet request cancels the current game round, so the player cannot proceed further. Depending on the error type, a reversal request may be initiated to close remaining open rounds for the player.',
  timeoutNote:
    "A response must be returned within 3 seconds. If the callback times out or returns a specific error, Bull Play will not retry. If it fails, a cancel request will be sent to revert the current game round.",
})

export const winCallbackPage = createWalletCallbackPage({
  title: 'Win',
  description:
    "When a player wins, Bull Play sends this callback to credit the win amount to the player's balance and retrieve the updated balance.",
  warning: idempotentWarning,
  requestExample: `{
  "command": "win",
  "transactionId": "SP215202",
  "playerId": "1101",
  "roundId": "65215842315484512",
  "providerId": 2,
  "providerName": "EGT Digital",
  "gameCode": "FSHBLSlot",
  "gameName": "40 Burning Hot Bell Link",
  "currency": "EUR",
  "amount": 100,
  "isRoundFinished": true,
  "isCall": false,
  "timestamp": 1586335186372
}`,
  requestParams: [
    { name: 'command', type: 'string', description: 'Indicates the request type.', required: true },
    {
      name: 'transactionId',
      type: 'string',
      description: 'Unique reference of the transaction created in the Bull Play API.',
      required: true,
    },
    {
      name: 'playerId',
      type: 'string',
      description: "Unique identifier of the player from the operator's system.",
      required: true,
    },
    { name: 'roundId', type: 'string', description: 'Unique reference of the game round.', required: true },
    {
      name: 'providerId',
      type: 'number',
      description: 'Unique identifier of the provider in the Bull Play API.',
      required: true,
    },
    { name: 'providerName', type: 'string', description: 'The name of the provider.', required: true },
    {
      name: 'gameCode',
      type: 'string',
      description: 'Unique identifier of the game in the Bull Play API.',
      required: true,
    },
    { name: 'gameName', type: 'string', description: 'The name of the game.', required: true },
    {
      name: 'currency',
      type: 'string',
      description: 'Player currency, according to ISO-4217 (EUR, USD, ...).',
      required: true,
    },
    { name: 'amount', type: 'number', description: 'Transfer amount.', required: true },
    {
      name: 'isRoundFinished',
      type: 'boolean',
      description:
        'Indicates whether the round is finished. If true, no other win callbacks will be sent after this callback. If false, further corresponding callbacks will be sent.',
      required: true,
    },
    {
      name: 'isCall',
      type: 'boolean',
      description: 'If true, the player is undergoing a bonus call event.',
      required: true,
    },
    { name: 'timestamp', type: 'number', description: 'Timestamp of the request.', required: true },
  ],
  responseExample: `{
  "balance": 19839891,
  "statusCode": "OK"
}`,
  responseParams: [
    { name: 'balance', type: 'number', description: 'Player balance.', required: true },
    { name: 'statusCode', type: 'string', description: 'Status code of the execution.', required: true },
  ],
  errorExample: `{
  "statusCode": "ERR_UNKNOWN",
  "balance": 19839880
}`,
  statusCodes: [
    { code: 'OK', reason: 'Request successful' },
    { code: 'ERR_INTEGRITY_CHECK_FAILED', reason: 'Message integrity check failed.' },
    { code: 'ERR_NOT_AUTHENTICATED', reason: 'Player is not authenticated' },
    { code: 'ERR_UNKNOWN', reason: 'Internal server error' },
  ],
  statusNote: 'If statusCode is different from "OK", the request is treated as unsuccessful.',
  timeoutNote:
    'A response must be provided within 4 seconds. If the callback times out or returns a specific error, Bull Play will automatically retry the request up to two more times.',
})

export const cancelCallbackPage = createWalletCallbackPage({
  title: 'Cancel',
  description:
    "This request is sent when a player's bet fails to complete successfully — for example due to network issues, timeouts, or system errors. It refunds the full bet amount to the player's balance.",
  warning: idempotentWarning,
  requestExample: `{
  "command": "cancel",
  "transactionId": "SP215202",
  "referenceId": "SP215201",
  "playerId": "1101",
  "roundId": "65215842315484512",
  "providerId": 2,
  "providerName": "EGT Digital",
  "gameCode": "FSHBLSlot",
  "gameName": "40 Burning Hot Bell Link",
  "currency": "EUR",
  "amount": 10,
  "timestamp": 1586335186372
}`,
  requestParams: [
    { name: 'command', type: 'string', description: 'Indicates the request type.', required: true },
    {
      name: 'transactionId',
      type: 'string',
      description: 'Unique reference of the transaction created in the Bull Play API.',
      required: true,
    },
    {
      name: 'referenceId',
      type: 'string',
      description: 'The transaction ID of the bet that should be canceled.',
      required: true,
    },
    {
      name: 'playerId',
      type: 'string',
      description: "Unique identifier of the player from the operator's system.",
      required: true,
    },
    { name: 'roundId', type: 'string', description: 'Unique reference of the game round.', required: true },
    {
      name: 'providerId',
      type: 'number',
      description: 'Unique identifier of the provider in the Bull Play API.',
      required: true,
    },
    { name: 'providerName', type: 'string', description: 'The name of the provider.', required: true },
    {
      name: 'gameCode',
      type: 'string',
      description: 'Unique identifier of the game in the Bull Play API.',
      required: true,
    },
    { name: 'gameName', type: 'string', description: 'The name of the game.', required: true },
    {
      name: 'currency',
      type: 'string',
      description: 'Player currency, according to ISO-4217 (EUR, USD, ...).',
      required: true,
    },
    { name: 'amount', type: 'number', description: 'Refund amount.', required: true },
    { name: 'timestamp', type: 'number', description: 'Timestamp of the request.', required: true },
  ],
  responseExample: `{
  "balance": 19839891,
  "statusCode": "OK"
}`,
  responseParams: [
    { name: 'balance', type: 'number', description: 'Player balance.', required: true },
    { name: 'statusCode', type: 'string', description: 'Status code of the execution.', required: true },
  ],
  errorExample: `{
  "statusCode": "ERR_TRANSACTION_DOES_NOT_EXIST",
  "balance": 19839890
}`,
  statusCodes: [
    { code: 'OK', reason: 'Request successful' },
    { code: 'ERR_NOT_AUTHENTICATED', reason: 'Player is not authenticated' },
    {
      code: 'ERR_TRANSACTION_DOES_NOT_EXIST',
      reason: "The referenced transaction is not initiated in the operator's system.",
    },
    { code: 'ERR_TRANSACTION_ROLLED_BACK', reason: 'The referenced transaction is already reversed.' },
    { code: 'ERR_INTEGRITY_CHECK_FAILED', reason: 'Message integrity check failed.' },
    { code: 'ERR_UNKNOWN', reason: 'Internal server error' },
  ],
  statusNote: 'If statusCode is different from "OK", the request is treated as unsuccessful.',
  timeoutNote:
    'A response must be provided within 4 seconds. If the callback times out or returns a specific error, Bull Play will automatically retry the request up to two more times.',
})
