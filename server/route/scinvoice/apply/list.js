var logger = require('../../../util/logger')
var applyDb = require('../../../lib/apply')
var message = require('../../../util/message')
exports.get = function * () {
  logger.info('[api get]参数:', this.query)
  var params = {}
  if (Number(this.query.pageNum)) {
    params = Number(this.query.pageNum)
  }
  var list = yield applyDb.find(params)

  console.log('[mongoose] get 数据:', list)
  if (list) {
    this.body = message.success({
      data: list
    })
    return
  }
  this.body = message.error({message: '未查找到此数据'})
}
