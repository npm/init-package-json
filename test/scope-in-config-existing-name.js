const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('with existing package.json', async (t) => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'package.json': JSON.stringify({
        name: '@already/scoped',
        version: '1.0.0',
      }),
    },
    config: { yes: 'yes', scope: '@still' },
  })

  t.equal(data.name, '@still/scoped', 'new scope is added, basic name is kept')
})
