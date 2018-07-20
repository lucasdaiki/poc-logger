class FuckingLogger {
  constructor() {
    this.requestIds = {};
  }

  log(requestId, data) {
    if (!this.requestIds[requestId]) {
      this.requestIds[requestId] = []
    }

    this.requestIds[requestId] = [].concat(this.requestIds[requestId], data);
  }

  get(requestId) {
    return this.requestIds[requestId];
  }
}

module.exports = FuckingLogger;