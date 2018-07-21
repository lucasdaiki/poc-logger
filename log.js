const request = require('axios');

const log = (packageName, url = 'http://localhost:3000/log') => (step, message, requestId, type = 'LOG') => {
  return request.post(`${url}/${requestId}`, {
    step,
    type,
    data: message.data,
    request: message.request,
    package_name: packageName,
    sent: new Date().toISOString()
  },
    {
      headers: { 'x-request-id': requestId }
    })
    .then(function (response) {
      console.log('Success');
    })
    .catch(function (error) {
      console.log('Error');
    });
}

module.exports = log