const http = require('http');
const { v4: uuidv4 } = require('uuid');
const url = require('url');

let todos = [];

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  const method = req.method;

  if (method === 'GET' && pathname === '/todos') {
    handleGetAllTodos(res);
  } else if (method === 'GET' && pathname.startsWith('/todos/')) {
    const todoId = pathname.slice(7);
    handleGetTodoById(res, todoId);
  } else if (method === 'POST' && pathname === '/todos') {
    handleCreateTodoItem(req, res);
  } else if (method === 'PUT' && pathname.startsWith('/todos/')) {
    const todoId = pathname.slice(7);
    handleUpdateTodoItem(req, res, todoId);
  } else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
    const todoId = pathname.slice(7);
    handleDeleteTodoItem(res, todoId);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

function handleGetAllTodos(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(todos));
}

function handleGetTodoById(res, todoId) {
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(todo));
  } else {
    res.statusCode = 404;
    res.end('TODO not found');
  }
}

function handleCreateTodoItem(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const newTodo = JSON.parse(body);
    const todoId = uuidv4();
    newTodo.id = todoId;
    todos.push(newTodo);

    res.statusCode = 201;
    res.end(JSON.stringify({ id: todoId }));
  });
}

function handleUpdateTodoItem(req, res, todoId) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const updatedTodo = JSON.parse(body);
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex !== -1) {
      todos[todoIndex] = { id: todoId, ...updatedTodo };

      res.statusCode = 200;
      res.end('TODO updated');
    } else {
      res.statusCode = 404;
      res.end('TODO not found');
    }
  });
}

function handleDeleteTodoItem(res, todoId) {
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);

    res.statusCode = 200;
    res.end('TODO deleted');
  } else {
    res.statusCode = 404;
    res.end('TODO not found');
  }
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = server;
