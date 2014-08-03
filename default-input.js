var fs = require('fs')
var path = require('path')
var glob = require('glob')
var pi = require('./process-input.js')

// more popular packages should go here, maybe?
function isTestPkg (p) {
  return !!p.match(/^(expresso|mocha|tap|coffee-script|coco|streamline)$/)
}

function niceName (n) {
  return n.replace(/^node-|[.-]js$/g, '')
}

function readDeps (test) { return function (cb) {
  fs.readdir('node_modules', function (er, dir) {
    if (er) return cb()
    var deps = {}
    var n = dir.length
    if (n === 0) return cb(null, deps)
    dir.forEach(function (d) {
      if (d.match(/^\./)) return next()
      if (test !== isTestPkg(d))
        return next()

      var dp = path.join(dirname, 'node_modules', d, 'package.json')
      fs.readFile(dp, 'utf8', function (er, p) {
        if (er) return next()
        try { p = JSON.parse(p) }
        catch (e) { return next() }
        if (!p.version) return next()
        deps[d] = config.get('save-prefix') + p.version
        return next()
      })
    })
    function next () {
      if (--n === 0) return cb(null, deps)
    }
  })
}}


exports.name = prompt('name', package.name || basename)
exports.version = prompt('version', package.version || config.get('init.version') || '1.0.0')
if (!package.description) {
  exports.description = prompt('description')
}

if (!package.main) {
  exports.main = function (cb) {
    fs.readdir(dirname, function (er, f) {
      if (er) f = []
      f = pi.processMain(f)
      return cb(null, prompt('entry point', f || 'index.js'))
    })
  }
}

if (!package.bin) {
  exports.bin = function (cb) {
    fs.readdir(path.resolve(dirname, 'bin'), function (er, d) {
      // no bins
      if (er) return cb()
      // just take the first js file we find there, or nada
      return cb(null, d.filter(function (f) {
        return f.match(/\.js$/)
      })[0])
    })
  }
}

exports.directories = function (cb) {
  fs.readdir(dirname, function (er, dirs) {
    if (er) return cb(er)
    var res = {}
    dirs.forEach(function (d) {
      switch (d) {
        case 'example': case 'examples': return res.example = d
        case 'test': case 'tests': return res.test = d
        case 'doc': case 'docs': return res.doc = d
        case 'man': return res.man = d
      }
    })
    if (Object.keys(res).length === 0) res = undefined
    return cb(null, res)
  })
}

if (!package.dependencies) {
  exports.dependencies = readDeps(false)
}

if (!package.devDependencies) {
  exports.devDependencies = readDeps(true)
}

// MUST have a test script!
var s = package.scripts || {}
var notest = 'echo "Error: no test specified" && exit 1'
if (!package.scripts) {
  exports.scripts = function (cb) {
    fs.readdir(path.join(dirname, 'node_modules'), function (er, d) {
      setupScripts(d || [], cb)
    })
  }
}
function setupScripts (d, cb) {
  // check to see what framework is in use, if any
  function tx (test) {
    return test || notest
  }

  if (!s.test || s.test === notest) {
    if (d.indexOf('tap') !== -1)
      s.test = prompt('test command', 'tap test/*.js', tx)
    else if (d.indexOf('expresso') !== -1)
      s.test = prompt('test command', 'expresso test', tx)
    else if (d.indexOf('mocha') !== -1)
      s.test = prompt('test command', 'mocha', tx)
    else
      s.test = prompt('test command', tx)
  }

  return cb(null, s)
}

if (!package.repository) {
  exports.repository = function (cb) {
    fs.readFile('.git/config', 'utf8', function (er, gconf) {
      if (er || !gconf) return cb(null, prompt('git repository'))

      var u = pi.processRepository(gconf)

      return cb(null, prompt('git repository', u))
    })
  }
}

if (!package.keywords) {
  exports.keywords = prompt('keywords', pi.processKeywords)
}

if (!package.author) {
  exports.author = config.get('init.author.name')
  ? {
      "name" : config.get('init.author.name'),
      "email" : config.get('init.author.email'),
      "url" : config.get('init.author.url')
    }
  : prompt('author')
}

exports.license = prompt('license', package.license ||
                         config.get('init.license') ||
                         'ISC')
