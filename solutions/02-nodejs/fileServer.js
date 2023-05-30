const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    return res.end('Method Not Allowed');
  }

  if (url === '/files') {
    return handleFilesRequest(res);
  }

  if (url.startsWith('/file/')) {
    const fileName = url.slice(6);
    return serveFile(res, fileName);
  }

  res.statusCode = 404;
  res.end('Not Found');
});

function handleFilesRequest(res) {
  const directoryPath = './files';

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.statusCode = 500;
      return res.end('Internal Server Error');
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(files));
  });
}

function serveFile(res, fileName) {
  const filePath = path.join(__dirname, 'files', fileName);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (err) => {
    if (err.code === 'ENOENT') {
      res.statusCode = 404;
      res.end('File Not Found');
    } else {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  fileStream.pipe(res);
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = server;
