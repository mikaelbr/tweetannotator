var mongojs = require('mongojs'),
    config = require('config').MongoJS;

var MongoStore = function () {
  // Connect
  this.db = mongojs(config.connect_url, ['tweets']);
  this.col = this.db.tweets;
};

MongoStore.prototype.all = function(cb) {
  this.col.find(function (err, data) {
    if (err) throw err;
    data.map(function (el) {
      if (el._id) delete el._id;
    });
    cb(err, data);
  });
  return this;
};

MongoStore.prototype.save = function(tweet, cb) {
  // Update Tweet
  if (tweet._id) {
    delete tweet._id; // remove mongodb id.
  }
  this.col.update({ id_str: tweet.id_str}, tweet, { upsert: true }, cb);
  return this;
};

MongoStore.prototype.get = function(id, cb) {
  // get tweet by id = id
  this.col.find({id: id}, cb);
  return this;
};

module.exports = new MongoStore();