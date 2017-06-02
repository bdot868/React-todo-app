The complete folder/file structure here is:

```bash
.
├── README.md
├── express-jwt-api
│   ├── config
│   │   └── serverAuth.js
│   ├── controllers
│   │   └── users.js
│   ├── models
│   │   └── User.js
│   ├── package.json
│   ├── routes
│   │   └── users.js
│   └── server.js
└── jwt-client
    ├── README.md
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── clientAuth.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        └── registerServiceWorker.js
```

1. Make sure mongod is running locally in a terminal session: `mongod`

2. In another terminal session, install dependencies for the server application, and run server (it will use port 3001 by default):

   ```bash
   cd ./express-jwt-api
   # we should now be in /path/to/jwt-server-client/express-jwt-api
   npm install
   nodemon
   ```

3. In another terminal session, install dependencies for react client app, and run server (the client app will use port 3000 by default):

   ```bash
   cd ../jwt-client
   # we should now be in /path/to/jwt-server-client/jwt-client
   npm install
   npm start
   ```

Client application should start automatically in the browser, and is connected to the server via ajax http requests. The server has an open CORS policy.