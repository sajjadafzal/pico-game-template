const fs = require('fs')
const zipper = require('zip-local')

const fileName = './build/game.zip'

zipper.sync
  .zip('./dist/')
  .compress()
  .save(fileName)

const stats = fs.statSync(fileName)
const diff = 13312 - stats.size

console.log(`\n\nPackage Size: ${stats.size} bytes\n`)
if (diff >= 0) {
  console.log(`Available Size: ${diff} bytes`)
} else {
  console.log(
    `!!! Your package size is ${diff} bytes over the target size. !!!`
  )
}
