var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log("Type of request: " + req.method + " Request URL: " + req.url)
  if(req.method === 'GET'){
    returnPage(req, res);
  }

  if(req.method === 'POST'){
    handleNewPage(req,res)
  }
  
};


var returnPage = function(req, res){
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


var handleNewPage = function(req, res){
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  
  req.on('end', function() {
    
    inputUrl = body.slice(4)
    res.writeHead(302);
    
    archive.isUrlArchived(inputUrl, function(found) {
      if(found) {
        // serve up archived html for that inputUrl page
        helpers.serveAssets(res, '/'+inputUrl, getHomePage);
      } else {
        // check if in list
        archive.isUrlInList(inputUrl, function(exists) {
          if(!exists) {
            // if not in list, add to list
            archive.addUrlToList(inputUrl);
          } 
          //load loading page
          helpers.serveAssets(res, '/loading.html', getHomePage);
        });
      }
    });
    body = '';
  });
};

var getHomePage = function(res){
  res.end();
}
