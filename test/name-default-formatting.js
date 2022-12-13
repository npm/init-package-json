const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('replaces spaces for hyphens', async t => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'name with spaces': {},
    },
    dir: 'name with spaces',
    config: { yes: 'yes' },
  })

  t.equal(data.name, 'name-with-spaces')
})

t.test('removes node- and .js', async t => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'node-package.js': {},
    },
    dir: 'node-package.js',
    config: { yes: 'yes' },
  })

  t.equal(data.name, 'package')
})

t.test('capital letters and multiple spaces', async t => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'capital letters and  multiple   spaces': {},
    },
    dir: 'capital letters and  multiple   spaces',
    config: { yes: 'yes' },
  })

  t.equal(data.name, 'capital-letters-and-multiple-spaces')
})
