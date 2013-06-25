Package.describe({
  summary: "Provides a post API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-model');
  api.use('belt-user');
  api.use('belt-slug');

  api.use('mongo-livedata', ['client', 'server']);
  api.use('underscore');
  api.use('roles', ['client', 'server']);

  api.add_files('tag_common.js', ['client', 'server']);
  api.add_files('tag_client.js', 'client');
  api.add_files('tag_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-tag');
  api.use('belt-test');
  api.use('tinytest');

  api.add_files('tag_tests.js', 'server');
});
