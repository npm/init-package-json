const { resolve } = require('path')
const { promisify } = require('util')

const t = require('tap')

// npm config
const Config = require('@npmcli/config')
const types = {
  'init-module': Config.typeDefs.path.type,
  'init-author-name': String,
  'init-author-email': String,
  'init-author-url': ['', Config.typeDefs.url.type],
  'init-license': String,
  'init-version': Config.typeDefs.semver.type,
  'init.module': Config.typeDefs.path.type,
  'init.author.name': String,
  'init.author.email': String,
  'init.author.url': ['', Config.typeDefs.url.type],
  'init.license': String,
  'init.version': Config.typeDefs.semver.type,
}
const defaults = {
  'init-module': '~/.npm-init.js',
  'init-author-name': '',
  'init-author-email': '',
  'init-author-url': '',
  'init-version': '1.0.0',
  'init-license': 'ISC',
  'init.module': '~/.npm-init.js',
  'init.author.name': '',
  'init.author.email': '',
  'init.author.url': '',
  'init.version': '1.0.0',
  'init.license': 'ISC',
}
const shorthands = {}

const init = promisify(require('../'))

const EXPECTED = {
  name: 'test',
  version: '3.1.4',
  description: '',
  directories: {
    lib: 'lib'
  },
  main: 'basic.js',
  scripts: {
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: 'npmbot <n@p.m> (http://npm.im/)',
  license: 'WTFPL'
}

t.test('npm configuration values pulled from environment', async t => {
  /*eslint camelcase:0 */
  const env = {
    npm_config_yes: 'yes',
    npm_config_init_author_name: 'npmbot',
    npm_config_init_author_email: 'n@p.m',
    npm_config_init_author_url: 'http://npm.im',
    npm_config_init_license: EXPECTED.license,
    npm_config_init_version: EXPECTED.version
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
    types,
    shorthands,
    defaults,
  })

  await conf.load()
  console.error(conf.data)

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
init.version=${EXPECTED.version}`
  })

  const conf = new Config({
    env: {},
    argv: [],
    cwd,
    npmPath: resolve(cwd, 'npm'),
    types,
    shorthands,
    defaults,
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
init-version=${EXPECTED.version}`
  })

  const conf = new Config({
    env: {},
    argv: [],
    cwd,
    npmPath: resolve(cwd, 'npm'),
    types,
    shorthands,
    defaults,
  })

  await conf.load()

  const _cwd = process.cwd()
  t.teardown(() => process.chdir(_cwd))
  process.chdir(cwd)

  const data = await init(cwd, cwd, conf)
  t.same(data, EXPECTED, 'got the package data from the config')
})
