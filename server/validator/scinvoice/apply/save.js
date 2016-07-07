var validator = require('validator')
var message = require('../../../util/message')

module.exports = {
  'request': {
    'method': 'POST',
    'body': {
      'applicationId': isNotEmpty('applicationId格式不正确'),
      'recipientName': isNotEmpty('recipientName格式不正确'),
      'recipientPhone': isPhone
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

function isPhone (phoneNum) {
  var msg
  if (phoneNum === undefined || !validator.isMobilePhone(phoneNum, 'zh-CN')) {
    msg = message.format({
      message: '手机号格式不正确'
    })
  }
  if (msg) {
    this.body = msg
  }
  return true
}
