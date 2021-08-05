const { XrplClient } = require('xrpl-client');

const appXrplAddress = require('../config/keys').appXrplAddress;

const client = new XrplClient('wss://fh.xrpl.ws');

async function getAccountTx() {
  try {
    const accountTx = await client.send({
      command: 'account_tx',
      account: appXrplAddress
    });

    return accountTx;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getAccountTx };
