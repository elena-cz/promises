/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var fs = require('fs');
var Promise = require('bluebird');


var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  
  var promises = filePaths.map(pluckFirstLineFromFileAsync);

  return Promise.all(promises)
  .then(function(firstLines) {
    firstLines = firstLines.join('\n');
    return writeFile(firstLines, writePath);
  })

};


var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      
      if (data) {
        var allLines = data.split('\n');
        var firstLine = allLines[0];
        resolve(firstLine);
      }

       reject(err);
    });
  });
};

var writeFile = function(data, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(writeFilePath, JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject(err);
      }
    })
  });
};



// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};