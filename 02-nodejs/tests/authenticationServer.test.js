const http = require('http');
const server = require('../authenticationServer');

describe('API Tests', () => {
  let authToken;

  beforeAll((done) => {
    server.close(done);
    server.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should allow a user to sign up', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const requestBody = JSON.stringify({ username, password });

    const options = {
      method: 'POST',
      path: '/signup',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestBody.length,
      },
    };

    const response = await sendRequest(options, requestBody);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe('Signup successful');
  });

  it('should allow a user to login', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const requestBody = JSON.stringify({ username, password });

    const options = {
      method: 'POST',
      path: '/login',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestBody.length,
      },
    };

    const response = await sendRequest(options, requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json');
    expect(response.body).toBeDefined();

    const responseBody = JSON.parse(response.body);
    expect(responseBody.authToken).toBeDefined();

    authToken = responseBody.authToken;
  });

  it('should return unauthorized for accessing protected data without authentication', async () => {
    const options = {
      method: 'GET',
      path: '/data',
      headers: {},
    };

    const response = await sendRequest(options);

    expect(response.statusCode).toBe(401);
    expect(response.body).toBe('Unauthorized');
  });

  it('should return the mock data for accessing protected data with authentication', async () => {
    const options = {
      method: 'GET',
      path: '/data',
      headers: {
        Authorization: authToken,
      },
    };

    const response = await sendRequest(options);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json');

    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Mock data');
  });
});

function sendRequest(options, requestBody) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        ...options,
        host: 'localhost',
        port: 3000,
      },
      (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      }
    );

    req.on('error', (err) => {
      reject(err);
    });

    if (requestBody) {
      req.write(requestBody);
    }

    req.end();
  });
}
