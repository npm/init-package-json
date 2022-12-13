const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('--yes with scope', async (t) => {
  const EXPECT = {
    name: '@scoped/tap-testdir-scope-in-config---yes-with-scope',
    version: '1.0.0',
    description: '',
    author: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    main: 'index.js',
    keywords: [],
    license: 'ISC',
  }

  const { data } = await setup(t, __filename, {
    config: { yes: 'yes', scope: '@scoped' },
  })

  t.has(data, EXPECT)
})
