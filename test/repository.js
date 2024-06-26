const { exec } = require('node:child_process')
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

const getRemoteURL = () => new Promise((res, rej) => {
  exec('git config --get remote.origin.url', (err, stdout) => {
    if (err) {
      rej(err)
    } else {
      res(stdout.trim())
    }
  })
})

t.test('parse repository from git config', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: [
      'the-name', // package name
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
  const remoteURL = await getRemoteURL()

  const wanted = {
    name: 'the-name',
    version: '1.0.0',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    author: '',
    main: 'index.js',
  }

  if (remoteURL) {
    wanted.repository = {
      type: 'git',
      url: `git+${remoteURL}`,
    }
  }

  t.has(data, wanted)
})
