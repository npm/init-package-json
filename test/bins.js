const init = require('../')
const t = require('tap')

t.test('auto bin population', function (t) {
  const testdir = t.testdir({
    bin: {
      'run.js': '',
    },
  })
  // process.chdir(testdir)
  init(testdir, '', {}, (er, data) => {
    if (er) {
      throw er
    }
    t.same(data.bin, { 'auto-bin-test': 'bin/run.js' }, 'bin auto populated with correct path')
    t.end()
  })
  for (const line of [
    'auto-bin-test\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'yes\n',
    'dummy\n',
  ]) {
    process.stdin.push(line)
  }
})
