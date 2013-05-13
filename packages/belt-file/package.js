Package.describe({
  summary: "Provides a File API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('mongo-livedata', ['client', 'server']);
  api.add_files('file_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('underscore');
  api.use('belt-file');
  api.use('tinytest');

  api.add_files('file_tests.js', 'server');
});
