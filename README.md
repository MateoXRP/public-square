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

The following files are used by the app and are NOT included in repo because they contain API keys/secrets :  
`./client/src/react-app.env.js`  
`./config/keys_dev.js`

#### env/config

[Todo]

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
