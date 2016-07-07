var validator = require('validator')
var message = require('../../../util/message')

module.exports = {
  'request': {
    'method': 'GET',
    'query': {
      'applicationId': validateNotempty
    }
  }
}

function validateNotempty (applicationId) {
  var msg
  if (applicationId === undefined || validator.isNull(applicationId)) {
    msg = message.format()
  }
  if (msg) {
    this.body = msg
  }
  return true
}
