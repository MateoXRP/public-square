// Fees charged by app for submitting post, comment or like
const currencySubmitFees = {
  // currency
  XRP: {
    // amount: fee charged for submitting post/comment/like
    // in drops: 0.01 XRP = 10,000
    amount: '1000000'
  },
  MGS: {
    amount: 1.0
  }
};

module.exports = currencySubmitFees;
