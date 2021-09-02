var fs = require('fs')
var path = require('path')

var rimraf = require('rimraf')
var tap = require('tap')

var init = require('../')

var EXPECT = {
    name: '@scoped/test',
    version: '1.0.0',
    description: '',
    author: '',
    scripts: { test: 'echo \"Error: no test specified\" && exit 1' },
    main: 'basic.js',
    keywords: [],
    license: 'ISC'
}

const log = console.log
console.log = function () {}

tap.test('--yes with scope', function (t) {
  init(__dirname, __dirname, { yes: 'yes', scope: '@scoped' }, function (er, data) {
    if (er) throw er

    t.has(data, EXPECT)
    t.end()
  })
})

tap.test('teardown', function (t) {
  console.log = log
  rimraf.sync(path.join(__dirname, 'package.json'))
  t.end()
})
