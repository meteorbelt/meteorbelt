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
Pages.plugin(Belt.Plugins.createdAt);
Pages.plugin(Belt.Plugins.updatedAt);
Pages.plugin(Belt.Plugins.tags);
Pages.plugin(Belt.Plugins.isPublic);
Pages.plugin(Belt.Plugins.owner);

// Permissions
Pages.plugin(Belt.Plugins.allowAdmin);
