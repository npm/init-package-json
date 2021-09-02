var test = require('tap').test
var init = require('../')
var common = require('./lib/common')

const log = console.log
console.log = function () {}

test('uppercase', function (t) {
  const testdir = t.testdir({})
  init(testdir, '', {}, function (er, data) {
    if (er) {
      throw er
    }

    var wanted = {
      name: 'the-name',
      version: '1.0.0',
      description: '',
      scripts: { test: 'echo "Error: no test specified" && exit 1' },
      license: 'ISC',
      author: '',
      main: 'index.js',
    }
    t.has(data, wanted)
    t.end()
  })
  common.drive([
    'THE-NAME\n',
    'the-name\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'yes\n',
  ])
})

test('teardown', function (t) {
  console.log = log
  t.end()
})
