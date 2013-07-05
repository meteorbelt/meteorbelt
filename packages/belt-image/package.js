Package.describe({
  summary: "Provides a image API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-collection');
  api.use('belt-plugins');

  api.use('mongo-livedata', ['client', 'server']);
  api.add_files('image_common.js', ['client', 'server']);
  api.add_files('image_client.js', 'client');
  api.add_files('image_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-image');
  api.use('tinytest');

  api.add_files('image_tests.js', 'server');
});
