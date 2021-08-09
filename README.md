# public-square

### Installation

Clone repo with SSH

```
git clone git@github.com:rayGreycloud/public-square.git

```

Or clone with http

```
git clone https://github.com/rayGreycloud/public-square.git
```

Move into repo root folder and install dependencies using npm or yarn

```
cd gfam-web
npm install
```

Move into /client folder and install dependencies using npm or yarn

```
cd client
npm install
```

Move back to root folder

```
cd ..
```

### Configuration/Set-up

#### API keys

- The app requires certain API keys to be available as environment variables.
  - BITHOMP_API_KEY
  - XUMM_API_KEY
  - XUMM_API_SECRET
- For production, the keys are set as in the Heroku dashboard.
- For local development, the keys are set in an `.env` file, which is NOT included in repo for security reasons. An example `.env` file is included showing the format/syntax.

- Setup

1. Obtain Bithomp and Xumm credentials (see below).
2. To run the app locally, replace the placeholder values in `.env.example` with your Bithomp API key, Xumm API key and Xumm API secret.
3. Rename the file, `.env` (no other file ext, e.g. .txt or .js)

4. For production, go to the Heroku dashboard for your app > Settings > Config Vars. See [Heroku docs/config vars](https://devcenter.heroku.com/articles/config-vars) for more information.
5. Add your Bithomp API key, Xumm API key and Xumm API secret using the uppercase variable names from `.env` file as the keys.

#### Xumm setup

1. Register your app with Xumm and obtain API key and secret - [Xumm register your app](https://xumm.readme.io/docs/register-your-app)
2.

#### Bithomp setup

1. Obtain Bithomp API key. [Sign up for developer key](https://bithomp.com/developer)
2. Add API key to `.env` file
3. Add API key as Config Vars to Heroku deployment

#### Other configuration

- `/config/app-config.js` (required)
  1. Set your app's URL as `appBaseUrl`
  2. Set the wallet address for your app as `appWalletAddress`
  3. Note: app transactions to your app wallet will have a destination tag (99 - posts, 100 - comments, 101 - likes )
- `/config/currency-submit-fees.js`
  1. Sets fee amount for submitting a post/comment/like
- `/client/src/config/coil-monetization.js` (required)
  1. if Coil monetization desired, set your Coil payment pointer in this file
  2. otherwise, set payment pointer to empty string `''`
- `/client/src/config/submit-fee-settings.js`
  1. Sets labels for submission fees
- `/client/src/config/tip-settings.js`
  1. Sets the min/max tip amounts
- `/client/src/config/blacklisted-transactions.js` (required)
  1. Set `blackListedTransactions` to empty array []
  2. see below for more info
- `/client/src/config/whitelisted-transactions.js` (required)
  1. Set `whiteListedTransactions` to empty array []
  2. see below for more info

### Transaction blacklist

- List of transactions that are filtered from app results and not displayed
- For test transactions, non-app related transactions connected to `appWalletAddress`, or transactions containing content that violates TOS or applicable laws
- To add a post, comment or other transaction to the blacklist, add its transaction hash to the `blacklistedTransactions` array in `./config/blacklisted-transactions.js`

### Transaction whitelist

- List of transactions that are explicitly included in app results
- These are legacy transactions that predate the current app and do not comply with current transaction data shape
- Set `whiteListedTransactions` to empty array []

### Start development servers

```
npm run dev
```

### Dev localhost ports:

- Server: `5000`
- Client: `3000`

The server port can be changed in `server.js` (line 28). The port number specified in `proxy` in `./client/package.json` (line 49) must match the server port.

To change the client server port from the default `3000`, set an environmental variable by adding a `env.development.local.env` file to the `client` folder with

```
PORT=1234
```

### Asset location

- logo image: `./client/src/assets/logo.png`
- favicon: `./client/public/favicon.png`

### Resources

- [Create React App docs](https://facebook.github.io/create-react-app/docs)
- [Heroku docs](https://devcenter.heroku.com/)
- [Bithomp docs](https://docs.bithomp.com/#introduction)
- [Xumm docs](https://xumm.readme.io/docs/introduction)
