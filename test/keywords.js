var tap = require("tap")
var ih = require("../process-input.js")


tap.test("keywords with comma", function (t) {
  var keywords = ih.processKeywords("rabbit, duck , goose")
  t.same(["rabbit", "duck", "goose"], keywords)
  t.end()
})

tap.test("keywords with space", function (t) {
  var keywords = ih.processKeywords("rabbit duck goose")
  t.same(["rabbit", "duck", "goose"], keywords)
  t.end()
})
