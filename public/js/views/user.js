define(['backbone', 'underscore', 'jquery', 'js/models/user'], function (Backbone, _, $, User) {
  return Backbone.View.extend({
    el: 'form',

    events: {
      'blur input[type="text"]': 'changedId',
      'submit': 'changedId'
    },

    initialize: function () {
      this.on('noUser', this.invalidated, this);
      this.model.on('change:userId', this.updateInput, this);
      this.inputBox = this.$el.find('input[type="text"]');
    },

    updateInput: function () {
      console.log('sync event her..');
      this.inputBox.val(this.model.get('userId'));
      return false;
    },

    changedId: function (e) {
      this.model.set('userId', this.inputBox.val());
      if(this.inputBox.val()) {
        this.model.save();
      }
      return false;
    },

    invalidated: function (msg) {
      console.log(msg);
      var color = 'red'
        , self = this
        , originalColor = this.inputBox.css('border-color');

      this.inputBox.css({'border-color': color});
      setTimeout(function () {
        self.inputBox.css({'border-color': originalColor}).focus();
      }, 1000);
    }

  });
});