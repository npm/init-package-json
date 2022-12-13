const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('the scope', async (t) => {
  const EXPECT = {
    name: '@foo/test',
    version: '1.2.5',
    description: 'description',
    author: 'npmbot <n@p.m> (http://npm.im)',
    scripts: { test: 'make test' },
    main: 'main.js',
    config: { scope: '@foo' },
    package: {},
  }

  const { data } = await setup(t, __filename, {
    inputFile: 'basic',
    config: { scope: '@foo' },
    inputs: [
      '@foo/test',
      'description',
      'yes',
    ],
  })

  t.has(data, EXPECT)
})
