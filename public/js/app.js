define(['jquery', 'backbone', 'underscore', 'js/views/annotate', 'js/views/tweets', 'js/collections/tweets'], 
    function ($, BB, _, AnnotateView, ListView, Tweets) {

  return {
    Views: {
      AnnotateView: AnnotateView,
      ListView: ListView
    },
    Collections: {
      Tweets: Tweets
    }
  };
});