import type { DocPage } from '@/types/documentation'
import {
  welcomePage,
  introductionPage,
  fundamentalsPage,
} from './guides'
import {
  seamlessIntegrationPage,
  balanceTransferPage,
  bonusCallPage,
  mainApiPage,
  seamlessWalletOverviewPage,
} from './integrations'
import {
  operatorInfoPage,
  operatorCreatePage,
  operatorUpdatePage,
  operatorTransferBalancePage,
  playerCreatePage,
  playerInfoPage,
  walletDepositPage,
  walletWithdrawPage,
  providerListPage,
  providerSettingsPage,
  providerSettingsByIdPage,
  gameListPage,
  gameLaunchPage,
  gameKickPage,
  transactionListPage,
  transactionRoundPage,
  bonusCallRegisterPage,
  bonusCallCancelPage,
  bonusCallDetailPage,
} from './api-endpoints'
import {
  balanceCallbackPage,
  betCallbackPage,
  winCallbackPage,
  cancelCallbackPage,
} from './seamless-wallet'

export const pageRegistry: Record<string, DocPage> = {
  '/': welcomePage,
  '/introduction': introductionPage,
  '/fundamentals': fundamentalsPage,
  '/seamless-integration': seamlessIntegrationPage,
  '/balance-transfer-integration': balanceTransferPage,
  '/bonus-call': bonusCallPage,
  '/main-api': mainApiPage,
  '/seamless-wallet-api': seamlessWalletOverviewPage,
  '/api/v1/operator/info': operatorInfoPage,
  '/api/v1/operator/create': operatorCreatePage,
  '/api/v1/operator/update': operatorUpdatePage,
  '/api/v1/operator/transfer-balance': operatorTransferBalancePage,
  '/api/v1/player/create': playerCreatePage,
  '/api/v1/player/info': playerInfoPage,
  '/api/v1/player/wallet/deposit': walletDepositPage,
  '/api/v1/player/wallet/withdraw': walletWithdrawPage,
  '/api/v1/provider/list': providerListPage,
  '/api/v1/provider/settings': providerSettingsPage,
  '/api/v1/provider/settings/{providerId}/{currency}': providerSettingsByIdPage,
  '/api/v1/game/list/{providerId}': gameListPage,
  '/api/v1/game/launch': gameLaunchPage,
  '/api/v1/game/kick': gameKickPage,
  '/api/v1/transaction/list': transactionListPage,
  '/api/v1/transaction/round': transactionRoundPage,
  '/api/v1/bonus-call/register': bonusCallRegisterPage,
  '/api/v1/bonus-call/cancel': bonusCallCancelPage,
  '/api/v1/bonus-call/detail/{issueId}': bonusCallDetailPage,
  '/seamless-wallet/balance': balanceCallbackPage,
  '/seamless-wallet/bet': betCallbackPage,
  '/seamless-wallet/win': winCallbackPage,
  '/seamless-wallet/cancel': cancelCallbackPage,
}

export function getPageByPath(path: string): DocPage | undefined {
  return pageRegistry[path]
}
