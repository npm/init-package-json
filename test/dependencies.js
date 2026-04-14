const t = require('tap')
const { setup, child, isChild } = require('./fixtures/setup')

if (isChild()) {
  return child({ chdir: true })
}

t.test('existing dependencies', async (t) => {
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
  }

  const { data } = await setup(t, __filename, {
    testdir: testdirContents,
    config: { yes: 'yes', 'save-prefix': '^' },
  })

  t.same(data, {
    name: 'tap-testdir-dependencies-existing-dependencies',
    version: '1.0.0',
    type: 'commonjs',
    description: '',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    main: 'index.js',
    keywords: [],
    dependencies: {
      tap: '*',
    },
    optionalDependencies: {
      abbrev: '*',
    },
  }, 'used the correct dependency information')
})

t.test('delete empty dependencies', async (t) => {
  const testdirContents = {
    'package.json': JSON.stringify({
      dependencies: {},
    }),
  }

  const { data } = await setup(t, __filename, {
    testdir: testdirContents,
    config: { yes: 'yes', 'save-prefix': '^' },
  })

  t.same(data.dependencies, undefined, 'empty dependencies is removed')
})
