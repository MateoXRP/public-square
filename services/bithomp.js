const axios = require('axios');
const bithompApiKey = require('../config/keys').bithompApiKey;

const config = {
  headers: {
    'content-type': 'application/json',
    'x-bithomp-token': bithompApiKey
  }
};

const baseURL = `https://bithomp.com/api/v2`;

/**
 * @desc get associated username for XRP account from Bithomp
 * @param {string} account XRP account/address
 * @return {promise} username associated with account or undefined
 */
const getBithompUsername = async account =>
  new Promise(async function (resolve, reject) {
    // console.log('getting username...');
    try {
      const result = await axios.get(
        `${baseURL}/address/${account}?username=true`,
        config
      );

      // console.log('result.data: ', result.data);
      if (result.data.username) {
        console.log(`username found: ${result.data.username}`);
      }

      const { username } = result.data;

      return resolve(username);
    } catch (error) {
      console.log('bithomp error: ', error.message);

      return reject(null);
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

    return result;
  } catch (error) {
    console.log('bithomp error: ', error.message);

    return null;
  }
}

module.exports = { getBithompUsername, getTransaction };
