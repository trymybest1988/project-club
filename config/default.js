module.exports = {
  ip: process.env.IP || '127.0.0.1',
  port: process.env.PORT || 4000,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/club'
  },
  schemeConf: './server/validator',
  routerConf: './server/route',
  env: {
    asset: '',
    origin: '',
    api: ''
  }
}
