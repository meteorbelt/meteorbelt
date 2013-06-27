// Post
// ----
Posts = new Belt.Collection('posts', {

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

// Properties
Posts.plugin(Belt.Plugins.createdAt);
Posts.plugin(Belt.Plugins.updatedAt);
Posts.plugin(Belt.Plugins.tags);
Posts.plugin(Belt.Plugins.isPublic);
Posts.plugin(Belt.Plugins.owner);
// Posts.plugin(Belt.Plugins.slug, { required: true, attr: "title" });

// Permissions
Posts.plugin(Belt.Plugins.allowAdmin);
