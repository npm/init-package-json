var tap = require('tap')
var init = require('../')

var json = {
  name: '@already/scoped',
  version: '1.0.0',
}

tap.test('with existing package.json', function (t) {
  const testdir = t.testdir({
    'package.json': JSON.stringify(json, null, 2),
  })
  // process.chdir(testdir)
  init(testdir, testdir, { yes: 'yes', scope: '@still' }, function (er, data) {
    if (er) {
      throw er
    }

    t.equal(data.name, '@still/scoped', 'new scope is added, basic name is kept')
    t.end()
  })
})
