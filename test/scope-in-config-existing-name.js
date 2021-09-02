var fs = require('fs')
var path = require('path')

var rimraf = require('rimraf')
var tap = require('tap')

var init = require('../')

var json = {
  name: '@already/scoped',
  version: '1.0.0'
}

const log = console.log
console.log = function () {}

tap.test('with existing package.json', function (t) {
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(json, null, 2))
  init(__dirname, __dirname, { yes: 'yes', scope: '@still' }, function (er, data) {
    if (er) throw er

    t.equal(data.name, '@still/scoped', 'new scope is added, basic name is kept')
    t.end()
  })
})

tap.test('teardown', function (t) {
  console.log = log
  rimraf(__dirname + '/package.json', t.end.bind(t))
})
