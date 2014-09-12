exports.processKeywords = function (s) {
  console.log(s)
  if (!s) return undefined
  if (Array.isArray(s)) s = s.join(' ')
  if (typeof s !== 'string') return s

  return s.split(/[\s,]+/)
}

exports.processMain = function (f) {
  f = f.filter(function (f) {
    return f.match(/\.js$/)
  })

  if (f.indexOf('index.js') !== -1)
    f = 'index.js'
  else if (f.indexOf('main.js') !== -1)
    f = 'main.js'
  else if (f.indexOf(basename + '.js') !== -1)
    f = basename + '.js'
  else
    f = f[0]

  return f
}

exports.processRepository = function (gconf) {
  gconf = gconf.split(/\r?\n/)
  var i = gconf.indexOf('[remote "origin"]')
  if (i !== -1) {
    var u = gconf[i + 1]
    if (!u.match(/^\s*url =/)) u = gconf[i + 2]
    if (!u.match(/^\s*url =/)) u = null
    else u = u.replace(/^\s*url = /, '')
  }
  if (u && u.match(/^git@github.com:/))
    u = u.replace(/^git@github.com:/, 'https://github.com/')

  return u
}
