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
        [/license: $/, 'Apache'], // invalid license
        [/license: $/, 'Apache-2.0'], // license
      ],
    },
  })

  const wanted = {
    name: 'the-name',
    version: '1.0.0',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    license: 'Apache-2.0',
    main: 'index.js',
  }
  t.has(data, wanted)
})

t.test('license omitted when left blank', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: {
      name: 'the-name',
      licence: [
        [/license: $/, ''], // leave blank
      ],
    },
  })

  t.equal(data.license, undefined, 'license is omitted when left blank')
})

t.test('license from config', async (t) => {
  const { data } = await setup(t, __filename, {
    config: { yes: 'yes', 'init-license': 'MIT' },
  })

  t.equal(data.license, 'MIT', 'uses configured license')
})

t.test('license preserved from existing package.json', async (t) => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'package.json': JSON.stringify({
        name: 'existing-package',
        version: '1.0.0',
        license: 'BSD-3-Clause',
      }),
    },
    config: { yes: 'yes' },
  })

  t.equal(data.license, 'BSD-3-Clause', 'preserves existing license')
})
