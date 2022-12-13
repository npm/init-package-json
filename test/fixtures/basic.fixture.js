/* eslint-disable no-undef */
package = {}
exports.name = prompt('name', package.name || basename)
exports.version = '1.2.5'
exports.description = prompt('description', package.description)
exports.author = 'npmbot <n@p.m> (http://npm.im)'
exports.scripts = package.scripts || {}
exports.scripts.test = 'make test'
exports.main = package.main || 'main.js'
exports.config = config && JSON.parse(JSON.stringify(config))
try {
  delete exports.config.config
} catch (e) {
  // ok
}
try {
  delete exports.package.config
} catch (e) {
  // ok
}
try {
  delete exports.package.package
} catch (e) {
  // ok
}
try {
  delete exports.config.package
} catch (e) {
  // ok
}
exports.package = JSON.parse(JSON.stringify(package))
