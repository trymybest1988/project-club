// koa相关
var koa = require('koa')
var onerror = require('koa-onerror')
var staticCache = require('koa-static')
var router = require('koa-frouter')
var bodyParser = require('koa-bodyparser')
var scheme = require('koa-scheme')
// console,yargs（参数）
var logger = require('./server/util/logger')
var chalk = require('chalk')
require('./server/util/helper')()
// db
var mongoose = require('mongoose')
// utils
var path = require('path')
var schemeParams = require('./server/util/schemeParams')
var message = require('./server/util/message')
var config = require('config')
// webpack
var webpackDevMiddleware = require('koa-webpack-dev-middleware')
var webpack = require('webpack')
var webpackConf = require('./webpack.config')
var compiler = webpack(webpackConf)

var app = koa()
var port = config.get('port')
var ip = config.get('ip')
var isProduction = function () {
  return process.env.NODE_ENV === 'production'
}

mongoose.connect(config.get('mongodb.url'), function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + config.get('mongodb.url') + '. ' + err)
  } else {
    console.log('Succeeded connected to: ' + config.get('mongodb.url'))
  }
})
onerror(app, {
  json: function () {
    console.log('json 500')
    this.status = 500
    this.body = message.system()
  }
})
app.use(bodyParser())
app.use(scheme(schemeParams(config.get('schemeConf'), {debug: true}), {debug: true}))
app.use(staticCache(path.join(__dirname, isProduction() ? 'dist' : 'src')))
app.use(router(app, config.get('routerConf')))
if (!isProduction()) {
  app.use(webpackDevMiddleware(compiler, {
    contentBase: webpackConf.output.path,
    publicPath: webpackConf.output.publicPath,
    hot: true,
    stats: webpackConf.devServer.stats
  }))
}
app.listen(port, ip, function () {
  logger.info(chalk.magenta('Server') +
    chalk.magenta(isProduction() ? '[压缩版]' : '[开发版]') +
    ' listening on ' + chalk.green.underline('http://' + ip + ':' + port) + ', Ctrl+C to stop')
})
