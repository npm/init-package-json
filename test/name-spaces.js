const t = require('tap')
const init = require('../')

// see comment in test/basic.js
for (const line of [
  // single space
  'the name\n', // package name
  'the-name\n', // package name
  '\n', // version
  '\n', // description
  '\n', // entry point
  '\n', // test
  '\n', // git repo
  '\n', // keywords
  '\n', // author
  '\n', // license
  'yes\n', // about to write
  // multiple spaces
  'the name should be this\n', // package name
  'the-name-should-be-this\n', // package name
  '\n', // version
  '\n', // description
  '\n', // entry point
  '\n', // test
  '\n', // git repo
  '\n', // keywords
  '\n', // author
  '\n', // license
  'yes\n', // about to write
]) {
  process.stdin.push(line)
}

t.test('single space', t => {
  const testdir = t.testdir({})
  // process.chdir(testdir)

  init(testdir, '', {}, (er, data) => {
    if (er) {
      throw er
    }
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
    t.end()
  })
})

t.test('multiple spaces', t => {
  const testdir = t.testdir({})
  // process.chdir(testdir)

  init(testdir, '', {}, (er, data) => {
    if (er) {
      throw er
    }
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
    t.end()
  })
})
