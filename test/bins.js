var common = require('./lib/common')
var init = require('../')
var t = require('tap')

const log = console.log
console.log = function () {}

t.test('auto bin population', function (t) {
  const dir = t.testdir({
    bin: {
      'run.js': ''
    }
  })
  init(dir, '', {}, (er, data) => {
    if (er)
      throw er
    t.same(data.bin, { 'auto-bin-test': 'bin/run.js' }, 'bin auto populated with correct path')
    t.end()
  })
  common.drive([
    'auto-bin-test\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'yes\n'
  ])
})

t.test('teardown', function (t) {
  console.log = log
  t.end()
})
