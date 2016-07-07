var winston = require('winston')
var chalk = require('chalk')
var date = require('./date')

module.exports = (function () {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: function () {
          return date.format(new Date(), 'yyyy.MM.dd HH:mm:ss')
        },
        formatter: function (options) {
          // Return string will be passed to logger.
          return (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
        }
      }),
      new (winston.transports.File)({
        timestamp: function () {
          return date.format(new Date(), 'yyyy.MM.dd HH:mm:ss')
        },
        filename: 'somefile.log'
      })
    ]
  })
})()
