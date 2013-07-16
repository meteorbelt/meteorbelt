Package.describe({
  summary: "Provides Google Maps. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-app-settings');

  // XXX there seems to be a bug preventing this file name
  // investigate later.
  // api.add_files('google_maps_client.js', 'client');
  api.add_files('maps_client.js', 'client');
});
