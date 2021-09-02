var test = require('tap').test
var init = require('../')
var common = require('./lib/common')

const log = console.log
console.log = function () {}

test('license', function (t) {
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
      license: 'Apache-2.0',
      author: '',
      main: 'index.js',
    }
    t.has(data, wanted)
    t.end()
  })
  common.drive([
    'the-name\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'Apache\n',
    'Apache-2.0\n',
    'yes\n',
  ])
})

test('teardown', function (t) {
  console.log = log
  t.end()
})
