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
const PORT = 3000;

const server = http.createServer((req, res) => {});

module.exports = server;
