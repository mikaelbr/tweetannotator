/*
 * Routes for the JSON API.
 */
var TwitterLib = require('../lib/twitter')
  , datastore = require('../lib/datastore')
  , twitter = new TwitterLib(datastore);

exports.index = function(req, res){
  // List all
  res.json(datastore.all());
};

exports.new = function(req, res){
  res.json(twitter.get());
};

exports.show = function(req, res){
  // Show tweet by id req.params.tweet
  res.json(datastore.get(req.param.tweet));
};

exports.update = function(req, res){
  // Update tweet with id req.params.tweet. 
  res.json(twitter.push(req.body));
};