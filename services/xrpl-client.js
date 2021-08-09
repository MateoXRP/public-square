const { XrplClient } = require('xrpl-client');

const { appWalletAddress } = require('../config/keys');

const client = new XrplClient('wss://fh.xrpl.ws');

/**
 * @desc get transactions for XRP account from XRPL
 * @param {string} account XRP account/address
 * @return {promise} array of transactions
 */
async function getAccountTx() {
  try {
    const accountTx = await client.send({
      command: 'account_tx',
      account: appWalletAddress
    });

    return accountTx;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getAccountTx };
