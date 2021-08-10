// user info utils using localStorage

/**
 * @desc save user xumm account to local storage
 * @param {string} account
 * @return {null}
 */
function saveUserAccountToLS(account) {
  try {
    if (account) {
      localStorage.setItem('xumm_account', account);
    } else {
      console.log('No account found');
    }
  } catch (error) {
    console.log('Error saving user account');
    console.log(error);
  }
}

/**
 * @desc save xumm user token to local storage
 * @param {string} account
 * @return {null}
 */
function saveUserTokenToLS(userToken) {
  try {
    if (userToken) {
      localStorage.setItem('xumm_user_token', userToken);
    } else {
      console.log('No user token found');
    }
  } catch (error) {
    console.log('Error saving user userToken');
    console.log(error);
  }
}

/**
 * @desc retreive xumm user token from local storage
 * @return {string} token
 */
function getUserTokenFromLS() {
  try {
    const token = localStorage.getItem('xumm_user_token');
    return token;
  } catch (error) {
    console.log('Error getting user token from LS');
    console.log(error);
    return null;
  }
}

/**
 * @desc retreive user xumm account from local storage
 * @return {string} user xumm account
 */
function getUserAccountFromLS() {
  try {
    const account = localStorage.getItem('xumm_account');
    return account;
  } catch (error) {
    console.log('Error getting user account from LS');
    console.log(error);
    return null;
  }
}

/**
 * @desc clears user xumm account and user token from local storage
 * @return {null}
 */
function clearUserInfoFromLS() {
  try {
    localStorage.removeItem('xumm_account');
    localStorage.removeItem('xumm_user_token');
  } catch (error) {
    console.log('Error removing user info from LS');
    console.log(error);
  }
}

export {
  saveUserAccountToLS,
  saveUserTokenToLS,
  getUserAccountFromLS,
  getUserTokenFromLS,
  clearUserInfoFromLS
};
