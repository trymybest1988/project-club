var Apply = require('../model/apply')

exports.create = function (apply) {
  return Apply.create(apply)
}
exports.get = function (applicationId) {
  return Apply.findOne({applicationId: applicationId}).exec()
}
exports.find = function (query) {
  return Apply.find(query).exec()
}
exports.page = function (pageNum, pageSize) {
  return this.pageByQuery(pageNum, pageSize)
}
exports.pageByQuery = function (query, pageNum, pageSize) {
  if (typeof query === 'number') {
    pageSize = pageNum
    pageNum = query
    query = {}
  }
  return Apply.find(query).skip(pageSize * (pageNum - 1)).limit(pageSize)
}
exports.update = function (applicationId, updateData) {
  return Apply.update({applicationId: applicationId, updateData})
}
exports.del = function (applicationId) {
  return Apply.remove({ applicationId: applicationId })
}
