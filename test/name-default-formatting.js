const { resolve } = require('path')
const t = require('tap')
const init = require('../')

t.test('replaces spaces for hyphens', t => {
  const testdir = t.testdir({
    'name with spaces': {},
  })
  // process.chdir(testdir)

  init(resolve(testdir, 'name with spaces'), '', { yes: 'yes' }, (er, data) => {
    if (er) {
      throw er
    }
    t.equal(data.name, 'name-with-spaces')
    t.end()
  })
})

t.test('removes node- and .js', t => {
  const testdir = t.testdir({
    'node-package.js': {},
  })
  // process.chdir(testdir)

  init(resolve(testdir, 'node-package.js'), '', { yes: 'yes' }, (er, data) => {
    if (er) {
      throw er
    }

    t.equal(data.name, 'package')
    t.end()
  })
})

t.test('capital letters and multiple spaces', t => {
  const testdir = t.testdir({
    'capital letters and  multiple   spaces': {},
  })
  // process.chdir(testdir)

  init(
    resolve(testdir, 'capital letters and  multiple   spaces'),
    '',
    { yes: 'yes' },
    (er, data) => {
      if (er) {
        throw er
      }

      t.equal(data.name, 'capital-letters-and-multiple-spaces')
      t.end()
    }
  )
})
