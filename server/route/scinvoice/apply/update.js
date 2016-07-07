var logger = require('../../../util/logger')
var applyDb = require('../../../lib/apply')
var message = require('../../../util/message')

exports.post = function * () {
  logger.info('[api post]接口参数:', this.request.body)
  var msg, updateMsg
  var applicationId = this.request.body.applicationId
  var apply = yield applyDb.get(applicationId)
  console.log('[mongoose] get 数据库数据:', apply)
  if (!apply) {
    msg = '查询失败，不存在此数据'
    console.log(msg)
    this.body = message.error({
      message: msg
    })
    return
  }
  updateMsg = yield applyDb.update(applicationId, this.request.body)
  console.log('更新成功:', apply)
  if (updateMsg.ok) {
    apply = yield applyDb.get(applicationId)
    this.body = message.success({data: apply})
    return
  }
  this.body = message.error({
    message: '数据更新失败'
  })
}
