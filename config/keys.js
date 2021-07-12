// check environment, if not production
// load keys from root-level .env file (DO NOT COMMIT FILE)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  bithompApiKey: process.env.BITHOMP_API_KEY,
  xummApiKey: process.env.XUMM_API_KEY,
  xummApiSecret: process.env.XUMM_API_SECRET,
  appXrplAddress: 'r9pRgEJnRvYsTg3hxGScPx4WTapj2KYLRp'
};
