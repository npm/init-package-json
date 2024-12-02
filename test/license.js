const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('license', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: {
      name: 'the-name',
      licence: [
        [/license: \(.*\) $/, 'Apache'], // invalid license
        [/license: \(.*\) $/, 'Apache-2.0'], // license
      ],
    },
  })

  const wanted = {
    name: 'the-name',
    version: '1.0.0',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    license: 'Apache-2.0',
    author: '',
    main: 'index.js',
  }
  t.has(data, wanted)
})
