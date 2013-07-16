// Collection
// ----------
// @export Pages
Pages = new Belt.Collection('page', {
  schema: {
    title: String,
    body: String
  }
});

// Plugins
// -------

// Properties
Pages.plugin(CollectionPlugins.createdAt);
Pages.plugin(CollectionPlugins.updatedAt);
Pages.plugin(CollectionPlugins.tags);
Pages.plugin(CollectionPlugins.isPublic);
Pages.plugin(CollectionPlugins.owner);

// Permissions
Pages.plugin(CollectionPlugins.allowAdmin);
