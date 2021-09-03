const init = require('../')
const t = require('tap')
const path = require('path')
const cwd = process.cwd()

/* For some reason in github actions, after the first time init is called,
 * process.stdin is in `EOF` mode, and will reject any new input.
 *
 * I debugged this for a day and a half and couldn't solve it, which is way
 * more time than is warranted for "moving the tests to github actions".
 *
 * So this is the compromise: do all the stdin pushes up front.  It does mean
 * that you can NOT run these tests in isolation. Each file has to run in
 * total.
 */
for (const line of [
  // the basics
  'the-name\n',
  'description\n',
  'yes\n',
  // no config
  'the-name\n',
  'description\n',
  'yes\n',
]) {
  process.stdin.push(line)
}

t.test('the basics', t => {
  const testdir = t.testdir({})
  // process.chdir(testdir)
  init(testdir, path.join(cwd, 'test/basic.input'), { foo: 'bar' }, function (er, data) {
    if (er) {
      throw er
    }
    const EXPECT = {
      name: 'the-name',
      version: '1.2.5',
      description: 'description',
      author: 'npmbot <n@p.m> (http://npm.im)',
      scripts: { test: 'make test' },
      main: 'main.js',
      config: { foo: 'bar' },
      package: {},
    }
    t.same(data, EXPECT)
    t.end()
  })
})

t.test('no config', function (t) {
  const testdir = t.testdir({})
  // process.chdir(testdir)
  init(testdir, path.join(cwd, 'test/basic.input'), function (er, data) {
    if (er) {
      throw er
    }
    const EXPECT = {
      name: 'the-name',
      version: '1.2.5',
      description: 'description',
      author: 'npmbot <n@p.m> (http://npm.im)',
      scripts: { test: 'make test' },
      main: 'main.js',
      config: {},
      package: {},
    }
    t.same(data, EXPECT)
    t.end()
  })
})
