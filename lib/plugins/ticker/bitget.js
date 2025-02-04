const axios = require('axios');
const { COINS } = require('@lamassu/coins');

const BN = require('../../bn');
const { WLD } = COINS; // Assuming WLD is defined in your COINS

const CRYPTO = [WLD];
const FIAT = 'USD';

function ticker(fiatCode, cryptoCode) {
  return axios.get(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=${cryptoCode}USDT`)
    .then(r => {
        const data = r.data.data[0];
        const price = new BN(data.lastPr.toString()); // Precio en USDT

        // Retornar la promesa de la segunda solicitud para encadenar correctamente
        return axios.get(`https://bitpay.com/rates/USDT/${fiatCode}`)
            .then(r2 => {
                const rate_fiat = new BN(r2.data.data.rate.toString());
                return { price, rate_fiat };
            })
            .catch(err => {
                console.error(`Bitpay ticker: ${err}`);
                return { price, rate_fiat: new BN('0') }; // Usar BN directamente
            });
    })
    .then(({ price, rate_fiat }) => {
        console.log(`Bitget ticker: ${cryptoCode}USDT -> ${fiatCode} -> ${price.toString()} -> ${rate_fiat.toString()}`);

        // Multiplicación correcta usando BN
        const price_fiat = price.multipliedBy(rate_fiat);

        return {
            rates: {
                ask: price_fiat,
                bid: price_fiat,
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