const { resolve } = require('path')
const { promisify } = require('util')

const t = require('tap')

// npm config
const Config = require('@npmcli/config')
const definitions = {
  'init-module': {
    key: 'init-module',
    description: 'init module config',
    default: '~/.npm-init.js',
    type: Config.typeDefs.path.type,
  },
  'init-author-name': {
    key: 'init-author-name',
    description: 'init author name config',
    default: '',
    type: String,
  },
  'init-author-email': {
    key: 'init-author-email',
    description: 'init author email config',
    default: '',
    type: String,
  },
  'init-author-url': {
    key: 'init-author-url',
    description: 'init author url config',
    default: '',
    type: ['', Config.typeDefs.url.type],
  },
  'init-license': {
    key: 'init-license',
    description: 'init license config',
    default: 'ISC',
    type: String,
  },
  'init-version': {
    key: 'init-version',
    description: 'init version config',
    default: '1.0.0',
    type: Config.typeDefs.semver.type,
  },
  'init.module': {
    key: 'init-module',
    description: 'deprecated init module config',
    default: '~/.npm-init.js',
    type: Config.typeDefs.path.type,
  },
  'init.author.name': {
    key: 'init.author.name',
    description: 'deprecated init author name config',
    default: '',
    type: String,
  },
  'init.author.email': {
    key: 'init.author.email',
    description: 'deprecated init author email config',
    default: '',
    type: String,
  },
  'init.author.url': {
    key: 'init.author.url',
    description: 'deprecated init author url config',
    default: '',
    type: ['', Config.typeDefs.url.type],
  },
  'init.license': {
    key: 'init.license',
    description: 'deprecated init license config',
    default: 'ISC',
    type: String,
  },
  'init.version': {
    key: 'init.version',
    description: 'deprecated init version config',
    default: '1.0.0',
    type: Config.typeDefs.semver.type,
  },
}
const shorthands = {}

const init = promisify(require('../'))

const EXPECTED = {
  name: 'test',
  version: '3.1.4',
  description: '',
  directories: {
    lib: 'lib',
  },
  main: 'basic.js',
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: [],
  author: 'npmbot <n@p.m> (http://npm.im/)',
  license: 'WTFPL',
}

const log = console.log
console.log = function () {}

t.test('npm configuration values pulled from environment', async t => {
  /* eslint camelcase:0 */
  const env = {
    npm_config_yes: 'yes',
    npm_config_init_author_name: 'npmbot',
    npm_config_init_author_email: 'n@p.m',
    npm_config_init_author_url: 'http://npm.im',
    npm_config_init_license: EXPECTED.license,
    npm_config_init_version: EXPECTED.version,
  }

  const cwd = t.testdir({
    npm: {},
    'package.json': JSON.stringify({
      name: EXPECTED.name,
      main: EXPECTED.main,
      directories: EXPECTED.directories,
    }),
  })

  const conf = new Config({
    env,
    argv: [],
    cwd,
    npmPath: resolve(cwd, 'npm'),
    definitions,
    shorthands,
  })

  await conf.load()

  const _cwd = process.cwd()
  t.teardown(() => process.chdir(_cwd))
  process.chdir(cwd)

  const data = await init(cwd, cwd, conf)
  t.same(data, EXPECTED, 'got the package data from the environment')
})

t.test('npm configuration values pulled from dotted config', async t => {
  const cwd = t.testdir({
    npm: {},
    'package.json': JSON.stringify({
      name: EXPECTED.name,
      main: EXPECTED.main,
      directories: EXPECTED.directories,
    }),
    '.npmrc': `
yes=true,

init.author.name=npmbot
init.author.email=n@p.m
init.author.url=http://npm.im

init.license=${EXPECTED.license}
init.version=${EXPECTED.version}`,
  })

  const conf = new Config({
    env: {},
    argv: [],
    cwd,
    npmPath: resolve(cwd, 'npm'),
    definitions,
    shorthands,
  })

  await conf.load()

  const _cwd = process.cwd()
  t.teardown(() => process.chdir(_cwd))
  process.chdir(cwd)

  const data = await init(cwd, cwd, conf)
  t.same(data, EXPECTED, 'got the package data from the config')
})

t.test('npm configuration values pulled from dashed config', async t => {
  const cwd = t.testdir({
    npm: {},
    'package.json': JSON.stringify({
      name: EXPECTED.name,
      main: EXPECTED.main,
      directories: EXPECTED.directories,
    }),
    '.npmrc': `
yes=true,

init-author-name=npmbot
init-author-email=n@p.m
init-author-url=http://npm.im

init-license=${EXPECTED.license}
init-version=${EXPECTED.version}`,
  })

  const conf = new Config({
    env: {},
    argv: [],
    cwd,
    npmPath: resolve(cwd, 'npm'),
    definitions,
    shorthands,
  })

  await conf.load()

  const _cwd = process.cwd()
  t.teardown(() => process.chdir(_cwd))
  process.chdir(cwd)

  const data = await init(cwd, cwd, conf)
  t.same(data, EXPECTED, 'got the package data from the config')
})

t.test('teardown', function (t) {
  console.log = log
  t.end()
})
