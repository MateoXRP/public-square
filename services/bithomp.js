const axios = require('axios');
const bithompApiKey = require('../config/keys').bithompApiKey;

const config = {
  headers: {
    'content-type': 'application/json',
    'x-bithomp-token': bithompApiKey
  },
  timeout: 1000
};

const baseURL = `https://bithomp.com/api/v2`;

/**
 * @desc get associated username for XRP account from Bithomp
 * @param {string} account XRP account/address
 * @return {promise} username associated with account or undefined
 */
const getBithompUsername = async account =>
  new Promise(async function (resolve, reject) {
    console.log('getting username...');
    try {
      const result = await axios.get(
        `${baseURL}/address/${account}?username=true`,
        config
      );

      if (result.data.username) {
        console.log(`username found: ${result.data.username}`);
      }
      // if (!result.data.username) {
      //   console.log(`No username found for: ${address}`);
      // }

      const { username } = result.data;

      resolve(username);
    } catch (error) {
      console.log('bithomp error: ', error.message);

      reject(null);
    }
  });

/**
 * @desc get transaction from Bithomp
 * @param {string} transaction XRP transaction
 * @return {promise} tx data
 */
async function getTransaction(transaction) {
  try {
    const result = await axios.get(
      `${baseURL}/transaction/${transaction}`,
      config
    );

    // TODO: determine if result contains tx metadata

    return result;
  } catch (error) {
    console.log('bithomp error: ', error.message);

    return null;
  }
}

module.exports = { getBithompUsername, getTransaction };
