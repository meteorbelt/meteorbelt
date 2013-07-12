Package.describe({
  summary: "Provides Ink Filepicker. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files('ink_filepicker_client.js', 'client');
});
