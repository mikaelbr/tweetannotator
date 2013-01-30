
define(['backbone', 'underscore', 'jquery', 'js/models/tweet'], function (Backbone, _, $, Tweet) {

  return Backbone.View.extend({
    tagName: 'li',
    
    template: _.template($('#tweet-item').html()),

    initialize: function (options) {
      this.model.on('change', this.render, this);
      this.noEdit = options.noEdit || false;
      this.user = options.user;

      $(document).on('keydown', $.proxy(this.keydown, this));
    },

    events: {
      'click .buttons .objective': 'objective',
      'click .buttons .positive': 'positive',
      'click .buttons .negative': 'negative',
      'click .buttons .skip': 'skip',
      'click': 'showEdit'
    },

    validateUser: function () {
      var valMessage = this.user.model.validate(this.user.model.toJSON());
      if (valMessage) {
        this.user.trigger('noUser', valMessage);
        return false;
      }
      return true;
    },

    objective: function (e) {
      e.preventDefault();

      if(!this.validateUser()) {
        return;
      }

      var ex = this.model.get('annotation');
      if (!ex) ex = { classification : [] };

      this.model.set('annotation', {
        classification: ex.classification.concat([{
          value: 'objective',
          user: this.user.model.get('userId')
        }])
      }).save();
    },

    positive: function (e) {
      e.preventDefault();

      if(!this.validateUser()) {
        return;
      }

      var ex = this.model.get('annotation');
      if (!ex) ex = { classification : [] };
      this.model.set('annotation', {
        classification: ex.classification.concat([{
          value: 'positive',
          user: this.user.model.get('userId')
        }])
      }).save();
    },

    negative: function (e) {
      e.preventDefault();

      if(!this.validateUser()) {
        return;
      }

      var ex = this.model.get('annotation');
      if (!ex) ex = { classification : [] };
      this.model.set('annotation', {
        classification: ex.classification.concat([{
          value: 'negative',
          user: this.user.model.get('userId')
        }])
      }).save();
    },

    skip: function (e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    },


    keydown: function (e) {
      if(e.keyCode === 49) { // number 1
        return this.objective(e);
      }

      if(e.keyCode === 50) { // number 2
        return this.positive(e);
      }

      if(e.keyCode === 51) { // number 3
        return this.negative(e);
      }

      if(e.keyCode === 52) { // number 3
        return this.skip(e);
      }
    },

    showEdit: function (e) {
      e.preventDefault();

      if ( this.noEdit ) return;
      this.$el.find('.buttons').toggle();
    },

    render: function () {
      var that = this, 
          tweetJSON = this.model.toJSON(),
          annotation = tweetJSON.annotation;
          
      console.log(tweetJSON);

      this.$el.html(this.template(tweetJSON));

      console.log('annotation:');
      console.log(annotation);

      if (!!annotation) {
        this.$el.find('.buttons').hide();
        this.$el.find('.buttons .skip').remove();
        console.log(annotation.classification)
        console.log(_.last(annotation.classification));
        this.el.className = _.last(annotation.classification).value;
        $(document).off('keydown');
      }

      return this;
    }
  });
});