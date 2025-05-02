const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('private field with init-private true', async (t) => {
  const { data } = await setup(t, __filename, {
    config: { yes: 'yes', 'init-private': true },
  })

  t.equal(data.private, true, 'private field set to true in yes mode')
})

t.test('private field with init-private false', async (t) => {
  const { data } = await setup(t, __filename, {
    config: { yes: 'yes', 'init-private': false },
  })

  t.equal(data.private, false, 'private field set to false is undefined')
})

t.test('private field without init-private', async (t) => {
  const { data } = await setup(t, __filename, {
    config: { yes: 'yes' },
  })

  t.equal(data.private, undefined, 'private not set in by default')
})

t.test('respects existing private field in package.json', async (t) => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'package.json': JSON.stringify({
        name: 'existing-package',
        version: '1.0.0',
        private: true,
      }),
    },
    config: { yes: 'yes' },
  })

  t.equal(data.private, true, 'keeps existing private value from package.json')
})

t.test('existing private field takes precedence over config', async (t) => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'package.json': JSON.stringify({
        name: 'existing-package',
        version: '1.0.0',
        private: true,
      }),
    },
    config: { yes: 'yes', 'init-private': false },
  })

  t.equal(data.private, true, 'existing package.json private field takes precedence over config')
})

t.test('adds private from config when existing package has no private field', async t => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'package.json': JSON.stringify({
        name: 'existing-package',
        version: '1.0.0',
      }),
    },
    config: { yes: 'yes', 'init-private': true },
  })

  t.equal(data.private, true, 'adds private field from config when not in existing package')
})
