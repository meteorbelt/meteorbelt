Package.describe({
  summary: "Provides a post API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-collection');
  api.use('belt-collection-plugins');
  api.use('belt-slug');
  api.use('deps', 'client');
  api.use('session', 'client');

  api.use('underscore');
  api.use('roles', ['client', 'server']);

  api.add_files('post_common.js', ['client', 'server']);
  api.add_files('post_client.js', 'client');
  api.add_files('post_server.js', 'server');

  api.export('Posts');
});

Package.on_test(function (api) {
  api.use('belt-post');
  api.use('tinytest');

  api.add_files('post_tests.js', ['client', 'server']);
});
