const test = require('tap').test
const init = require('../')

test('uppercase', function (t) {
  const testdir = t.testdir({})
  init(testdir, '', {}, function (er, data) {
    if (er) {
      throw er
    }

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
    t.end()
  })
  for (const line of [
    'THE-NAME\n',
    'the-name\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'yes\n',
  ]) {
    process.stdin.push(line)
  }
})
