Package.describe({
  summary: "Provides Google Analytics. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('deps', 'client');

  api.use('belt-app-settings');

  // XXX there seems to be a bug preventing this file name
  // investigate later.
  // api.add_files('google_analytics_client.js', 'client');
  api.add_files('analytics_client.js', 'client');

  api.export('_gaq');
});
