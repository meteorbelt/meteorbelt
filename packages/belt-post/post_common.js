// Post
// ----
/**
  Post a class that takes a document in its constructor

    var doc = {
      title: 'Hello World',
      body: 'body text'.
      tags: ['one', 'two', 'three'],
      publishedAt: {Date},
      isPublished: true,
      owner: '123',
      slug: 'hello-world'
    };

   opts:
    - owner {String}
    - title {String}
    - body {String}
    - tags {Array}{String}
    - publishedAt {Date}
    - isPublished {Boolean}
    - slug {Array} Optional
*/

// Define a Collection that uses Post as its document
// var Posts = new Meteor.Collection('posts', {
//   transform: function (doc) {
//     return new Post(doc);
//   }
// });

var Posts = new Belt.Colletion('posts');

// Plugins
// -------
Posts.plugin(Belt.Plugins.createdAt);
Posts.plugin(Belt.Plugins.updatedAt);
Posts.plugin(Belt.Plugins.slug, { required: true, attr: "title" });
Posts.plugin(Belt.Plugins.owner, { required: true });
Posts.plugin(Belt.Plugins.tags);

// Schema
// ------
Posts.schema({
  title:       { type: String, required: true },
  body:        { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isPublished: { type: Date, required: true, "default": false }
});

Posts.methods.findByTitle = function(title) {
  return title;
};

Posts.statics.findByTitle = function(title) {
  return title;
};

Posts.before({
  insert: function() {
    var self = this;
    if (self.publishedAt) {
      self.publishedAt = new Date(self.publishedAt);
    } else {
      self.publishedAt = new Date();
    }
  }
});

// Exports
// -------
this.Posts = Posts;
