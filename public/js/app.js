define(['jquery', 'backbone', 'underscore', 'js/views/annotate', 'js/views/tweets', 'js/collections/tweets', 'js/views/user', 'js/models/user'], 
    function ($, BB, _, AnnotateView, ListView, Tweets, UserView, User) {

  return {
    Views: {
      AnnotateView: AnnotateView,
      ListView: ListView,
      User: UserView
    },
    Collections: {
      Tweets: Tweets
    },
    Models: {
      User: User
    }
  };
});