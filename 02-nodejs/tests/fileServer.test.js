const request = require('supertest');
const { Readable } = require('stream');
const path = require('path');
const fs = require('fs');
const server = require('../fileServer');

describe('API Endpoints', () => {
  let app;

  beforeAll(() => {
    app = server;
  });

  afterAll((done) => {
    app.close(done);
  });

  describe('GET /files', () => {
    test('should return a list of files', async () => {
      const response = await request(app).get('/files');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should handle internal server error', async () => {
      const directoryPath = path.resolve(__dirname, '../files/');
      jest
        .spyOn(fs, 'readdir')
        .mockImplementation((directoryPath, callback) => {
          callback(new Error('Mocked Internal Server Error'), null);
        });

      const response = await request(app).get('/files');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Internal Server Error');

      fs.readdir.mockRestore();
    });
  });

  describe('GET /file/:filename', () => {
    const testFilePath = path.join(__dirname, '../files', 'test-file.txt');

    beforeAll(() => {
      fs.writeFileSync(testFilePath, 'Test file content');
    });

    afterAll(() => {
      fs.unlinkSync(testFilePath);
    });

    test('should serve the requested file', async () => {
      const response = await request(app).get('/file/test-file.txt');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Test file content');
    });

    test('should handle file not found', async () => {
      const response = await request(app).get('/file/non-existing-file.txt');

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('File Not Found');
    });

    test('should handle internal server error', async () => {
      jest.spyOn(fs, 'createReadStream').mockImplementation(() => {
        const stream = new Readable();
        process.nextTick(() => {
          stream.emit('error', new Error('Mocked Internal Server Error'));
        });
        return stream;
      });

      const response = await request(app).get('/file/test-file.txt');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Internal Server Error');

      fs.createReadStream.mockRestore();
    });
  });

  describe('Invalid Routes', () => {
    test('should return 404 for invalid routes', async () => {
      const response = await request(app).get('/invalid');

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Not Found');
    });
  });
});
