const CURRENCY_MAX = 9999999
const MIN_NUMBER_OF_CASSETTES = 2
const MAX_NUMBER_OF_CASSETTES = 4
const WALLET_SCORING_DEFAULT_THRESHOLD = 9

const AUTOMATIC = 'automatic'
const MANUAL = 'manual'

const IP_CHECK_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const SWEEPABLE_CRYPTOS = ['ETH']

export {
  CURRENCY_MAX,
  MIN_NUMBER_OF_CASSETTES,
  MAX_NUMBER_OF_CASSETTES,
  AUTOMATIC,
  MANUAL,
  WALLET_SCORING_DEFAULT_THRESHOLD,
  IP_CHECK_REGEX,
  SWEEPABLE_CRYPTOS
}
