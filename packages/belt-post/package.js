Package.describe({
  summary: "Provides a post API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-model');
  api.use('belt-validation');
  api.use('belt-user');
  api.use('belt-slug');
  api.use('belt-tag');

  api.use('mongo-livedata', ['client', 'server']);
  api.use('underscore');
  api.use('belt-role', ['client', 'server']);

  api.add_files('post_common.js', ['client', 'server']);
  api.add_files('post_client.js', 'client');
  api.add_files('post_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-post');
  api.use('belt-test');
  api.use('tinytest');

  api.add_files('post_tests.js', ['client', 'server']);
});
