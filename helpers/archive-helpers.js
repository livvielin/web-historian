var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, function(err, data){
    if(err){
      throw err;
    }
    var dataArray = data.toString().split('\n');
    if (callback) {
      callback(dataArray);
    }
  });
  
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(function(list) {
    if (callback) {
      callback(list.indexOf(url) !== -1);
    }
  });
  
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url + '\n', function(err){
    if(err){
      throw err;
    }
    if (callback) {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(this.paths.archivedSites, function(err, files) {
    if(!files){
      return
    }
    if(err) {
      throw err;
    }
    if (callback) {
      callback(files.indexOf(url) !== -1);
    }
  });

};

exports.downloadUrls = function(urlArr) {
  var context = this;
  _.each(urlArr, function(url){
    request('http://'+url, function(err, res, body) {
      if(err){
        throw err;
      }
      fs.writeFile(path.join(context.paths.archivedSites, url), body, function(err){
        if(err){
          throw err;
        }
      });
    });
  });
};
