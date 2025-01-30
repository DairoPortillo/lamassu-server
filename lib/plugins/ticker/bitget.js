const axios = require('axios');
const { COINS } = require('@lamassu/coins');

const BN = require('../../bn');
const { WLD } = COINS; // Assuming WLD is defined in your COINS

const CRYPTO = [WLD];
const FIAT = 'USD';

function ticker(fiatCode, cryptoCode) {
  return axios.get(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=${cryptoCode}USDT`)
    .then(r => {
      const data = r.data.data[0]; // Accessing the first item in the data array
      const price = new BN(data.lastPr.toString()); // Extracting price from lastPr
      return {
        rates: {
          ask: new BN(price), // Optional: Extract ask price
          bid: new BN(price), // Optional: Extract bid price
        }
      };
    });
}

module.exports = {
  ticker,
  name: 'Bitget',
  CRYPTO,
  FIAT
};