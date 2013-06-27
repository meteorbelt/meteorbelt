// Image
// -----
Images = new Belt.Collection('image', {
  schema: {
    title: { type: String, required: true },
    url:   { type: String, required: true }
  }
});


// Plugins
// -------

// Properties
Images.plugin(Belt.Plugins.tags);
Images.plugin(Belt.Plugins.isPublic);
Images.plugin(Belt.Plugins.owner);
// Images.plugin(Belt.Plugins.slug, { required: true, attr: "title" });

// Permissions
Images.plugin(Belt.Plugins.allowAdmin);
