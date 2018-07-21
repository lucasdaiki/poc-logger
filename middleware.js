const cuid = require('cuid');
const mung = require('express-mung');
const log = require('./log');

module.exports = packageName => (req, _res, next) => {
  req.id = req.headers['x-request-id'] || cuid();

  mung.json((body, _req, res) => {
    log(packageName)(
      '',
      {
        request: {
          method: req.method,
          url_path: req.path,
          body: req.body,
          headers: req.headers,
          response: {
            body,
            statusCode: res.statusCode,
            headers: res._headers,
          }
        }
      },
      req.id,
      'REQUEST'
    )

    next();
    
  })(req, _res, next);
}
