const { resolve } = require('path')
const t = require('tap')
const init = require('../')

t.test('replaces spaces for hyphens', t => {
  const dir = t.testdir({
    'name with spaces': {}
  })

  init(resolve(dir, 'name with spaces'), '', { yes: 'yes' }, (er, data) => {
    if (er)
      throw er

    t.equal(data.name, 'name-with-spaces')
    t.end()
  })
})

t.test('removes node- and .js', t => {
  const dir = t.testdir({
    'node-package.js': {}
  })

  init(resolve(dir, 'node-package.js'), '', { yes: 'yes' }, (er, data) => {
    if (er)
      throw er

    t.equal(data.name, 'package')
    t.end()
  })
})
