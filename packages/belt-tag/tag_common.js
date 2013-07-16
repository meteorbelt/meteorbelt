// Tag
// ---
// @export Tags
Tags = new Collection('tag', {
  schema: {
    slug: { type: String, required: true }
  }
});

// Plugins
// -------

// Properties
Tags.plugin(CollectionPlugins.createdAt);
Tags.plugin(CollectionPlugins.updatedAt);

// Permissions
Tags.plugin(CollectionPlugins.allowAdmin);
