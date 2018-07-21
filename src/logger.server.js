const express = require('express')
const bodyParser = require('body-parser');

const server = express()
const FuckingLogger = require('./FuckingLogger')

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const fuckingLogger = new FuckingLogger()

server.post('/log/:requestId', (req, res, next) => {
  fuckingLogger.log(req.params.requestId, req.body);

  res.send();
});

server.get('/log/:requestId', async (req, res, next) => {
  const result = await fuckingLogger.get(req.params.requestId)
  
  res.send(result);
});

server.get('/log/', async (req, res, next) => {
  const result = await fuckingLogger.getAll()
  
  res.send(result);
});

server.listen(3000)