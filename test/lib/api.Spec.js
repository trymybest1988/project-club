/**
 * @fileOverview 接口测试
 * @author 妙才<renmaomin@126.com>
 */
var expect = require('chai').expect

// mocha 测试环境需要
var fetch = require('node-fetch')
var JSON = require('JSON')

describe('fetch get 测试', function () {
  this.timeout(10000)
  it('不带参数的get请求', function () {
    return fetch('http://localhost:4000/scinvoice/apply/getApply')
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      console.log('parsed json', json)
      expect(json.status).to.equal(0)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
      expect(false).to.be.true
    })
  })

  it('带参数的get请求', function () {
    return fetch('http://localhost:4000/scinvoice/apply/getApply?name=renmaomin&age=12')
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      console.log('parsed json', json)
      expect(json.status).to.equal(0)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
      expect(false).to.be.true
    })
  })

  it('带参数的post请求，并返回json格式', function () {
    return fetch('http://localhost:4000/scinvoice/apply/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Hubot',
        login: 'hubot'
      })
    }).then(function (response) {
      return response.json()
    }).then(function (json) {
      console.log('parsed json', json)
      expect(json.status).to.equal(0)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
      expect(false).to.be.true
    })
  })
})
