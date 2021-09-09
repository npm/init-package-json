const test = require('tap').test
const init = require('../')

test('license', function (t) {
  const testdir = t.testdir({})
  // process.chdir(testdir)
  init(testdir, '', {}, function (er, data) {
    if (er) {
      throw er
    }

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
    t.end()
  })
  for (const line of [
    'the-name\n', // package name
    '\n', // version
    '\n', // description
    '\n', // entry point
    '\n', // test
    '\n', // git repo
    '\n', // keywords
    '\n', // author
    'Apache\n', // license
    'Apache-2.0\n', // license
    'yes\n', // about to write
  ]) {
    process.stdin.push(line)
  }
})
