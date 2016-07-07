var logger = require('../../../util/logger')
var applyDb = require('../../../lib/apply')
var message = require('../../../util/message')
exports.get = function * () {
  logger.info('[api get]参数:', this.query)

  var apply = yield applyDb.get(this.query.applicationId)

  console.log('[mongoose] get 数据:', apply)
  if (apply) {
    this.body = message.success({
      data: apply
    })
    return
  }
  this.body = message.error({message: '未查找到此数据'})
}
