/**
  You need to create a native HTTP server in Node.js which will handle the logic of a file server.
  - Don't use any Node.js backend framework like Express.js, Backbone.js, etc. Use Node.js native libraries.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use Node.js native filesystem readstream pipe method to return the file content in the response
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found.
     Example: GET http://localhost:3000/file/example.txt

    - Since both endpoints are GET requests, you also need to block all the requests having other methods for security purpose.
    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */

const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {});

module.exports = server;
