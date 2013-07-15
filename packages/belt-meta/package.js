Package.describe({
  summary: "Provides a Meta API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files('meta_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('belt-meta');
  api.use('tinytest');

  api.add_files('meta_tests.js', 'client');
});
