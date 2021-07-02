const axios = require('axios');
let fs = require('fs');

const config = {
  headers: {
    'content-type': 'application/json',
    'x-bithomp-token': 'abcd-abcd-0000-abcd-0123abcdabcd'
  }
};

const baseURL = `https://bithomp.com/api/v2/address/`;

async function getBithompUsername(address) {
  try {
    // const result = await axios.get(`${baseURL}${address}`, config);
    // console.log('bithomp result: ', result.data);
    // const { username } = result.data;

    // temporary: to be replaced with bithomp request
    const usernameList = fs.readFileSync('./usernames.txt', 'utf8');
    const usernameMap = new Map(
      usernameList.split(',').map(user => user.split(':'))
    );
    const username = usernameMap.has(address) ? usernameMap.get(address) : '';

    // console.log('username: ', username);

    return username;
  } catch (error) {
    console.log('bithomp error: ', error);
    return error;
  }
}

module.exports = { getBithompUsername };
