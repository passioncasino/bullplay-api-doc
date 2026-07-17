import type { DocPage } from '@/types/documentation'

function createWalletCallbackPage(
  title: string,
  description: string,
  bodyExample: string,
  responseExample: string,
): DocPage {
  return {
    title,
    description,
    blocks: [
      {
        type: 'callout',
        variant: 'info',
        text: 'This endpoint is implemented on your server. Bull Play sends POST requests to your configured callback URL during gameplay.',
      },
      { type: 'api-endpoint', method: 'POST', path: `/${title.toLowerCase()}`, description },
      { type: 'heading', level: 2, text: 'Request body', id: 'request-body' },
      { type: 'code', language: 'json', code: bodyExample },
      { type: 'heading', level: 2, text: 'Expected response', id: 'expected-response' },
      { type: 'code', language: 'json', code: responseExample },
      {
        type: 'param-table',
        title: 'Response fields',
        params: [
          { name: 'success', type: 'boolean', description: 'Whether the operation succeeded', required: true },
          {
            name: 'balance',
            type: 'number',
            description: 'Updated player balance after the operation',
            required: true,
          },
          { name: 'currency', type: 'string', description: 'Currency code', required: true },
        ],
      },
    ],
  }
}

export const balanceCallbackPage = createWalletCallbackPage(
  'Balance',
  'Return the current available balance for a player. Called before bets and on session start.',
  `{
  "playerCode": 100000121,
  "currency": "USD",
  "sessionId": "sess_9f2a1b"
}`,
  `{
  "success": true,
  "balance": 250.00,
  "currency": "USD"
}`,
)

export const betCallbackPage = createWalletCallbackPage(
  'Bet',
  'Debit the player balance when a bet is placed. Must be processed atomically and idempotently.',
  `{
  "playerCode": 100000121,
  "amount": 5.00,
  "currency": "USD",
  "transactionId": "tx_bet_001",
  "roundId": "round_abc",
  "gameCode": "slot_fortune_tiger"
}`,
  `{
  "success": true,
  "balance": 245.00,
  "currency": "USD"
}`,
)

export const winCallbackPage = createWalletCallbackPage(
  'Win',
  'Credit the player balance when a win occurs.',
  `{
  "playerCode": 100000121,
  "amount": 25.00,
  "currency": "USD",
  "transactionId": "tx_win_001",
  "roundId": "round_abc",
  "gameCode": "slot_fortune_tiger"
}`,
  `{
  "success": true,
  "balance": 270.00,
  "currency": "USD"
}`,
)

export const cancelCallbackPage = createWalletCallbackPage(
  'Cancel',
  'Reverse a previously accepted bet when a round is cancelled or rolled back.',
  `{
  "playerCode": 100000121,
  "amount": 5.00,
  "currency": "USD",
  "transactionId": "tx_bet_001",
  "referenceTransactionId": "tx_bet_001"
}`,
  `{
  "success": true,
  "balance": 250.00,
  "currency": "USD"
}`,
)
