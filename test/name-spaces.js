const { resolve } = require('path')
const t = require('tap')
const init = require('../')
const common = require('./lib/common')

t.test('single space', t => {
  const dir = t.testdir({})

  init(dir, '', {}, (er, data) => {
    if (er)
      throw er
    const wanted = {
      name: 'the-name',
      version: '1.0.0',
      description: '',
      scripts: { test: 'echo "Error: no test specified" && exit 1' },
      license: 'ISC',
      author: '',
      main: 'index.js'
    }
    console.log('')
    t.has(data, wanted)
    t.end()
  })

  common.drive([
    'the name\n',
    'the-name\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'yes\n'
  ])
})

t.test('multiple spaces', t => {
  const dir = t.testdir({})

  init(dir, '', {}, (er, data) => {
    if (er)
      throw er
    const wanted = {
      name: 'the-name-should-be-this',
      version: '1.0.0',
      description: '',
      scripts: { test: 'echo "Error: no test specified" && exit 1' },
      license: 'ISC',
      author: '',
      main: 'index.js'
    }
    console.log('')
    t.has(data, wanted)
    t.end()
  })

  common.drive([
    'the name should be this\n',
    'the-name-should-be-this\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'yes\n'
  ])
})
