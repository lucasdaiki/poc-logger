const { promisify } = require('util')
const mongojs = require('mongojs')

class DB {
  constructor({ collection, config = 'mydb' } = {}) {
    this.db = mongojs(config, [collection])[collection]
  }

  save(data) {
    return promisify(this.db.save.bind(this.db))(data)
  }

  get(filter) {
    return promisify(this.db.find.bind(this.db))(filter);
  }
}

module.exports = DB;