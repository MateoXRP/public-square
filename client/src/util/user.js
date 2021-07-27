// user info utils using localStorage

function saveUserAccountToLS(account) {
  try {
    if (account) {
      localStorage.setItem('xumm_account', account);
      console.log('User account saved to LS');
    } else {
      console.log('No account found');
    }
  } catch (error) {
    console.log('Error saving user account');
    console.log(error);
  }
}

function saveUserTokenToLS(userToken) {
  try {
    if (userToken) {
      localStorage.setItem('xumm_user_token', userToken);
      console.log('User token saved to LS');
    } else {
      console.log('No user token found');
    }
  } catch (error) {
    console.log('Error saving user userToken');
    console.log(error);
  }
}

function getUserTokenFromLS() {
  try {
    const token = localStorage.getItem('xumm_user_token');
    console.log('User token: ', token);
    return token;
  } catch (error) {
    console.log('Error getting user token from LS');
    console.log(error);
    return null;
  }
}

function getUserAccountFromLS() {
  try {
    const account = localStorage.getItem('xumm_account');
    console.log('User account: ', account);
    return account;
  } catch (error) {
    console.log('Error getting user account from LS');
    console.log(error);
    return null;
  }
}

function clearUserInfoFromLS() {
  try {
    localStorage.removeItem('xumm_account');
    localStorage.removeItem('xumm_user_token');
    console.log('User info cleared from LS');
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
