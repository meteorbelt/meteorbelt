Package.describe({
  summary: "Provides a post API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-collection');
  api.use('belt-collection-plugins');
  api.use('deps', 'client');
  api.use('session', 'client');
  api.use('roles', ['client', 'server']);
  api.use('underscore');

  api.add_files('tag_common.js', ['client', 'server']);
  api.add_files('tag_client.js', 'client');
  api.add_files('tag_server.js', 'server');

  api.export('Tags');
});

Package.on_test(function (api) {
  api.use('belt-tag');
  api.use('tinytest');

  api.add_files('tag_tests.js', 'server');
});
