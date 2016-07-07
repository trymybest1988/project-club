var logger = require('../../../util/logger')
var applyDb = require('../../../lib/apply')
var message = require('../../../util/message')

exports.post = function * () {
  logger.info('[api post]接口参数:', this.request.body)
  var applicationId = this.request.body.applicationId
  var apply = yield applyDb.get(applicationId)
  console.log('[mongoose] get 数据库数据:', apply)
  if (apply) {
    console.log('创建失败，数据已存在')
    this.body = message.repeat()
    return
  }
  apply = yield applyDb.create(this.request.body)
  console.log('创建成功:', apply)
  this.body = message.success({data: apply})
}
