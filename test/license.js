var test = require('tap').test
var init = require('../')
var rimraf = require('rimraf')
var common = require('./lib/common')

const log = console.log
console.log = function () {}

test('license', function (t) {
  init(__dirname, '', {}, function (er, data) {
    if (er)
      throw er

    var wanted = {
      name: 'the-name',
      version: '1.0.0',
      description: '',
      scripts: { test: 'echo "Error: no test specified" && exit 1' },
      license: 'Apache-2.0',
      author: '',
      main: 'basic.js'
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
    'yes\n'
  ])
})

test('teardown', function (t) {
  console.log = log
  rimraf(__dirname + '/package.json', t.end.bind(t))
})
