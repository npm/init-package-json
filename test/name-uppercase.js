const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('uppercase', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: {
      name: [
        [/name: \(.*\) $/, 'THE-NAME'],
        [/name: \(.*\) $/, 'the-name'],
      ],
    },
  })

  const EXPECT = {
    name: 'the-name',
    version: '1.0.0',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    license: 'ISC',
    author: '',
    main: 'index.js',
  }
  t.has(data, EXPECT)
})
