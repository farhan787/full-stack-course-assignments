const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'POST' && url === '/signup') {
    handleSignup(req, res);
  } else if (method === 'POST' && url === '/login') {
    handleLogin(req, res);
  } else if (method === 'GET' && url === '/data') {
    handleData(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
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
