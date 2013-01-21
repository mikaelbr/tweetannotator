define(['backbone', 'js/models/tweet'], function (Backbone, Tweet) {
  return Backbone.Collection.extend({
    model: Tweet,
    url: '/tweets'
  });
});