const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('--yes defaults', async (t) => {
  const EXPECT = {
    name: 'tap-testdir-yes-defaults---yes-defaults',
    version: '1.0.0',
    description: '',
    author: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    main: 'index.js',
    keywords: [],
    license: 'ISC',
  }

  const { data } = await setup(t, __filename, {
    config: { yes: 'yes' },
  })

  t.has(data, EXPECT, 'used the default data')
})
