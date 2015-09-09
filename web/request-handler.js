var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var body = ""
  //req.on('data', handlePostChunk(chunk, body));
  if(req.method === 'POST'){
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function() {
      fs.appendFile(archive.paths.list, '/n' + body, function(err){
        if(err){
          throw err;
        }
        console.log('writing'+ body)
        res.end();  
      });
    });
  }
  if ( req.url === '/' ) {
    req.url = '/index.html';
  }
  helpers.serveAssets(res, req.url);
};

var handlePostChunk = function(chunk, body){
  body += chunk;
};

var handlePostFinish = function(body){
  fs.appendFile(archive.paths.list, '/n' + body, function(err){
    if(err){
      throw err;
    }
    console.log('writing'+ body)
    res.end();  
  });
  
};