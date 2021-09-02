var tap = require('tap')
var init = require('../')

var log = console.log
var logged = false
console.log = function () {
  logged = true
}

tap.test('silent: true', function (t) {
  const testdir = t.testdir({})
  init(testdir, testdir, {yes: 'yes', silent: true}, function (er, data) {
    if (er) {
      throw er
    }

    t.notOk(logged, 'did not print anything')
    t.end()
  })
})

tap.test('teardown', function (t) {
  console.log = log
  t.end()
})
