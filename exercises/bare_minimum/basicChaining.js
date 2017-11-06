/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      return fetchGithubProfile(username); 
    })
    .then(function(data) {
      return writeFile(data, writeFilePath);
    })
    .catch(function(err) {
      console.log('Caught an error: ', err.message);
    });
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




var fetchGithubProfile = function(username) {
  return new Promise(function(resolve, reject) {

    var url = 'https://api.github.com/users/' + username;
    request(url, function (err, response, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
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

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
