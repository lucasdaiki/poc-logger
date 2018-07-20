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

server.get('/log/:requestId', (req, res, next) => {
  res.send(fuckingLogger.get(req.params.requestId));
});

// server.put('/listen', (req, res, next) => {
//   /*
//     req.body: {
//       urlPaths: [ ... ]
//     }
//   */

//   fuckingLogger.turnOn();
// });


server.listen(3000)