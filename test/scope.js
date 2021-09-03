const tap = require('tap')
const init = require('../')
const path = require('path')
const cwd = process.cwd()

tap.test('the scope', function (t) {
  const testdir = tap.testdir({})
  // process.chdir(testdir)

  const EXPECT = {
    name: '@foo/test',
    version: '1.2.5',
    description: 'description',
    author: 'npmbot <n@p.m> (http://npm.im)',
    scripts: { test: 'make test' },
    main: 'main.js',
    config: { scope: '@foo' },
    package: {},
  }

  init(testdir, path.join(cwd, 'test/basic.input'), {scope: '@foo'}, function (er, data) {
    if (er) {
      throw er
    }

    t.has(data, EXPECT)
    t.end()
  })
  for (const line of [
    '@foo/test\n',
    'description\n',
    'yes\n',
  ]) {
    process.stdin.push(line)
  }
})
