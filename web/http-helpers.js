var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  //TO-DO: Fix css
  var url = path.join(archive.paths.archivedSites, asset);
  if (asset === '/index.html' || asset === '/loading.html') {
    url = path.join(archive.paths.siteAssets, asset);
  }
  fs.readFile(url, function(err, data){
    if(err){
      throw err;
    }
    res.write(data);
    callback(res);
  });  


};

