var fs = require('fs'),
    mongo = require('./mongostore');

var DataStore = function () {
};

DataStore.prototype.all = function(cb) {
  return mongo.all(cb);
};

DataStore.prototype.push = function(tweet) {
  mongo.save(tweet);
  return tweet;
};

DataStore.prototype.get = function(id, cb) {
  mongo.get(id, cb);
  return this;
};


module.exports = new DataStore();