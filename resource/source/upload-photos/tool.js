const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const rootPath = 'images'
const output = path.resolve(__dirname, '../../themes/next/source/photos/photoslist.json')
var dimensions
fs.readdir(rootPath, function (err, files) {
  if (err) {
    return
  }
  let arr = []
  ;(function iterator(index) {
    if (index == files.length) {
      fs.writeFile(output, JSON.stringify(arr, null, '\t'))
      return
    }
    fs.stat(rootPath + '/' + files[index], function (err, stats) {
      if (err) {
        return
      }
      if (stats.isFile()) {
        dimensions = sizeOf(rootPath + '/' + files[index])
        console.log(dimensions.width, dimensions.height)
        arr.push(dimensions.width + '.' + dimensions.height + ' ' + files[index])
      }
      iterator(index + 1)
    })
  }(0))
})
