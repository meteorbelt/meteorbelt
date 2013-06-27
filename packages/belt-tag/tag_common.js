// Tag
// ---

var Tags = new Belt.Collection('tag', {
  schema: {
    slug: { type: String, required: true }
  }
});

// Plugins
// -------

// Properties
Tags.plugin(Belt.Plugins.createdAt);
Tags.plugin(Belt.Plugins.updatedAt);

// Permissions
Tags.plugin(Belt.Plugins.allowAdmin);

// Exports
// -------
this.Tags = Tags;
