module.exports.drive = drive

function drive (input) {
  for (const line of input) {
    process.stdin.push(line)
  }
}
