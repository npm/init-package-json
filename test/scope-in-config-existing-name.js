var tap = require('tap')
var init = require('../')

var json = {
  name: '@already/scoped',
  version: '1.0.0',
}

const log = console.log
console.log = function () {}

tap.test('with existing package.json', function (t) {
  const testdir = t.testdir({
    'package.json': JSON.stringify(json, null, 2),
  })
  init(testdir, testdir, { yes: 'yes', scope: '@still' }, function (er, data) {
    if (er) {
      throw er
    }

    t.equal(data.name, '@still/scoped', 'new scope is added, basic name is kept')
    t.end()
  })
})

tap.test('teardown', function (t) {
  console.log = log
  t.end()
})
