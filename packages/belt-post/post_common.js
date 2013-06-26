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

var Posts = new Belt.Collection('posts', {

  schema: {
    title:       { type: String, required: true },
    body:        { type: String, required: true },
    publishedAt: { type: Date, required: true, 'default': new Date() }
  },

  statics: {
    findByTitle: function (title, fn) {
      return this.find({title: title}, fn);
    }
  }
});

// Plugins
// -------
Posts.plugin(Belt.Collection.Plugins.createdAt);
Posts.plugin(Belt.Collection.Plugins.updatedAt);
Posts.plugin(Belt.Collection.Plugins.tags);
Posts.plugin(Belt.Collection.Plugins.isPublic);
// Posts.plugin(Belt.Collection.Plugins.owner);

// Posts.plugin(Belt.Collection.Plugins.slug, { required: true, attr: "title" });

// Exports
// -------
this.Posts = Posts;
