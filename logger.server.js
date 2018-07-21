const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware');
const log = require('./log');

const server = express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(loggerMiddleware('Logger Server'));

server.all('*', (req, res, next) => {
  log('x Logger Server x')('STEP 0 BABE', { data: { potato: 2226625410 } }, req.id)
  res.setHeader('x-request-id', req.id);
  log('x Logger Server x')('STEP 1 BABE', { data: { potato: 2226625411 } }, req.id)
  res.send({ potato: 222662541123 });
  log('x Logger Server x')('STEP 2 BABE', { data: { potato: 2226625412 } }, req.id)

  
});

server.listen(3002)