var mongojs = require('mongojs'),
    config = require('config').MongoJS;

var MongoStore = function () {
  // Connect
  this.db = mongojs(config.connect_url, ['tweets']);
  this.col = this.db.tweets;
};

MongoStore.prototype.all = function(cb) {
  this.col.find(cb);
  return this;
};

MongoStore.prototype.save = function(tweet) {
  // Update Tweet
  this.col.update({ id: tweet.id}, tweet, { upsert: true });
  return this;
};

MongoStore.prototype.get = function(id, cb) {
  // get tweet by id = id
  this.col.find({id: id}, cb);
  return this;
};

module.exports = new MongoStore();