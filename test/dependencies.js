const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child({ chdir: true })
}

t.test('read in dependencies and dev deps', async (t) => {
  const testdirContents = {
    'package.json': JSON.stringify({
      dependencies: {
        abbrev: '*',
        tap: '*',
      },
      optionalDependencies: {
        abbrev: '*',
      },
    }),
    node_modules: {},
  }

  for (const fakedep of ['mocha', 'tap', 'async', 'foobar']) {
    testdirContents.node_modules[fakedep] = {
      'package.json': JSON.stringify({
        name: fakedep,
        version: '1.0.0',
      }),
    }
  }

  const { data } = await setup(t, __filename, {
    testdir: testdirContents,
    config: { yes: 'yes', 'save-prefix': '^' },
  })

  t.same(data, {
    name: 'tap-testdir-dependencies-read-in-dependencies-and-dev-deps',
    version: '1.0.0',
    description: '',
    author: '',
    scripts: { test: 'mocha' },
    main: 'index.js',
    keywords: [],
    license: 'ISC',
    dependencies: {
      tap: '*',
    },
    devDependencies: {
      mocha: '^1.0.0',
    },
    optionalDependencies: {
      abbrev: '*',
    },
  }, 'used the correct dependency information')
})
