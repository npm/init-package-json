var tap = require('tap')
var init = require('../')

var EXPECT = {
  name: 'tap-testdir-yes-defaults---yes-defaults',
  version: '1.0.0',
  description: '',
  author: '',
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  main: 'index.js',
  keywords: [],
  license: 'ISC',
}

const log = console.log
console.log = function () {}

tap.test('--yes defaults', function (t) {
  const testdir = t.testdir({})
  init(testdir, testdir, {yes: 'yes'}, function (er, data) {
    if (er) {
      throw er
    }

    t.has(data, EXPECT, 'used the default data')
    t.end()
  })
})

tap.test('teardown', function (t) {
  console.log = log
  t.end()
})
