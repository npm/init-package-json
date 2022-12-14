const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('single space', async t => {
  const { data } = await setup(t, __filename, {
    inputs: [
      [/name: \(.*\) $/, 'the name'], // invalid package name
      [/name: \(.*\) $/, 'the-name'], // package name
      '', // version
      '', // description
      '', // entry point
      '', // test
      '', // git repo
      '', // keywords
      '', // author
      '', // license
      'yes', // about to write
    ],
  })

  const wanted = {
    name: 'the-name',
    version: '1.0.0',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    license: 'ISC',
    author: '',
    main: 'index.js',
  }
  t.has(data, wanted)
})

t.test('multiple spaces', async t => {
  const { data } = await setup(t, __filename, {
    inputs: [
      [/name: \(.*\) $/, 'the name should be this'], // invalid package name
      [/name: \(.*\) $/, 'the-name-should-be-this'], // package name
      '', // version
      '', // description
      '', // entry point
      '', // test
      '', // git repo
      '', // keywords
      '', // author
      '', // license
      'yes', // about to write
    ],
  })

  const wanted = {
    name: 'the-name-should-be-this',
    version: '1.0.0',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    license: 'ISC',
    author: '',
    main: 'index.js',
  }
  t.has(data, wanted)
})
