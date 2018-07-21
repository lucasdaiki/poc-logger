const cuid = require('cuid');
const log = require('./log');

module.exports = packageName => (req, res, next) => {
  req.id = req.headers['x-request-id'] || cuid();

  log(packageName)(
    '',
    {
      request: {
        method: req.method,
        url_path: req.path,
        body: req.body
      }
    },
    req.id,
    'REQUEST'
  )
}
