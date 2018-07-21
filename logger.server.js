const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware');

const server = express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(loggerMiddleware('Logger Server'));

server.all('*', (req, res, next) => {
  res.send();
});

server.listen(3002)