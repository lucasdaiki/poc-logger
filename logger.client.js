const request = require('axios');
const cuid = require('cuid');

const log = packageName => (step, message, requestId) => {
  return request.post(`http://localhost:3000/log/${requestId}`, {
    step,
    data: message.data,
    path: message.url_path,
    method: message.method,
    package_name: packageName,
    sent: new Date().toISOString()
  })
    .then(function (response) {
      console.log('Success');
    })
    .catch(function (error) {
      console.log('Error');
    });
}

const requestId = cuid();
console.log(requestId)

Promise.all(
  [
    log('Distributor')('', { url_path: '/v1/distributors/transaction/', method: 'POST' }, requestId),
    log('Distributor')('Validate Transaction', { data: { transaction: {} } }, requestId),
    log('Pricing')('', { url_path: '/v1/pricing/USD/', method: 'GET' }, requestId),
    log('Pricing')('Get Pricing', { data: {} }, requestId),
    log('Distributor')('Get Balance', { data: {} }, requestId),
    log('Distributor')('Create Transaction', { data: { transaction: {} } }, requestId)
  ]
).then(() => {
  request.get(`http://localhost:3000/log/${requestId}`)
    .then(res => console.log(res.data))
})
