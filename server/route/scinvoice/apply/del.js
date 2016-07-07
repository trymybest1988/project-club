var logger = require('../../../util/logger')
var applyDb = require('../../../lib/apply')
var message = require('../../../util/message')

exports.post = function * () {
  logger.info('[api post]接口参数:', this.request.body)
  var msg, delMsg
  var applicationId = this.request.body.applicationId
  var apply = yield applyDb.get(applicationId)
  console.log('[mongoose] get 数据库数据:', apply)
  if (!apply) {
    msg = '删除失败，不存在此数据'
    console.log(msg)
    this.body = message.error({
      message: msg
    })
    return
  }
  delMsg = yield applyDb.del(applicationId)
  this.body = message.success({data: delMsg})
  if (delMsg.result.ok) {
    this.body = message.success({message: '删除数据成功'})
    return
  }
  this.body = message.error({
    message: '删除数据失败'
  })
}
