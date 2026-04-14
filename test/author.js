const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child()
}

t.test('author from config used as default', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: {
      name: 'the-name',
      author: [
        [/author: \(npmbot <npmbot@npmjs\.com> \(https:\/\/npmjs\.com\)\) $/, ''],
      ],
    },
    config: {
      'init-author-name': 'npmbot',
      'init-author-email': 'npmbot@npmjs.com',
      'init-author-url': 'https://npmjs.com',
    },
  })

  t.equal(data.author, 'npmbot <npmbot@npmjs.com> (https://npmjs.com)', 'uses config author as default')
})

t.test('author from config in yes mode', async (t) => {
  const { data } = await setup(t, __filename, {
    config: {
      yes: 'yes',
      'init-author-name': 'npmbot',
      'init-author-email': 'npmbot@npmjs.com',
      'init-author-url': 'https://npmjs.com',
    },
  })

  t.equal(data.author, 'npmbot <npmbot@npmjs.com> (https://npmjs.com)', 'uses config author in yes mode')
})

t.test('author omitted when left blank', async (t) => {
  const { data } = await setup(t, __filename, {
    inputs: {
      name: 'the-name',
      author: [
        [/author: $/, ''],
      ],
    },
  })

  t.equal(data.author, undefined, 'author is omitted when left blank')
})

t.test('author preserved from existing package.json', async (t) => {
  const { data } = await setup(t, __filename, {
    testdir: {
      'package.json': JSON.stringify({
        name: 'existing-package',
        version: '1.0.0',
        author: 'Existing Author <exist@npmjs.com>',
      }),
    },
    config: { yes: 'yes' },
  })

  t.equal(data.author, 'Existing Author <exist@npmjs.com>', 'preserves existing author')
})

t.test('author name only from config', async (t) => {
  const { data } = await setup(t, __filename, {
    config: {
      yes: 'yes',
      'init-author-name': 'npmbot',
    },
  })

  t.equal(data.author, 'npmbot', 'uses author name only when no email/url configured')
})
