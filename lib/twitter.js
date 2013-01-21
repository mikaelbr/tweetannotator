var ntwitter = require('ntwitter'),
  events = require('events'),
  util = require('util'),
  config = require('config').Twitter,

  twit = new ntwitter({
    consumer_key:         config.consumer_key,
    consumer_secret:      config.consumer_secret,
    access_token_key:     config.access_token_key,
    access_token_secret:  config.access_token_secret
  }),
  overfillingThreshold = 500,
  underfillingThreshold = 50;

var Twitter = module.exports = function (datastore) {
  this.queue = [];
  this.datastore = datastore;

  // flag to indicate if we're in the process of filling the queue
  this._filling = false;
  this._initFillQueue();
};

Twitter.prototype._initFillQueue = function() {
  var self = this;

  twit.stream('statuses/sample', {lang: 'en'}, function(stream) {
    console.log('Started Filling Process');


    stream.on('data', function (data) {

      // Check if we're overfilling the queue
      if (self.queue.length > overfillingThreshold) {
        console.log('Stopped filling process');
        stream.destroy();
        self._filling = false;
      } else {
        // Not overfilling.

        self.queue.push(data);
        // Indicate that we are now filling.
        self._filling = true;
      }

    });

  });

};

Twitter.prototype.get = function() {
  // check if we have enough data. 
  if (this.queue.length < underfillingThreshold && !this._filling) {
    // Restart filling process. 
    this._initFillQueue();
  }

  if (this.queue.length === 0) {
    return null;
  }

  var tweet = this.queue.pop();

  if (tweet.lang !== 'en') {
    return this.get();
  }

  return tweet;
};

Twitter.prototype.push = function(tweet) {
  tweet = this.datastore.push(tweet);
  return tweet;
};

Twitter.prototype.all = function(first_argument) {
  // body...
};



