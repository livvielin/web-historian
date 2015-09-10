var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // debugger;
  console.log("Type of request: " + req.method + " Request URL: " + req.url)
  if(req.method === 'GET'){
    //if we are looking at the homepage
    if ( req.url === '/' || req.url === '/index.html') {
      req.url = '/index.html';
      helpers.serveAssets(res, req.url, getHomePage); 
    } 
    //search through archive for the url, otherwise return 404 
    else {    
      archive.isUrlArchived(req.url.slice(1), function(found){
        if(found){
          helpers.serveAssets(res, req.url, getHomePage); 
        }
        else{
          res.writeHead(404);
          res.end();
        } 
      }); 
    }
    
  }

  if(req.method === 'POST'){
  
    //helpers.serveAssets(req, res, handleNewPage);
    handleNewPage(req,res)
  }
  
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
    res.writeHead(302);
    res.end();
    });
};

var getHomePage = function(res){
  res.end();
}
