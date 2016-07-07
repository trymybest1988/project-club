var yargs = require('yargs')
var _ = require('lodash')

module.exports = function () {
  var argv = yargs.option('ip', {
    describe: 'Node service address',
    type: 'string'
  })
  .option('port', {
    describe: 'app port',
    type: 'number'
  })
  .option('env', {
    alias: 'node_env',
    type: 'string',
    choices: ['production', 'development'],
    describe: 'environment variable'
  })
  .usage('Usage: node app [options]')
  .example('node app --env=production', 'Open service in product environment')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2016')
  .argv

  var processParams = _.omit(argv, ['_', '$0', 'h', 'help'])
  _.each(processParams, function (value, key) {
    if (value !== undefined) {
      process.env[key.toUpperCase()] = value
    }
  })
}
