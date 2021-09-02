var tap = require('tap')
var init = require('../')

var EXPECT = {
  name: '@foo/test',
  version: '1.2.5',
  description: 'description',
  author: 'npmbot <n@p.m> (http://npm.im)',
  scripts: { test: 'make test' },
  main: 'main.js',
  config: { scope: '@foo' },
  package: {},
}

const log = console.log
console.log = function () {}

tap.test('the scope', function (t) {
  const testdir = tap.testdir({})
  init(testdir, './test/basic.input', {scope: '@foo'}, function (er, data) {
    if (er) {
      throw er
    }

    t.has(data, EXPECT)
    t.end()
  })
  setTimeout(function () {
    process.stdin.emit('data', '@foo/test\n')
  }, 50)
  setTimeout(function () {
    process.stdin.emit('data', 'description\n')
  }, 100)
  setTimeout(function () {
    process.stdin.emit('data', 'yes\n')
  }, 150)
})

tap.test('teardown', function (t) {
  console.log = log
  t.end()
})
