const { XrplClient } = require('xrpl-client');

const { appWalletAddress } = require('../config/keys');

const client = new XrplClient('wss://fh.xrpl.ws');

/**
 * @desc get transactions for XRP account from XRPL
 * @return {object} includes array of transactions
 */
async function getAccountTx() {
  try {
    const config = {
      command: 'account_tx',
      account: appWalletAddress
      // default limit = 200
    };

    const accountTx = await client.send(config);

    return accountTx;
  } catch (error) {
    console.log('xrpl-client error: ', error.message);

    return error;
  }
}

/**
 * @desc get transactions with request limit for XRP account from XRPL
 * @param {number} limit cap on tx returned
 * @return {object} includes array of transactions
 */
async function getAccountTxByLimit(limit) {
  try {
    const config = {
      command: 'account_tx',
      account: appWalletAddress,
      limit
    };

    const accountTx = await client.send(config);

    // console.log('getAcctTx res: ', accountTx);
    return accountTx;
  } catch (error) {
    console.log('xrpl-client error: ', error.message);

    return error;
  }
}

/**
 * @desc get transactions using marker for XRP account from XRPL
 * @param {number} limit cap on tx returned
 * @param {object} marker cursor
 * @return {object} includes array of transactions
 */
async function getAccountTxByMarker(limit, marker) {
  try {
    const config = {
      command: 'account_tx',
      account: appWalletAddress
    };

    if (marker) {
      config.marker = marker;
    }

    // overwrite default limit (200)
    if (limit) {
      config.limit = limit;
    }
    // console.log('config: ', config);

    const accountTx = await client.send(config);

    // console.log('getAcctTx res: ', accountTx);
    return accountTx;
  } catch (error) {
    console.log('xrpl-client error: ', error.message);

    return error;
  }
}

module.exports = { getAccountTx, getAccountTxByLimit, getAccountTxByMarker };
