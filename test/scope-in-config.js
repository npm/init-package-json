var tap = require('tap')
var init = require('../')

tap.test('--yes with scope', function (t) {
  const testdir = t.testdir({})
  // process.chdir(testdir)
  var EXPECT = {
    name: '@scoped/tap-testdir-scope-in-config---yes-with-scope',
    version: '1.0.0',
    description: '',
    author: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    main: 'index.js',
    keywords: [],
    license: 'ISC',
  }

  init(testdir, testdir, { yes: 'yes', scope: '@scoped' }, function (er, data) {
    if (er) {
      throw er
    }

    t.has(data, EXPECT)
    t.end()
  })
})
