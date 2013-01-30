define(['backbone', 'underscore', 'jquery', 'js/collections/tweets', 'js/views/tweet', 'js/models/tweet', 'js/views/tweets'], 
          function (Backbone, _, $, Tweets, TweetView, Tweet, ListTweetsView) {
  return ListTweetsView.extend({
    initialize: function (options) {
      ListTweetsView.prototype.initialize.apply(this, options);
      this.collection.on('sync', this.nextTweet, this);
      this.collection.on('destroy', this.nextTweet, this);
    },

    nextTweet: function () {
      console.log('nextTweet');
      var that = this;
      var tweet = new Tweet();
      tweet.fetch().done(function () {
        console.log('nextTweet fetched', tweet);
        that.collection.add(tweet);
        console.log(that);
      });
    },

    addOne: function (tweet) {
      console.log('her');
      var tweetView = new TweetView({
          model: tweet,
          noEdit: true,
          user: this.user
      });
      this.$el.prepend(tweetView.render().el);
      return this;
    }
  });
});