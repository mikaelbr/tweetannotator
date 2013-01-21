
define(['backbone', 'underscore', 'jquery', 'js/models/tweet'], function (Backbone, _, $, Tweet) {

  return Backbone.View.extend({
    tagName: 'li',
    
    template: _.template($('#tweet-item').html()),

    initialize: function (options) {
      this.model.on('change', this.render, this);
      this.noEdit = options.noEdit;

      $(document).on('keydown', $.proxy(this.keydown, this));
    },

    events: {
      'click .buttons .objective': 'objective',
      'click .buttons .positive': 'positive',
      'click .buttons .negative': 'negative',
      'click': 'showEdit'
    },


    objective: function (e) {
      e.preventDefault();
      var ex = this.model.get('annotation');
      if (!ex) ex = { classification : [] };
      console.log(ex);
      this.model.set('annotation', {
        classification: ex.classification.concat(['objective'])
      }).save();
    },

    positive: function (e) {
      e.preventDefault();
      var ex = this.model.get('annotation');
      if (!ex) ex = { classification : [] };
      this.model.set('annotation', {
        classification: ex.classification.concat(['positive'])
      }).save();
    },

    negative: function (e) {
      e.preventDefault();
      var ex = this.model.get('annotation');
      if (!ex) ex = { classification : [] };
      this.model.set('annotation', {
        classification: ex.classification.concat(['negative'])
      }).save();
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
    },

    showEdit: function (e) {
      e.preventDefault();

      if ( this.noEdit ) return;
      this.$el.find('.buttons').toggle();
    },

    render: function () {
      var that = this, 
          annotation = this.model.get('annotation');
      this.$el.html(this.template(this.model.toJSON()));

      console.log(annotation);

      if (!!annotation) {
        this.$el.find('.buttons').hide();
        this.el.className = _.last(annotation.classification);
        $(document).off('keydown');
      }

      return this;
    }
  });
});