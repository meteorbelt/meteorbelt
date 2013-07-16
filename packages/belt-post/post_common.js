// Post
// ----
// @export Posts
Posts = new Collection('posts', {

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
Posts.plugin(CollectionPlugins.createdAt);
Posts.plugin(CollectionPlugins.updatedAt);
Posts.plugin(CollectionPlugins.tags);
Posts.plugin(CollectionPlugins.isPublic);
Posts.plugin(CollectionPlugins.owner);
// Posts.plugin(CollectionPlugins.slug, { required: true, attr: "title" });

// Permissions
Posts.plugin(CollectionPlugins.allowAdmin);
