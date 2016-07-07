var validator = require('validator')
var message = require('../../../util/message')

module.exports = {
  'request': {
    'method': 'POST',
    'body': {
      'applicationId': isNotEmpty('applicationId格式不正确')
    }
  }
}

function isNotEmpty (msg) {
  return function (paramVal) {
    var msgObj
    if (paramVal === undefined || validator.isNull(paramVal)) {
      msgObj = message.format({
        message: msg || '参数格式不正确'
      })
    }
    if (msgObj) {
      this.body = msgObj
    }
    return true
  }
}
