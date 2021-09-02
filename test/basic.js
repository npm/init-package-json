var common = require('./lib/common')
var init = require('../')
var test = require('tap').test

const log = console.log
console.log = function () {}

test('the basics', function (t) {
  const dir = t.testdir({})
  init(dir, 'test/basic.input', { foo: 'bar' }, function (er, data) {
    if (er) {
      throw er
    }
    var expect = {
      name: 'the-name',
      version: '1.2.5',
      description: 'description',
      author: 'npmbot <n@p.m> (http://npm.im)',
      scripts: { test: 'make test' },
      main: 'main.js',
      config: { foo: 'bar' },
      package: {},
    }
    t.same(data, expect)
    t.end()
  })
  common.drive([
    'the-name\n',
    'description\n',
    'yes\n',
  ])
})

test('no config', function (t) {
  const dir = t.testdir({})
  init(dir, 'test/basic.input', function (er, data) {
    if (er) {
      throw er
    }
    var expect = {
      name: 'the-name',
      version: '1.2.5',
      description: 'description',
      author: 'npmbot <n@p.m> (http://npm.im)',
      scripts: { test: 'make test' },
      main: 'main.js',
      config: {},
      package: {},
    }
    t.same(data, expect)
    t.end()
  })
  common.drive([
    'the-name\n',
    'description\n',
    'yes\n',
  ])
})

test('teardown', function (t) {
  console.log = log
  t.end()
})
