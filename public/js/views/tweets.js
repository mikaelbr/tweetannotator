define(['backbone', 'underscore', 'jquery', 'js/collections/tweets', 'js/views/tweet', 'js/models/tweet'], function (Backbone, _, $, Tweets, TweetView, Tweet) {
  return Backbone.View.extend({
    el: '#annotations',

    initialize: function () {
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.render, this);
      this.render();
    },

    render: function () {
      this.$el.empty();
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne: function (tweet) {
      var tweetView = new TweetView({
          model: tweet
      });
      this.$el.prepend(tweetView.render().el);
      return this;
    }
  });
});