/*
 * 统一消息输出格式
 * @author: renmaomin
 * @date:   2016-07-04
 */

var _ = require('lodash')
var messageCode = require('../enum/messageCode')

var res = {
  success: function (sucessObj) {
    return _.extend({
      status: messageCode.SUCESS,
      message: '成功'
    }, sucessObj)
  },
  error: function (errorObj) {
    return _.extend({
      status: messageCode.FAIL,
      message: '失败'
    }, errorObj)
  },
  format: function (formatObj) {
    return _.extend({
      status: messageCode.INFO_PARAM_INVALID,
      message: '参数格式不正确'
    }, formatObj)
  },
  repeat: function (repeatObj) {
    return _.extend({
      status: messageCode.INFO_CREATE_REPEAT,
      message: '创建失败，不允许重复创建'
    }, repeatObj)
  },
  system: function (systemObj) {
    return _.extend({
      status: messageCode.ERROR_JSON,
      message: 'json格式不正确'
    }, systemObj)
  }

}
module.exports = res
