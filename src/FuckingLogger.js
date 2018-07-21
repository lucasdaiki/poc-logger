const DB = require('./DB');

class FuckingLogger {
  constructor() {
    this.requestIds = {};
    this.db = new DB({ collection: 'logs' });
  }

  async log(requestId, receivedData) {
    const { sent, package_name, step, data, request } = receivedData

    const type = request ? 'REQUEST' : 'LOG';

    this.db.save({
      requestId,
      package_name,
      step: type === 'LOG' ? step : `${request.method}: ${request.url_path}`,
      data,
      request,
      type,
      received_at: new Date(),
      sent: new Date(sent),
    })
  }

  get(requestId) {
    return this.db.get({ requestId });
  }

  getAll() {
    return this.db.get({});
  }
}

module.exports = FuckingLogger;