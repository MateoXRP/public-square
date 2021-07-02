const { XrplClient } = require('xrpl-client');

const client = new XrplClient('wss://fh.xrpl.ws');

async function getAccountTx() {
  try {
    const accountTx = await client.send({
      command: 'account_tx',
      account: 'r9pRgEJnRvYsTg3hxGScPx4WTapj2KYLRp'
    });

    return accountTx;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getAccountTx };
