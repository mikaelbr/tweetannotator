define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
        userId: null
    },

    save: function () {
      if (typeof window.localStorage === 'undefined') {
        return this;
      }

      localStorage.username = this.get('userId');
      return this;
    },

    fetch: function () {
      console.log('fetch', localStorage.username)
      if (typeof window.localStorage === 'undefined') {
        return null;
      }

      if (localStorage.username) {
        this.set('userId', localStorage.username);
      }
      return null;
    },

    validate: function (attrs, options) {

      if (!attrs.userId) {
        return "Username is required";
      }
    }
  });
});