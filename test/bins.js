const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('auto bin population', async (t) => {
  const { data } = await setup(t, __filename, {
    testdir: {
      bin: { 'run.js': '' },
    },
    inputs: [
      'auto-bin-test',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'yes',
    ],
  })
  t.same(data.bin, { 'auto-bin-test': 'bin/run.js' },
    'bin auto populated with correct path')
})
