const { COINS } = require('@lamassu/coins')
const _ = require('lodash/fp')

const { ORDER_TYPES } = require('./consts')

const ORDER_TYPE = ORDER_TYPES.MARKET
const { BTC, BCH, DASH, ETH, LTC, ZEC, USDT, USDT_TRON, LN, WLD } = COINS
const CRYPTO = [BTC, ETH, LTC, DASH, ZEC, BCH, USDT, USDT_TRON, LN, WLD]
const FIAT = ['USD']
const DEFAULT_FIAT_MARKET = 'USD'
const REQUIRED_CONFIG_FIELDS = ['apiKey', 'privateKey', 'currencyMarket']

const loadConfig = (account) => {
  const mapper = {
    'privateKey': 'secret'
  }
  const mapped = _.mapKeys(key => mapper[key] ? mapper[key] : key)(account)
  return { ...mapped, timeout: 3000 }
}

module.exports = { loadConfig, DEFAULT_FIAT_MARKET, REQUIRED_CONFIG_FIELDS, CRYPTO, FIAT, ORDER_TYPE }
