/**
  You need to create a native HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't use any Node.js backend framework like Express.js, Backbone.js, etc. Use Node.js native libraries.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array
  - Use native Node.js `crypto` module to hash the passwords

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account.
    Request Body: JSON object with username and password fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Allows users to log in and obtain an authentication token.
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Access Protected Data
    Description: Allows authenticated users to access protected data (return any mock data in response)
    Request Header: `authorization` token should be present in header obtained during login.
    Response: 200 OK with the protected data in JSON format if the token is valid, or 401 Unauthorized if the token is missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
});

const users = [];

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    salt,
    hash,
  };
}

function verifyPassword(password, salt, hash) {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hashToVerify === hash;
}

function handleSignup(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const { username, password } = JSON.parse(body);

    if (users.some((user) => user.username === username)) {
      res.statusCode = 400;
      res.end('Username already exists');
      return;
    }

    const { salt, hash } = hashPassword(password);
    const user = {
      username,
      salt,
      hash,
    };
    users.push(user);

    res.statusCode = 201;
    res.end('Signup successful');
  });
}

function handleLogin(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const { username, password } = JSON.parse(body);
    const user = users.find((u) => u.username === username);

    if (!user || !verifyPassword(password, user.salt, user.hash)) {
      res.statusCode = 401;
      res.end('Invalid credentials');
      return;
    }

    const authToken = crypto.randomBytes(16).toString('hex');
    user.authToken = authToken;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ authToken }));
  });
}

function handleData(req, res) {
  const authToken = req.headers['authorization'];

  if (!authToken || !users.some((user) => user.authToken === authToken)) {
    res.statusCode = 401;
    res.end('Unauthorized');
    return;
  }

  const data = {
    message: 'Mock data',
  };
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = server;
