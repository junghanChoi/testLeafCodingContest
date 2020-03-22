function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const fs = require("fs");

function takeScreenshot(path, image) {

  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.info("File path doesn't exists ... Let's create!")
      fs.mkdir(path, {recursive: true}, err => {})
    }
    // file exists
    browser.saveScreenshot(path + image)
  })
}

module.exports = {
    getRandomInt,
    takeScreenshot
}
// const fs = require("fs");

// function takeScreenshot(path, image) {

//   fs.access(path, fs.F_OK, (err) => {
//     if (err) {
//       console.info("File path doesn't exists ... Let's create!")
//       fs.mkdir(path, {recursive: true}, err => {})
//     }
//     // file exists
//     browser.saveScreenshot(path + image)
//   })
// }

// function getBrowserTitle() {
//   return browser.getTitle()
// }

// function getPageHeader() {
//   return $(".page-heading").getText()
// }

// module.exports = {
//   takeScreenshot,
//   getBrowserTitle,
//   getPageHeader
// }