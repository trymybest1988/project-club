var path = require('path')
var fs = require('fs')
var ls = require('ls-sync')

module.exports = function tool (conf, options) {
  if (typeof conf === 'string') {
    conf = {root: conf}
  } else if (!conf || !conf.root) {
    throw new Error('`root` config required.')
  }

  var root = conf.root
  var wildcard = conf.wildcard || '*'
  var scheme = {}
  ls(root).forEach(function (filePath) {
    var stat = fs.lstatSync(filePath)
    var exportFuncs, pathRegexp
    if (!stat.isDirectory()) {
      exportFuncs = require(filePath)
      pathRegexp = formatPath(filePath, root, wildcard)
      scheme[pathRegexp] = exportFuncs
    }
  })
  if (options.debug) {
    console.log('scheme:', scheme)
  }
  return scheme
}

function formatPath (filePath, root, wildcard) {
  return filePath
    .replace(path.join(process.cwd(), root), '')
    .replace(/\\/g, '/')
    .replace(new RegExp('/\\' + wildcard, 'g'), '/:')
    .split('.')[0]
}
