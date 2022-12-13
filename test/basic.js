const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('the basics', async (t) => {
  const { data } = await setup(t, __filename, {
    inputFile: 'basic',
    config: { foo: 'bar' },
    inputs: [
      [/name: \(.*\) $/, 'the-name'],
      [/description: $/, 'description'],
      [/OK\? \(.*\) $/, 'yes'],
    ],
  })
  t.same(data, {
    name: 'the-name',
    version: '1.2.5',
    description: 'description',
    author: 'npmbot <n@p.m> (http://npm.im)',
    scripts: { test: 'make test' },
    main: 'main.js',
    config: { foo: 'bar' },
    package: {},
  })
})

t.test('no config', async (t) => {
  const { data } = await setup(t, __filename, {
    inputFile: 'basic',
    inputs: [
      [/name: \(.*\) $/, 'the-name'],
      [/description: $/, 'description'],
      [/OK\? \(.*\) $/, 'yes'],
    ],
  })
  t.same(data, {
    name: 'the-name',
    version: '1.2.5',
    description: 'description',
    author: 'npmbot <n@p.m> (http://npm.im)',
    scripts: { test: 'make test' },
    main: 'main.js',
    config: {},
    package: {},
  })
})
