// App env var/API keys

// check environment, if not production
// load keys from root-level .env file (DO NOT COMMIT FILE)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// export env vars and other non-secret keys
module.exports = {
  bithompApiKey: process.env.BITHOMP_API_KEY,
  xummApiKey: process.env.XUMM_API_KEY,
  xummApiSecret: process.env.XUMM_API_SECRET,
  dbUri: process.env.MONGODB_URI,
  appBaseUrl: require('./app-config').appBaseUrl,
  appWalletAddress: require('./app-config').appWalletAddress
};
