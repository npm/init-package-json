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

  t.equal(data.private, undefined, 'private field set to false is undefined')
})

t.test('private field without init-private', async (t) => {
  const { data } = await setup(t, __filename, {
    config: { yes: 'yes' },
  })

  t.equal(data.private, undefined, 'private not set in by default')
})
