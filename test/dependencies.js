var tap = require('tap')
var init = require('../')

var EXPECT = {
  name: 'tap-testdir-dependencies',
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
const testdir = tap.testdir(testdirContents)
const origwd = process.cwd()
process.chdir(testdir)

const log = console.log
console.log = function () {}

tap.test('read in dependencies and dev deps', function (t) {
  init(testdir, testdir, {yes: 'yes', 'save-prefix': '^'}, function (er, data) {
    if (er) {
      throw er
    }

    t.same(data, EXPECT, 'used the correct dependency information')
    t.end()
  })
})

tap.test('teardown', function (t) {
  process.chdir(origwd)
  console.log = log
  t.end()
})
