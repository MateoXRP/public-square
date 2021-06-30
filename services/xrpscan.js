const axios = require('axios');

const config = {
  headers: {
    'content-type': 'application/json'
  }
};

const baseURL = `https://api.xrpscan.com/api/v1/account/`;

/**
 * @desc get associated email hash for XRP account with XRPSCAN
 * @param {string} account XRP account/address
 * @return {promise} email hash associated with account or ''
 */
async function getEmailHash(account) {
  try {
    const { data } = await axios.get(`${baseURL}${account}`, config);

    if (data.error) return '';
    const { emailHash } = data.settings;
    // console.log('email hash: ', emailHash);

    return emailHash;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = { getEmailHash };
