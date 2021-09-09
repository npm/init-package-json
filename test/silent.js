const tap = require('tap')
const init = require('../')

const log = console.log

tap.test('silent: true', function (t) {
  const testdir = t.testdir({})
  // process.chdir(testdir)
  let logged = false
  console.log = function () {
    logged = true
  }
  t.teardown(() => {
    console.log = log
  })
  init(testdir, testdir, {yes: 'yes', silent: true}, function (er, data) {
    if (er) {
      throw er
    }

    t.notOk(logged, 'did not print anything')
    t.end()
  })
})
