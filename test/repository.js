const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('license', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: [
      'the-name', // package name
      '', // version
      '', // description
      '', // entry point
      '', // test
      'npm/cli', // git repo
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
    author: '',
    repository: {
      type: 'git',
      url: 'git+https://github.com/npm/cli.git',
    },
    main: 'index.js',
  }
  t.has(data, wanted)
})

t.test('repository from git config', async (t) => {
  const testdir = {
    '.git': {
      config: `
[remote "origin"]
  url = https://github.com/npm/cli.git`,
    } }

  const { data } = await setup(t, __filename, {
    config: { yes: 'yes' },
    testdir,
  })

  const wanted = {
    type: 'git',
    url: 'git+https://github.com/npm/cli.git',
  }
  t.has(data.repository, wanted)
})
