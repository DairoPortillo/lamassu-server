const _ = require('lodash/fp')
const axios = require('axios')

const BN = require('../../../bn')

const E = require('../../../error')

const pjson = require('../../../../package.json')
const userAgent = 'Lamassu-Server/' + pjson.version

const NAME = 'Cuculabs'
const SUPPORTED_COINS = ['WLD']
const CUCULABS_API = 'https://cuculabs.vakanopay.com/api/v1'
const walletEquivalents = {
    'WLD': 'wld.optimism'
}

function request(token, endpoint, method, data={}) {
    const headers = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-api-key': token
    }
    return axios({
        method: method,
        url: CUCULABS_API + endpoint,
        headers: headers,
        data: data
    })
        .then(r => {
            if (r.error) throw r.error
            console.log(r)
            return r.data
        })
        .catch(err => {
            // console.log(err)
            throw new Error(err)
        })
}

function checkCryptoCode(cryptoCode) {
    if (!SUPPORTED_COINS.includes(cryptoCode)) {
        return Promise.reject(new Error('Unsupported crypto: ' + cryptoCode))
    }

    return Promise.resolve()
}

function sendCoins(account, tx, settings, operatorId) {
    const { toAddress, cryptoAtoms, cryptoCode } = tx
    let walletId = account[`${cryptoCode}WalletId`]
    let currency = walletEquivalents[cryptoCode]

    return checkCryptoCode(cryptoCode)
        .then(() => request(account.token, '/transactions', 'post', {
            wallet_id: walletId,
            to_address: toAddress,
            amount: cryptoAtoms.toNumber() / 1e18,
            currency: currency
        }))
        .then(result => {
            let fee = 0
            let txid = result.txid

            return { txid: txid, fee: new BN(fee).decimalPlaces(0) }
        })
        .catch(err => {
            if (err.message === 'insufficient funds') throw new E.InsufficientFundsError()
            throw err
        })
}

function balance(account, cryptoCode, settings, operatorId) {
    let walletId = account[`${cryptoCode}WalletId`]
    let currency = walletEquivalents[cryptoCode]
    let URL = `/wallets/${currency}/detail/${walletId}`
    return checkCryptoCode(cryptoCode)
        .then(() => request(account.token, URL,'get'))
        .then(result => new BN(result.balance).shiftedBy(18).decimalPlaces(0))
}

function newAddress(account, info, tx, settings, operatorId) {
    // console.log(account, info, tx, settings, operatorId);

    let cryptoCode = info.cryptoCode;

    let walletId = account[`${cryptoCode}WalletId`]
    return checkCryptoCode(cryptoCode)
        .then(() => request(account.token, '/wallets', 'post', {
            wallet_id: walletId,
        }))
        .then(result => {
            return result.address
        })
}

function getStatus(account, tx, requested, settings, operatorId) {
    const { toAddress, cryptoCode } = tx
    let currency = walletEquivalents[cryptoCode]
    let URL = `/wallets/${currency}/${toAddress}`
    return checkCryptoCode(cryptoCode)
        .then(() => request(account.token, URL, 'get'))
        .then(result => {
            const balance = new BN(result.balance).shiftedBy(18).decimalPlaces(0)
            if (balance.gte(requested)) return { receivedCryptoAtoms: balance, status: 'confirmed' }
            if (balance.gt(0)) return { receivedCryptoAtoms: balance, status: 'insufficientFunds' }
            return { receivedCryptoAtoms: balance, status: 'notSeen' }
        })
}

function newFunding(account, cryptoCode, settings, operatorId) {
    let walletId = account[`${cryptoCode}WalletId`]
    let currency = walletEquivalents[cryptoCode]
    let URL = `/wallets/${currency}/detail/${walletId}`
    return checkCryptoCode(cryptoCode)
        .then(() => request(account.token, URL,'get'))
        .then(result => Promise.all([result.address, result.balance]))
        .then(([address, balance]) => {
            return {
              // with the old api is not possible to get pending balance
              fundingPendingBalance: new BN(0),
              fundingConfirmedBalance: new BN(balance).shiftedBy(18).decimalPlaces(0),
              fundingAddress: address
            }
        })
}

function cryptoNetwork(account, cryptoCode, settings, operatorId) {
    return checkCryptoCode(cryptoCode)
        .then(() => account.environment === 'test' ? 'test' : 'main')
}

function checkBlockchainStatus(cryptoCode) {
    return checkCryptoCode(cryptoCode)
        .then(() => Promise.resolve('ready'))
}

module.exports = {
    NAME,
    balance,
    sendCoins,
    newAddress,
    getStatus,
    newFunding,
    cryptoNetwork,
    checkBlockchainStatus
}
