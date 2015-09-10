var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

archive.readListOfUrls(function(urls){
  _.each(urls, function(url){
    if(url !== '' && url[0] === 'w') {
      archive.isUrlArchived(url, function(found){
        if(!found){
          archive.downloadUrls([url]);
        }
      });
    }
  });
});