var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'POST'){
  
    //helpers.serveAssets(req, res, handleNewPage);
    handleNewPage(req,res)
  }
  if ( req.url === '/' ) {
    req.url = '/index.html';
  }
  helpers.serveAssets(res, req.url, getHomePage);
};



var handleNewPage = function(req, res){
  var body = '';
  req.on('data', function (chunk) {
      body += chunk;
  });
  req.on('end', function() {
    
    url = body.slice(4)
    archive.addUrlToList(url);
    body = '';
      //helpers.serveAssets(res, '/loading.html');
    //res.end();
    });
};

var getHomePage = function(res){
  res.end();
}
