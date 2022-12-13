const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('silent: true', async (t) => {
  const { output } = await setup(t, __filename, {
    config: { yes: 'yes', silent: true },
  })

  t.equal(output, '', 'did not print anything')
})
