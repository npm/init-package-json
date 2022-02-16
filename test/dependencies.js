const tap = require('tap')
const init = require('../')
const cwd = process.cwd()

tap.test('read in dependencies and dev deps', function (t) {
  const testdirContents = {
    'package.json': JSON.stringify({
      dependencies: {
        abbrev: '*',
        tap: '*',
      },
      optionalDependencies: {
        abbrev: '*',
      },
    }),
    node_modules: {},
  }

  for (const fakedep of ['mocha', 'tap', 'async', 'foobar']) {
    testdirContents.node_modules[fakedep] = {
      'package.json': JSON.stringify({
        name: fakedep,
        version: '1.0.0',
      }),
    }
  }
  const testdir = t.testdir(testdirContents)
  process.chdir(testdir)
  t.teardown(() => {
    process.chdir(cwd)
  })
  init(testdir, '', { yes: 'yes', 'save-prefix': '^' }, function (er, data) {
    if (er) {
      throw er
    }

    const EXPECT = {
      name: 'tap-testdir-dependencies-read-in-dependencies-and-dev-deps',
      version: '1.0.0',
      description: '',
      author: '',
      scripts: { test: 'mocha' },
      main: 'index.js',
      keywords: [],
      license: 'ISC',
      dependencies: {
        tap: '*',
      },
      devDependencies: {
        mocha: '^1.0.0',
      },
      optionalDependencies: {
        abbrev: '*',
      },
    }
    t.same(data, EXPECT, 'used the correct dependency information')
    t.end()
  })
})
