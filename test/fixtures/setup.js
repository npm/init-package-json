const { spawn } = require('child_process')
const path = require('path')
const init = require('../../')

const CHILD = 'child'

const isChild = () => process.argv[2] === CHILD

const setup = async (t, file, {
  config,
  inputFile = '',
  inputs = [],
  testdir = {},
  dir,
} = {}) => {
  let tdir = t.testdir(testdir)
  if (dir) {
    tdir = path.join(tdir, dir)
  }

  const args = [file, CHILD, tdir, inputFile]
  if (config) {
    args.push(JSON.stringify(config))
  }

  let i = 0
  let stderr = ''
  let stdout = ''

  await new Promise((res, rej) => {
    const proc = spawn(process.execPath, args)
    proc.stderr.on('data', c => stderr += c)
    proc.stdout.on('data', (c) => {
      stdout += c

      const next = inputs[i]
      const [prompt, write] = Array.isArray(next) ? next : [null, next]

      if (write == null || typeof prompt?.test === 'function' && !prompt.test(stdout)) {
        return
      }

      i++
      const last = i === inputs.length
      setTimeout(() => proc.stdin[last ? 'end' : 'write'](`${write}\n`), 100)
    })
    proc.on('close', res)
    proc.on('error', rej)
  })

  try {
    return {
      tdir,
      data: stderr ? JSON.parse(stderr) : null,
      output: stdout,
    }
  } catch (er) {
    console.error(stderr)
    throw er
  }
}

const getFixture = (f) => path.join(__dirname, `${path.basename(f, '.js')}.fixture.js`)

async function child ({ chdir } = {}) {
  const [dir, input, config] = process.argv.slice(3)

  if (chdir) {
    process.chdir(dir)
  }

  const output = await init(dir, getFixture(input), config && JSON.parse(config))
  if (output !== undefined) {
    console.error(JSON.stringify(output))
  }
}

module.exports = { setup, child, isChild, getFixture }
