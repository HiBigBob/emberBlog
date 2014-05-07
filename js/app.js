App = Ember.Application.create({});

var posts = [{
  id: '1',
  title: "How can I do ?",
  author: { name: "HiBigBob" },
  date: new Date('12-27-2013'),
  body: "Actually, I do not know."
}, {
  id: '2',
  title: "Where is Bryan ?",
  author: { name: "Adrien" },
  date: new Date('12-27-2013'),
  body: "In the kitchen."  
}];

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
