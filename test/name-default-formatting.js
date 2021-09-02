const { resolve } = require('path')
const t = require('tap')
const init = require('../')

const log = console.log
console.log = function () {}

t.test('replaces spaces for hyphens', t => {
  const dir = t.testdir({
    'name with spaces': {},
  })

  init(resolve(dir, 'name with spaces'), '', { yes: 'yes' }, (er, data) => {
    if (er) {
      throw er
    }

    t.equal(data.name, 'name-with-spaces')
    t.end()
  })
})

t.test('removes node- and .js', t => {
  const dir = t.testdir({
    'node-package.js': {},
  })

  init(resolve(dir, 'node-package.js'), '', { yes: 'yes' }, (er, data) => {
    if (er) {
      throw er
    }

    t.equal(data.name, 'package')
    t.end()
  })
})

t.test('capital letters and multiple spaces', t => {
  const dir = t.testdir({
    'capital letters and  multiple   spaces': {},
  })

  init(resolve(dir, 'capital letters and  multiple   spaces'), '', { yes: 'yes' }, (er, data) => {
    if (er) {
      throw er
    }

    t.equal(data.name, 'capital-letters-and-multiple-spaces')
    t.end()
  })
})

t.test('teardown', function (t) {
  console.log = log
  t.end()
})
